import { useState } from "react";
import styles from "./FormPreview.module.css";

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
            className={styles.input}
          />
        );
      case "textarea":
        return (
          <textarea
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            rows={3}
            className={styles.textarea}
          />
        );
      case "select":
        return (
          <select
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className={styles.select}
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
          <label className={styles.checkboxLabel}>
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
          <div className={styles.radioGroup}>
            {options.map((opt) => (
              <label key={opt} className={styles.radioLabel}>
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
      <div className={styles.container}>
        <h2 className={styles.title}>Form Preview</h2>
        <p className={styles.emptyMsg}>No form configured yet.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Form Preview</h2>
      <div>
        {fields.map((field) => (
          <div key={field.id} className={styles.fieldGroup}>
            {field.type !== "checkbox" && (
              <label className={styles.label}>
                {field.label || "Untitled Field"}
              </label>
            )}
            {renderField(field)}
          </div>
        ))}
        <button onClick={handleSubmit} className={styles.submitBtn}>
          Submit
        </button>
        {submitted && (
          <p className={styles.successMsg}>
            Form submitted! Check console for data.
          </p>
        )}
      </div>
    </div>
  );
}

export default FormPreview;
