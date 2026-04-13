import { useState } from "react";

function FormPreview() {
  const [fields] = useState(() => {
    const saved = localStorage.getItem("formConfig");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (fieldId, value) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = () => {
    // map field ids to labels for readable output
    const output = {};
    fields.forEach((field) => {
      const label = field.label || "Untitled Field";
      output[label] = formData[field.id] || "";
    });
    console.log("Form submitted:", output);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const renderField = (field) => {
    const options = field.options
      ? field.options
          .split(",")
          .map((opt) => opt.trim())
          .filter(Boolean)
      : [];

    switch (field.type) {
      case "text":
      case "number":
      case "email":
      case "date":
        return (
          <input
            type={field.type}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "0.9rem",
            }}
          />
        );
      case "textarea":
        return (
          <textarea
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            rows={3}
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "0.9rem",
              resize: "vertical",
            }}
          />
        );
      case "select":
        return (
          <select
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "0.9rem",
            }}
          >
            <option value="">Select an option</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      case "checkbox":
        return (
          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="checkbox"
              checked={formData[field.id] || false}
              onChange={(e) => handleChange(field.id, e.target.checked)}
            />
            {field.label}
          </label>
        );
      case "radio":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {options.map((opt) => (
              <label
                key={opt}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <input
                  type="radio"
                  name={`field-${field.id}`}
                  value={opt}
                  checked={formData[field.id] === opt}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
                {opt}
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  if (fields.length === 0) {
    return (
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1.5rem" }}>
        <h2>Form Preview</h2>
        <p>No form configured yet.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1.5rem" }}>
      <h2>Form Preview</h2>
      <div>
        {fields.map((field) => (
          <div key={field.id} style={{ marginBottom: "16px" }}>
            {field.type !== "checkbox" && (
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                }}
              >
                {field.label || "Untitled Field"}
              </label>
            )}
            {renderField(field)}
          </div>
        ))}
        <button
          onClick={handleSubmit}
          style={{
            padding: "10px 24px",
            border: "none",
            borderRadius: "6px",
            background: "#2563eb",
            color: "#fff",
            cursor: "pointer",
            fontSize: "0.95rem",
            marginTop: "8px",
          }}
        >
          Submit
        </button>
        {submitted && (
          <p
            style={{ color: "#15713d", marginTop: "10px", fontSize: "0.9rem" }}
          >
            Form submitted! Check console for data.
          </p>
        )}
      </div>
    </div>
  );
}

export default FormPreview;
