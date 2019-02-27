import * as s from "firebase-functions";

if (typeof scoutForm === "undefined") {
    window.scoutForm = new Object();
} else if (typeof scoutForm !== "object") {
    throw ("scoutForm global variable already exists");
}

(function () {
    const ScoutForms = {};

    ScoutForms.create = function (schema) {
        const renderers = {};
        const root = schema;
        let initialValue;

        renderers["integer"] = function (container, id, parentObject, property, value) {
            renderers["string"](container, id, parentObject, property, value);
        };

        renderers["number"] = function (container, id, parentObject, property, value) {
            renderers["string"](container, id, parentObject, property, value);
        };

        renderers["any"] = function (container, id, parentObject, property, value) {
            renderers["string"](container, id, parentObject, property, value);
        };

        renderers["string"] = function (container, id, parentObject, property, value) {
            const s = property;
            let input;
            if (s.type === "any") {
                input = document.createElement("textarea");
                if (value) {
                    input.value = JSON.stringify(value, null, 4);
                    if (s.readOnly)
                        input.disabled = true;
                }
            } else if (s.enum) {
                input = document.createElement("select");
                if (!s.required) {
                    let option = document.createElement("option");
                    let textNode = document.createTextNode("");
                    option.value = "";
                    appendChild(option, textNode);
                    appendChild(input, option);
                }
                let selectedIndex = 0;
                for (let i = 0; i < s.enum.length; i++) {
                    let option = document.createElement("option");
                    let textNode = document.createTextNode(s.enum[i]);
                    option.value = s.enum[i];
                    appendChild(option, textNode);
                    appendChild(input, option);
                    if (value && s.enum[i] === value) {
                        selectedIndex = i;
                        if (!s.required) {
                            selectedIndex++;
                        }
                        if (s.readOnly)
                            input.disabled = true;
                    }
                }
                if (s.enum.length === 1)
                    input.selectedIndex = 0;
                else
                    input.selectedIndex = selectedIndex;
            } else {
                input = document.createElement("input");
                if (s.type === "integer" || s.type === "number") {
                    input.step = s.step ? "" + s.step : "any";
                    input.classList.add("text-center");
                    if (typeof value !== "number") {
                        value = null;
                    }
                    if (s.type === "integer") {
                        input.classList.add("integer-input");
                    }
                } else if (s.format === "date-time") {
                    try {
                        input.type = "datetime-local";
                    } catch (err) {
                        input.type = "text";
                    }
                } else if (s.format === "date") {
                    input.type = "date";
                } else if (s.format === "time") {
                    input.type = "time";
                } else if (s.format === "email") {
                    input.type = "email";
                } else if (s.format === "text") {
                    input = document.createElement("textarea");
                } else {
                    input.type = "text";
                }
                if (value !== null && typeof value !== "undefined") {
                    // readOnly?
                    input.value = value;
                    if (s.readOnly)
                        input.disabled = true;

                }
            }
            input.schema = schemaId;
            input.setAttribute("autocorrect", "off");

            if (s.description) {
                input.title = s.description;
                input.placeholder = s.description;
            }

            input.id = id;
            return input;
        };

        renderers["checkbox"] = function (container, id, parentObject, property, value) {
            renderers["boolean"](container, id, parentObject, property, value);
        };

        renderers["boolean"] = function (container, id, parentObject, property, value) {
            const s = property;
            let input;
            if (s.type === "checkbox") {
                input = document.createElement("input");
                input.type = "checkbox";
                if (value === true || value !== false && s.default) {
                    input.checked = true;
                }
            } else {
                input = document.createElement("div");
                input.className = "btn-group btn-group-toggle";
                input.setAttribute("data-toggle", "buttons");

                let trueLabel = document.createElement("label");
                trueLabel.className = "btn btn-outline-success";
                let trueRadio = document.createElement("input");
                trueRadio.type = "radio";
                trueRadio.id = id + "-true";
                trueRadio.setAttribute("autocomplete", "off");
                appendChild(trueRadio, (s.trueBtnLabel) ? document.createTextNode(s.trueBtnLabel) : "true");
                appendChild(trueLabel, trueRadio);
                appendChild(input, trueLabel);

                let falseLabel = document.createElement("label");
                falseLabel.className = "btn btn-outline-success";
                let falseRadio = document.createElement("input");
                falseRadio.type = "radio";
                falseRadio.id = id + "-false";
                falseRadio.setAttribute("autocomplete", "off");
                appendChild(falseRadio, (s.falseBtnLabel) ? document.createTextNode(s.falseBtnLabel) : "false");
                appendChild(falseLabel, falseRadio);
                appendChild(input, falseLabel);
            }

            input.id = id;
            if (s.description) {
                input.title = s.description;
            }
            return input;
        };

        let obj = {};
        obj.render = function (c, data) {
            let container = c;
            initialValue = data;
            const form = document.createElement("form");
            form.id = "scoreForm";
            if (container) {
                appendChild(container, form);
            } else {
                appendChild(document.body, form);
            }

            render(form);
        };

        return obj;

        function appendChild(parent, child) {
            parent.appendChild(child);
        }

        function clear(container) {
            if (container) {
                while (container.firstChild) {
                    container.removeChild(container.firstChild);
                }
            }
        }

        function render(container) {
            clear(container);

            for(const id in root.fields){
                const s = root.fields[id];
                const r = renderers[s.type];

                if(r){
                    r(container, id, null, s, initialValue[id]);
                }
            }
        }
    };

    document.scoutForm = ScoutForms;
}());