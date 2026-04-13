import { useState } from "react";
import styles from "./FormBuilder.module.css";

const INPUT_TYPES = [
  { value: "text", label: "Text Input" },
  { value: "number", label: "Number" },
  { value: "email", label: "Email" },
  { value: "textarea", label: "Text Area" },
  { value: "select", label: "Dropdown" },
  { value: "checkbox", label: "Checkbox" },
  { value: "radio", label: "Radio Buttons" },
  { value: "date", label: "Date" },
];

const needsOptions = (type) => type === "select" || type === "radio";

function FormBuilder() {
  const [fields, setFields] = useState(() => {
    const saved = localStorage.getItem("formConfig");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.log("Failed to parse saved form config");
      }
    }
    return [];
  });
  const [saveMessage, setSaveMessage] = useState("");

  const addField = () => {
    setFields([
      ...fields,
      { id: Date.now(), label: "", type: "text", options: "" },
    ]);
  };

  const updateField = (id, key, value) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, [key]: value } : field,
      ),
    );
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const saveForm = () => {
    localStorage.setItem("formConfig", JSON.stringify(fields));
    setSaveMessage("Form saved successfully!");
    setTimeout(() => setSaveMessage(""), 2000);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Form Builder</h2>
      <p className={styles.subtitle}>Define your form fields below</p>

      {fields.map((field, index) => (
        <div key={field.id} className={styles.fieldRow}>
          <div className={styles.fieldMain}>
            <span className={styles.fieldIndex}>{index + 1}.</span>
            <input
              type="text"
              placeholder="Field label"
              value={field.label}
              onChange={(e) => updateField(field.id, "label", e.target.value)}
              className={styles.fieldLabel}
            />
            <select
              value={field.type}
              onChange={(e) => updateField(field.id, "type", e.target.value)}
              className={styles.fieldType}
            >
              {INPUT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => removeField(field.id)}
              className={styles.removeBtn}
            >
              Remove
            </button>
          </div>
          {needsOptions(field.type) && (
            <div className={styles.optionsRow}>
              <input
                type="text"
                placeholder="Options (comma separated, e.g. Active, Inactive, Pending)"
                value={field.options}
                onChange={(e) =>
                  updateField(field.id, "options", e.target.value)
                }
                className={styles.optionsInput}
              />
            </div>
          )}
        </div>
      ))}

      <div className={styles.actions}>
        <button onClick={addField} className={styles.addBtn}>
          + Add Field
        </button>
        <button
          onClick={saveForm}
          disabled={fields.length === 0}
          className={styles.saveBtn}
        >
          Save Form
        </button>
        {saveMessage && (
          <span className={styles.saveMessage}>{saveMessage}</span>
        )}
      </div>
    </div>
  );
}

export default FormBuilder;
