import React from "react";
import { Save, XCircle } from "lucide-react";

export default function AdminForm({
  fields,
  formData,
  handleInputChange,
  handleSubmit,
  onCancel,
  loading,
  isEditing,
  label,
}) {
  const renderField = (field) => {
    const commonClasses =
      "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white text-gray-900";

    switch (field.type) {
      case "textarea":
        return (
          <textarea
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleInputChange}
            required={field.required}
            rows="4"
            className={commonClasses}
          />
        );
      case "checkbox":
        return (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name={field.name}
              checked={formData[field.name] || false}
              onChange={handleInputChange}
              className="w-5 h-5 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
            />
            <span className="text-sm text-gray-700">{field.label}</span>
          </label>
        );
      case "select":
        return (
          <select
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleInputChange}
            required={field.required}
            className={commonClasses}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleInputChange}
            required={field.required}
            className={commonClasses}
          />
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-6 border-t-4 border-yellow-600">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">
        {isEditing ? `Edit ${label}` : `Add New ${label}`}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {field.label}{" "}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              {renderField(field)}
            </div>
          ))}

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              <Save size={18} /> {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
            >
              <XCircle size={18} /> Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
