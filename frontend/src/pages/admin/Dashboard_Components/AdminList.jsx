import React from "react";
import {
  Edit2,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";

export default function AdminList({
  data = [],
  loading = false,
  config = {},
  onEdit = () => {},
  onDelete = () => {},
  emoji = "📦",
}) {
  /* =================================================
     SAFETY GUARDS (CRITICAL)
  ================================================= */
  if (!Array.isArray(data)) {
    return null;
  }

  const {
    readOnly = false,
    canEdit = true,
    canDelete = false,
    deleteFn, // optional legacy support
  } = config;

  /* =================================================
     STATUS BADGE
  ================================================= */
  const getStatusBadge = (item) => {
    if (!item) return null;

    if (item.status) {
      const colors = {
        pending: "bg-yellow-100 text-yellow-800",
        received: "bg-green-100 text-green-800",
        active: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800",
      };

      return (
        <span
          className={`px-2 py-1 rounded text-xs font-bold uppercase ${
            colors[item.status] || "bg-gray-100 text-gray-800"
          }`}
        >
          {item.status}
        </span>
      );
    }

    if (typeof item.is_active === "boolean") {
      return (
        <span
          className={`px-2 py-1 rounded text-xs font-bold ${
            item.is_active
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {item.is_active ? "Active" : "Inactive"}
        </span>
      );
    }

    return null;
  };

  /* =================================================
     LOADING / EMPTY STATES
  ================================================= */
  if (loading && data.length === 0) {
    return (
      <div className="p-12 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!loading && data.length === 0) {
    return (
      <div className="p-12 text-center bg-white rounded-xl shadow-lg">
        <div className="text-6xl mb-4 text-gray-300">{emoji}</div>
        <p className="text-gray-500 text-lg">No records found.</p>
      </div>
    );
  }

  /* =================================================
     MAIN RENDER
  ================================================= */
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      {data.map((item, index) => {
        if (!item) return null;

        return (
          <div
            key={item.id || index}
            className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start gap-4"
          >
            {/* LEFT CONTENT */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-lg font-bold text-gray-900">
                  {item.title ||
                    item.name ||
                    item.subject ||
                    item.donor_name ||
                    "Untitled"}
                </h4>

                {getStatusBadge(item)}
              </div>

              <div className="text-sm text-gray-600 space-y-1 mb-2">
                {(item.email || item.donor_email) && (
                  <p className="flex items-center gap-2">
                    <Mail size={14} />
                    {item.email || item.donor_email}
                  </p>
                )}

                {(item.phone || item.donor_phone) && (
                  <p className="flex items-center gap-2">
                    <Phone size={14} />
                    {item.phone || item.donor_phone}
                  </p>
                )}

                {item.location && (
                  <p className="flex items-center gap-2">
                    <MapPin size={14} />
                    {item.location}
                  </p>
                )}

                {item.event_date && (
                  <p className="flex items-center gap-2">
                    <Calendar size={14} />
                    {new Date(item.event_date).toLocaleDateString()}
                  </p>
                )}

                {item.amount && (
                  <p className="font-bold text-yellow-600">
                    Pledge: ₹{item.amount}
                  </p>
                )}
              </div>

              {(item.description || item.message) && (
                <p className="text-sm text-gray-500 italic line-clamp-2">
                  {item.description || item.message}
                </p>
              )}
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">
              {!readOnly && canEdit && (
                <button
                  onClick={() => onEdit(item)}
                  className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
              )}

              {(canDelete || deleteFn) && (
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
