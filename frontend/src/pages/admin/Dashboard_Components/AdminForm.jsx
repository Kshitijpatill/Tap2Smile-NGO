import React, { useState, useEffect } from "react";
import { X, Save, Loader2, AlertCircle } from "lucide-react";
import { api } from "../../../services/api";

export default function AdminForm({
  section,
  initialData,
  onClose,
  onSuccess,
  fields,
  createFn,
  updateFn,
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

  /* -------------------- handlers -------------------- */

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
      const current = prev.program_ids || [];
      return {
        ...prev,
        program_ids: checked
          ? [...current, id]
          : current.filter((pid) => pid !== id),
      };
    });
  };

  /* -------------------- submit -------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    let payload;

    try {
      payload = { ...formData };

      /* -------- Donations (special case) -------- */
      if (section === "donations") {
        payload = {
          donor_name: formData.donor_name || formData.name,
          donor_email: formData.donor_email || formData.email,
          donor_phone: formData.donor_phone || "0000000000",
          amount: Number(formData.amount),
          message: "Admin panel donation entry",
        };
      }

      /* -------- Image upload: Programs -------- */
      if (payload.cover_image instanceof File) {
        const res = await api.uploadImage(payload.cover_image);
        if (!res.success) throw new Error("Cover image upload failed");
        payload.cover_image = res.url;
      }

      /* -------- Image upload: Projects -------- */
      if (payload.images instanceof File) {
        const res = await api.uploadImage(payload.images);
        if (!res.success) throw new Error("Project image upload failed");
        payload.images = [res.url];
      }

      if (section === "projects" && typeof payload.images === "string") {
        payload.images = [payload.images];
      }

      if (section === "projects" && !Array.isArray(payload.images)) {
        payload.images = [];
      }

      /* -------- Never send these -------- */
      delete payload.id;
      delete payload.status;

      console.log("📤 Submitting data:", payload);

      const result = initialData?.id
        ? await updateFn(initialData.id, payload)
        : await createFn(payload);

      console.log("✅ Result:", result);

      if (result.success) {
        onSuccess();
        onClose();
      } else {
        setError(result.message || "Operation failed");
      }

    } catch (err) {
      console.error("❌ Form Error:", err);

      if (err.response?.status === 422) {
        const details = err.response?.data?.detail;
        if (Array.isArray(details)) {
          setError(
            "Validation Error: " +
              details.map(d => `${d.loc.at(-1)}: ${d.msg}`).join(", ")
          );
        } else {
          setError("Validation failed");
        }
      } else {
        setError(err.message || "Unexpected error");
      }

    } finally {
      setLoading(false);
    }
  };

  /* -------------------- render fields -------------------- */

  const renderField = (field) => {
    const cls =
      "w-full p-3 bg-zinc-800 rounded-xl text-white border border-zinc-700 focus:border-brand-gold outline-none";

    if (["text", "number", "date", "password"].includes(field.type)) {
      return (
        <input
          key={field.name}
          type={field.type}
          name={field.name}
          value={formData[field.name] || ""}
          onChange={handleChange}
          className={cls}
          required={field.required}
          placeholder={field.label}
          readOnly={field.readOnly}
        />
      );
    }

    if (field.type === "textarea") {
      return (
        <textarea
          key={field.name}
          name={field.name}
          value={formData[field.name] || ""}
          onChange={handleChange}
          className={`${cls} h-32`}
          required={field.required}
          placeholder={field.label}
        />
      );
    }

    if (field.type === "select") {
      return (
        <select
          key={field.name}
          name={field.name}
          value={formData[field.name] || ""}
          onChange={handleChange}
          className={cls}
        >
          <option value="">-- Select --</option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      );
    }

    if (field.type === "checkbox") {
      return (
        <label key={field.name} className="flex gap-3 text-white">
          <input
            type="checkbox"
            name={field.name}
            checked={formData[field.name] ?? field.defaultValue ?? false}
            onChange={handleChange}
            className="accent-brand-gold"
          />
          {field.label}
        </label>
      );
    }

    if (field.type === "program_multi_select") {
      return (
        <div key={field.name} className="bg-zinc-800 p-4 rounded-xl border border-zinc-700">
          <label className="text-gray-400 text-sm mb-2 block">
            {field.label}
          </label>
          {programsList.map((p) => (
            <label key={p.id} className="flex gap-3 text-white text-sm">
              <input
                type="checkbox"
                checked={(formData.program_ids || []).includes(p.id)}
                onChange={(e) => handleMultiSelectChange(e, p.id)}
                className="accent-brand-gold"
              />
              {p.title}
            </label>
          ))}
        </div>
      );
    }

    if (field.type === "file") {
      return (
        <input
          key={field.name}
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFormData(prev => ({
              ...prev,
              [field.name]: e.target.files[0],
            }))
          }
          className={cls}
        />
      );
    }

    return null;
  };

  /* -------------------- UI -------------------- */

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="bg-zinc-900 w-full max-w-2xl rounded-3xl p-8 relative overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400">
          <X />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">
          {initialData ? `Edit ${section.slice(0, -1)}` : `Add New ${section.slice(0, -1)}`}
        </h2>

        {error && (
          <div className="bg-red-500/20 text-red-400 p-4 rounded-xl mb-6 flex gap-3">
            <AlertCircle />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(renderField)}

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary px-8 py-3 rounded-xl font-bold text-black"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Save />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
