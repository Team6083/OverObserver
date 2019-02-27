if (typeof scoutForm === "undefined") {
    window.scoutForm = new Object();
} else if (typeof scoutForm !== "object") {
    throw ("scoutForm global variable already exists");
}

(function () {
    const ScoutForms = new Object();

    ScoutForms.create = function (schema) {
        const renderers = {};
        const root = schema;
        let initialValue = {};

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
                input.className = "form-control";
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

                input.className = "form-control";

                if (s.type === "integer" || s.type === "number") {
                    input.step = s.step ? "" + s.step : "any";
                    input.classList.add("text-center");
                    input.type = "number";
                    if (typeof value !== "number") {
                        value = null;
                    }
                    if (s.type === "integer") {
                        input.classList.add("integer-input");
                        if (s.min || s.min === 0) input.setAttribute("min", s.min);
                        if (s.max) input.setAttribute("max", s.max);
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
                    input.className = "form-control";
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

            input.setAttribute("autocorrect", "off");

            if (s.description) {
                input.title = s.description;
                input.placeholder = s.description;
            }

            input.id = id;

            appendItem(container, input, s);
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
                trueRadio.setAttribute("name", id);
                appendChild(trueLabel, trueRadio);
                appendChild(trueLabel, document.createTextNode((s.trueBtnLabel) ? s.trueBtnLabel : "true"));
                appendChild(input, trueLabel);

                let falseLabel = document.createElement("label");
                falseLabel.className = "btn btn-outline-warning";
                let falseRadio = document.createElement("input");
                falseRadio.type = "radio";
                falseRadio.id = id + "-false";
                falseRadio.setAttribute("autocomplete", "off");
                falseRadio.setAttribute("name", id);
                appendChild(falseLabel, falseRadio);
                appendChild(falseLabel, document.createTextNode((s.falseBtnLabel) ? s.falseBtnLabel : "false"));
                appendChild(input, falseLabel);
            }

            input.id = id;
            if (s.description) {
                input.title = s.description;
            }

            appendItem(container, input, s);
        };

        renderers["title"] = function (container, id, parentObject, property, value) {
            let s = property;

            appendItem(container, null, s);
        };

        let obj = {};
        obj.render = function (c, data) {
            let container = c;
            initialValue = data;
            const div = document.createElement("div");
            div.id = "scoreFormDiv";
            if (container) {
                container.appendChild(div);
            } else {
                document.body.appendChild(div);
            }

            render(div);
        };

        obj.getData = function () {
            let data = {};

            for (const id in root.fields) {
                const s = root.fields[id];
                switch (s.type) {
                    case "integer":
                        data[id] = parseInt(document.getElementById(id).value);
                        break;
                    case "number":
                        data[id] = parseFloat(document.getElementById(id).value);
                        break;
                    case "any":
                    case "string":
                        if (s.enum) {

                        } else {
                            data[id] = document.getElementById(id).value;
                        }
                        break;
                    case "checkbox":

                        break;
                    case "boolean":
                        let radio = document.getElementById(id).childNodes[0].childNodes[0];
                        data[id] = radio.checked;
                        break;
                }
            }

            return data;
        };

        return obj;

        function appendChild(parent, child) {
            parent.appendChild(child);
        }

        function appendItem(parent, child, para) {
            let row = document.createElement("div");
            row.className = "row form-group";
            let col1 = document.createElement("div");
            col1.className = "col-6";
            let col2 = document.createElement("div");
            col2.className = "col-6";
            col1.innerHTML = para.title;
            if (para.type === "title") {
                col1.className = "col-12";
                col2.className = "col-0"
            } else {
                col2.appendChild(child);
            }
            row.appendChild(col1);
            row.appendChild(col2);
            parent.appendChild(row);
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

            for (const id in root.fields) {
                const s = root.fields[id];
                const r = renderers[s.type];

                if (r) {
                    let value;
                    if (typeof initialValue !== "undefined" && initialValue !== null) {
                        value = initialValue[id];
                    } else {
                        value = s.default;
                    }

                    r(container, id, null, s, value);
                }
            }
        }
    };

    scoutForm["scout-form"] = ScoutForms;
}());