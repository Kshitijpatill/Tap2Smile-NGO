import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Plus,
  LayoutDashboard,
  BookOpen,
  Calendar,
  Briefcase,
  Users,
  Mail,
  Heart,
  BarChart3,
  AlertCircle,
  Loader2, // Imported Loader Icon
} from "lucide-react";
import { api } from "../../services/api";

// Import Components
import AdminStats from "./Dashboard_Components/AdminStats";
import AdminForm from "./Dashboard_Components/AdminForm";
import AdminList from "./Dashboard_Components/AdminList";
import AdminOverview from "./Dashboard_Components/AdminOverview";

export default function AdminDashboard() {
  const { section = "dashboard" } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Default to true to prevent initial crash
  const [error, setError] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({});

  // --- CONFIGURATION ---
  const sections = {
    programs: {
      label: "Programs",
      emoji: "📚",
      icon: <BookOpen size={24} className="text-yellow-600" />,
      endpoint: api.getPrograms,
      createFn: api.createProgram,
      updateFn: api.updateProgram,
      deleteFn: api.deleteProgram,
      fields: [
        { name: "title", label: "Title", type: "text", required: true },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          required: true,
        },
        { name: "icon", label: "Icon", type: "text" },
        {
          name: "is_active",
          label: "Active",
          type: "checkbox",
          defaultValue: true,
        },
      ],
    },
    events: {
      label: "Events",
      emoji: "📅",
      icon: <Calendar size={24} className="text-yellow-600" />,
      endpoint: api.getEvents,
      createFn: api.createEvent,
      updateFn: api.updateEvent,
      deleteFn: api.deleteEvent,
      fields: [
        { name: "title", label: "Title", type: "text", required: true },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          required: true,
        },
        {
          name: "event_date",
          label: "Event Date",
          type: "date",
          required: true,
        },
        { name: "location", label: "Location", type: "text" },
        {
          name: "is_upcoming",
          label: "Upcoming",
          type: "checkbox",
          defaultValue: true,
        },
      ],
    },
    projects: {
      label: "Projects",
      emoji: "🏗️",
      icon: <Briefcase size={24} className="text-yellow-600" />,
      endpoint: api.getProjects,
      createFn: api.createProject,
      updateFn: api.updateProject,
      deleteFn: api.deleteProject,
      fields: [
        { name: "title", label: "Title", type: "text", required: true },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          required: true,
        },
        { name: "location", label: "Location", type: "text" },
        { name: "program_id", label: "Program ID", type: "text" },
        {
          name: "is_active",
          label: "Active",
          type: "checkbox",
          defaultValue: true,
        },
      ],
    },
    volunteers: {
      label: "Volunteers",
      emoji: "👥",
      icon: <Users size={24} className="text-yellow-600" />,
      endpoint: api.getAdminVolunteers,
      updateFn: (id, d) => api.updateVolunteerStatus(id, d.status),
      fields: [
        {
          name: "status",
          label: "Status",
          type: "select",
          options: ["new", "contacted", "onboarded", "rejected"],
        },
      ],
      readOnly: false,
      noCreate: true,
    },
    messages: {
      label: "Messages",
      emoji: "✉️",
      icon: <Mail size={24} className="text-yellow-600" />,
      endpoint: api.getAdminMessages,
      deleteFn: api.deleteMessage,
      fields: [],
      readOnly: true,
    },
    donations: {
      label: "Pledges",
      emoji: "💖",
      icon: <Heart size={24} className="text-yellow-600" />,
      endpoint: api.getAdminDonations,
      updateFn: (id, d) => api.updateDonationStatus(id, d.status),
      fields: [
        {
          name: "status",
          label: "Payment Status",
          type: "select",
          options: ["pending", "received", "cancelled"],
        },
      ],
      readOnly: false,
      noCreate: true,
    },
    impact: {
      label: "Impact Stats",
      emoji: "📊",
      icon: <BarChart3 size={24} className="text-yellow-600" />,
      endpoint: api.getImpact,
      createFn: api.createImpact,
      updateFn: api.updateImpact,
      deleteFn: api.deleteImpact,
      fields: [
        { name: "title", label: "Title", type: "text", required: true },
        { name: "value", label: "Value", type: "number", required: true },
        { name: "icon", label: "Icon Name", type: "text" },
      ],
    },
  };

  const currentSection = sections[section];

  // --- LOGIC ---

  if (!currentSection) {
    if (section === "dashboard") {
      return <AdminOverview />;
    }
    return <NotFound section={section} />;
  }

  // UPDATED: UseEffect with strict state clearing
  useEffect(() => {
    // 1. Force Loading State immediately when section changes
    setLoading(true);
    setData([]); // Clear old data to prevent crashes
    setError("");
    setEditingItem(null);
    setShowAddForm(false);
    setFormData({});

    // 2. Fetch New Data
    const loadData = async () => {
      try {
        const result = await currentSection.endpoint();
        setData(Array.isArray(result.data) ? result.data : result.data || []);
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    if (currentSection) {
      loadData();
    }
  }, [section]); // Re-run whenever 'section' URL param changes

  // CRUD Handlers...
  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await currentSection.createFn(formData);
      // Re-fetch data to stay in sync
      const result = await currentSection.endpoint();
      setData(Array.isArray(result.data) ? result.data : result.data || []);

      setFormData({});
      setShowAddForm(false);
    } catch {
      setError("Failed to create.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await currentSection.updateFn(editingItem.id, formData);
      // Re-fetch
      const result = await currentSection.endpoint();
      setData(Array.isArray(result.data) ? result.data : result.data || []);

      setEditingItem(null);
      setFormData({});
    } catch {
      setError("Failed to update.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this item?")) return;
    setLoading(true);
    try {
      await currentSection.deleteFn(id);
      // Re-fetch
      const result = await currentSection.endpoint();
      setData(Array.isArray(result.data) ? result.data : result.data || []);
    } catch {
      setError("Failed to delete.");
    } finally {
      setLoading(false);
    }
  };

  // --- RENDER ---
  return (
    <div className="flex-1 overflow-y-auto max-w-7xl mx-auto p-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="text-4xl">{currentSection.emoji}</div>
        <h1 className="text-4xl font-bold text-gray-900">
          {currentSection.label}
        </h1>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg flex items-center gap-2">
          <AlertCircle size={20} /> {error}
        </div>
      )}

      {/* CRITICAL FIX: Don't render Stats/List until loading is done */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <Loader2 className="w-10 h-10 animate-spin mb-4 text-yellow-600" />
          <p>Loading {currentSection.label}...</p>
        </div>
      ) : (
        <>
          <AdminStats
            data={data}
            label={currentSection.label}
            icon={currentSection.icon}
          />

          {!currentSection.readOnly &&
            !currentSection.noCreate &&
            !showAddForm &&
            !editingItem && (
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 mb-6 transition-all"
              >
                <Plus size={20} /> Add New
              </button>
            )}

          {(showAddForm || editingItem) && (
            <AdminForm
              fields={currentSection.fields}
              formData={formData}
              handleInputChange={(e) => {
                const { name, value, type, checked } = e.target;
                setFormData((prev) => ({
                  ...prev,
                  [name]: type === "checkbox" ? checked : value,
                }));
              }}
              handleSubmit={editingItem ? handleUpdate : handleCreate}
              onCancel={() => {
                setShowAddForm(false);
                setEditingItem(null);
                setFormData({});
              }}
              loading={loading}
              isEditing={!!editingItem}
              label={currentSection.label}
            />
          )}

          <AdminList
            data={data}
            loading={loading}
            config={currentSection}
            onEdit={(item) => {
              setEditingItem(item);
              setFormData(item);
              setShowAddForm(false);
            }}
            onDelete={handleDelete}
            emoji={currentSection.emoji}
          />
        </>
      )}
    </div>
  );
}

// 404 Fallback
const NotFound = ({ section }) => (
  <div className="p-12 text-center text-red-500">
    <h2 className="text-2xl font-bold mb-2">Section Not Found</h2>
    <p>The section "{section}" does not exist.</p>
  </div>
);
