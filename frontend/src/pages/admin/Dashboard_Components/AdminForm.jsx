import React, { useState, useEffect } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { api } from "../../../services/api";

export default function AdminForm({
  section,
  initialData,
  onClose,
  onSuccess,
  fields,
}) {
  const [formData, setFormData] = useState(initialData || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [programsList, setProgramsList] = useState([]);

  useEffect(() => {
    if (section === "projects") {
      api.getPrograms().then((res) => {
        if (res.success) setProgramsList(res.data);
      });
    }
  }, [section]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMultiSelectChange = (e, id) => {
    const { checked } = e.target;
    setFormData((prev) => {
      const currentIds = prev.program_ids || [];
      if (checked) {
        return { ...prev, program_ids: [...currentIds, id] };
      } else {
        return { ...prev, program_ids: currentIds.filter((pid) => pid !== id) };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { SECTION_CONFIG } = await import("../config/sections");
      const config = SECTION_CONFIG[section];

      if (!config) throw new Error("Configuration not found");

      let payload = { ...formData };

      if (section === "projects" && typeof payload.images === "string") {
        payload.images = [payload.images];
      }

      let result;
      if (initialData?.id) {
        result = await config.updateFn(initialData.id, payload);
      } else {
        result = await config.createFn(payload);
      }

      if (result.success) {
        onSuccess();
        onClose();
      } else {
        setError(result.message || "Operation failed");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field) => {
    const commonClasses =
      "w-full p-3 bg-zinc-800 rounded-xl text-white border border-zinc-700 focus:border-brand-gold outline-none";

    // 1. Text / Number / Date / Password (UPDATED)
    if (["text", "number", "date", "password"].includes(field.type)) {
      return (
        <input
          key={field.name}
          type={field.type}
          name={field.name}
          value={formData[field.name] || ""}
          onChange={handleChange}
          className={commonClasses}
          required={field.required}
          placeholder={field.label}
          readOnly={field.readOnly}
        />
      );
    }

    // 2. Textarea
    if (field.type === "textarea") {
      return (
        <textarea
          key={field.name}
          name={field.name}
          value={formData[field.name] || ""}
          onChange={handleChange}
          className={`${commonClasses} h-32`}
          required={field.required}
          placeholder={field.label}
        />
      );
    }

    // 3. Select Dropdown
    if (field.type === "select") {
      return (
        <select
          key={field.name}
          name={field.name}
          value={formData[field.name] || ""}
          onChange={handleChange}
          className={commonClasses}
        >
          <option value="">-- Select --</option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }

    // 4. Checkbox
    if (field.type === "checkbox") {
      return (
        <label
          key={field.name}
          className="flex items-center gap-3 text-white cursor-pointer"
        >
          <input
            type="checkbox"
            name={field.name}
            checked={formData[field.name] ?? field.defaultValue ?? false}
            onChange={handleChange}
            className="w-5 h-5 rounded accent-brand-gold"
          />
          {field.label}
        </label>
      );
    }

    // 5. Program Multi-Select
    if (field.type === "program_multi_select") {
      return (
        <div
          key={field.name}
          className="bg-zinc-800 p-4 rounded-xl border border-zinc-700"
        >
          <label className="block text-gray-400 mb-2 text-sm">
            {field.label}
          </label>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {programsList.map((prog) => {
              const isChecked = (formData.program_ids || []).includes(prog.id);
              return (
                <label
                  key={prog.id}
                  className="flex items-center gap-3 text-white text-sm cursor-pointer hover:bg-zinc-700 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => handleMultiSelectChange(e, prog.id)}
                    className="w-4 h-4 rounded accent-brand-gold"
                  />
                  {prog.title}
                </label>
              );
            })}
            {programsList.length === 0 && (
              <span className="text-gray-500 text-xs">No programs found.</span>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="bg-zinc-900 w-full max-w-2xl rounded-3xl p-8 relative border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">
          {initialData
            ? `Edit ${section.slice(0, -1)}`
            : `Add New ${section.slice(0, -1)}`}
        </h2>

        {error && (
          <div className="bg-red-500/20 text-red-400 p-4 rounded-xl mb-6 border border-red-500/30">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(renderField)}

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-black"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
