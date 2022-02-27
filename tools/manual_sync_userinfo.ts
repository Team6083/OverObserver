import { auth, credential } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";

const serviceAccount = require("./service_account.json");

initializeApp({
    credential: credential.cert(serviceAccount),
    databaseURL: 'https://overobserver-1ed5b.firebaseio.com/'
});

let database = getDatabase();

auth().listUsers().then(async ({ users }) => {
    await Promise.all(users.map((user) => {
        console.log(`${user.uid}\t${user.email}`);

        return database.ref(`/users/${user.uid}`).update({
            email: user.email,
        });
    })).then(async () => {
        await (await database.ref('/users').get()).forEach((a) => {
            if (users.findIndex((u) => u.uid === a.key) === -1) {
                // user not exist
                console.log(`Removing non-exist user ${a.key} from DB.`);
                database.ref(`/users/${a.key}`).remove();
            }
        });
    }).then(() => {
        console.log("Done!");
        process.exit(0);
    });
});
