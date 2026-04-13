import { useState } from "react";

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
  const [fields, setFields] = useState([]);

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

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "1.5rem" }}>
      <h2>Form Builder</h2>
      <p style={{ color: "#666", marginBottom: "1.5rem" }}>
        Define your form fields below
      </p>

      {fields.map((field, index) => (
        <div
          key={field.id}
          style={{
            marginBottom: "12px",
            padding: "12px",
            border: "1px solid #e8e8e8",
            borderRadius: "6px",
          }}
        >
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <span
              style={{ color: "#999", fontSize: "0.85rem", minWidth: "20px" }}
            >
              {index + 1}.
            </span>
            <input
              type="text"
              placeholder="Field label"
              value={field.label}
              onChange={(e) => updateField(field.id, "label", e.target.value)}
              style={{
                flex: 1,
                padding: "8px 12px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "0.9rem",
              }}
            />
            <select
              value={field.type}
              onChange={(e) => updateField(field.id, "type", e.target.value)}
              style={{
                padding: "8px 12px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "0.9rem",
              }}
            >
              {INPUT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => removeField(field.id)}
              style={{
                padding: "6px 12px",
                border: "1px solid #e8e8e8",
                borderRadius: "6px",
                background: "#fff",
                cursor: "pointer",
                color: "#cc0000",
              }}
            >
              Remove
            </button>
          </div>
          {needsOptions(field.type) && (
            <div style={{ marginTop: "8px", marginLeft: "30px" }}>
              <input
                type="text"
                placeholder="Options (comma separated, e.g. Active, Inactive, Pending)"
                value={field.options}
                onChange={(e) =>
                  updateField(field.id, "options", e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                }}
              />
            </div>
          )}
        </div>
      ))}

      <button
        onClick={addField}
        style={{
          padding: "8px 20px",
          border: "1px solid #ddd",
          borderRadius: "6px",
          background: "#fff",
          cursor: "pointer",
          marginTop: "8px",
        }}
      >
        + Add Field
      </button>
    </div>
  );
}

export default FormBuilder;
