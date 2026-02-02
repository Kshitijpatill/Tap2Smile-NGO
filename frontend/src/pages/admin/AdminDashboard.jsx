import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { 
  Plus, Edit2, Trash2, Save, XCircle,
  CheckCircle, Clock, MapPin, Phone, AlertCircle, Mail, Calendar,
  BookOpen, BarChart3, Users, Briefcase
} from "lucide-react";
import * as api from "../../services/api";

export default function AdminDashboard() {
  const { section = "programs" } = useParams();
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({});

  // Section configurations
  const sections = {
    programs: {
      label: "Programs",
      emoji: "📚",
      icon: <BookOpen size={24} className="text-yellow-600" />,
      endpoint: api.fetchPrograms,
      createFn: api.createProgram,
      updateFn: api.updateProgram,
      deleteFn: api.deleteProgram,
      fields: [
        { name: "title", label: "Title", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "icon", label: "Icon (emoji or URL)", type: "text" },
        { name: "image_url", label: "Program Image", type: "file", accept: "image/*" },
        { name: "is_active", label: "Active", type: "checkbox", defaultValue: true }
      ]
    },
    events: {
      label: "Events",
      emoji: "📅",
      icon: <Calendar size={24} className="text-yellow-600" />,
      endpoint: api.fetchEvents,
      createFn: api.createEvent,
      updateFn: api.updateEvent,
      deleteFn: api.deleteEvent,
      fields: [
        { name: "title", label: "Title", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "event_date", label: "Event Date", type: "date", required: true },
        { name: "location", label: "Location", type: "text" },
        { name: "image_url", label: "Event Image", type: "file", accept: "image/*" },
        { name: "is_upcoming", label: "Upcoming", type: "checkbox", defaultValue: true }
      ]
    },
    projects: {
      label: "Projects",
      emoji: "🏗️",
      icon: <Briefcase size={24} className="text-yellow-600" />,
      endpoint: api.fetchProjects,
      createFn: api.createProject,
      updateFn: api.updateProject,
      deleteFn: api.deleteProject,
      fields: [
        { name: "title", label: "Title", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "location", label: "Location", type: "text" },
        { name: "program_id", label: "Program ID", type: "text" },
        { name: "start_date", label: "Start Date", type: "date" },
        { name: "end_date", label: "End Date", type: "date" },
        { name: "image_url", label: "Project Image", type: "file", accept: "image/*" },
        { name: "is_active", label: "Active", type: "checkbox", defaultValue: true }
      ]
    },
    volunteers: {
      label: "Volunteers",
      emoji: "👥",
      icon: <Users size={24} className="text-yellow-600" />,
      endpoint: api.fetchVolunteers,
      fields: [
        { name: "name", label: "Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "phone", label: "Phone", type: "tel", required: true },
        { name: "city", label: "City", type: "text" },
        { name: "interest_area", label: "Interest Area", type: "text" },
        { name: "status", label: "Status", type: "select", options: ["pending", "approved", "active", "inactive"] }
      ],
      readOnly: true
    },
    contacts: {
      label: "Contact Messages",
      emoji: "✉️",
      icon: <Mail size={24} className="text-yellow-600" />,
      endpoint: api.fetchContacts,
      fields: [
        { name: "name", label: "Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "subject", label: "Subject", type: "text", required: true },
        { name: "message", label: "Message", type: "textarea", required: true }
      ],
      readOnly: true
    },
    impact: {
      label: "Impact Stats",
      emoji: "📊",
      endpoint: api.fetchImpact,
      createFn: api.createImpact,
      updateFn: api.updateImpact,
      deleteFn: api.deleteImpact,
      fields: [
        { name: "title", label: "Title", type: "text", required: true },
        { name: "value", label: "Value", type: "number", required: true },
        { name: "icon", label: "Icon (emoji or URL)", type: "text" },
        { name: "image_url", label: "Impact Image", type: "file", accept: "image/*" }
      ]
    }
  };

  const currentSection = sections[section];

  useEffect(() => {
    fetchData();
    resetForm();
  }, [section]);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await currentSection.endpoint();
      setData(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error(`Error fetching ${section}:`, err);
      setError(`Failed to load ${currentSection.label.toLowerCase()}`);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const initializeForm = () => {
    const initialData = {};
    currentSection.fields.forEach(field => {
      if (field.type === "checkbox") {
        initialData[field.name] = field.defaultValue ?? false;
      } else {
        initialData[field.name] = "";
      }
    });
    return initialData;
  };

  const resetForm = () => {
    setFormData(initializeForm());
    setEditingItem(null);
    setShowAddForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const prepareFormData = (data) => {
    // Backend expects JSON payloads; convert File values to their filename
    return Object.fromEntries(
      Object.entries(data)
        .filter(([_, v]) => v !== null && v !== undefined && v !== "")
        .map(([k, v]) => [k, v instanceof File ? v.name : v])
    );
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Prepare data with file handling
      const dataToSend = prepareFormData(formData);
      await currentSection.createFn(dataToSend);
      await fetchData();
      resetForm();
    } catch (error) {
      console.error(`Error creating ${section}:`, error);
      setError(`Failed to create ${currentSection.label.slice(0, -1)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Prepare data with file handling
      const dataToSend = prepareFormData(formData);
      await currentSection.updateFn(editingItem.id, dataToSend);
      await fetchData();
      resetForm();
    } catch (error) {
      console.error(`Error updating ${section}:`, error);
      setError(`Failed to update ${currentSection.label.slice(0, -1)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm(`Are you sure you want to delete this ${currentSection.label.slice(0, -1)}?`)) return;

    setLoading(true);
    try {
      await currentSection.deleteFn(id);
      await fetchData();
    } catch (error) {
      console.error(`Error deleting ${section}:`, error);
      setError(`Failed to delete ${currentSection.label.slice(0, -1)}`);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (item) => {
    setEditingItem(item);
    const editData = {};
    currentSection.fields.forEach(field => {
      editData[field.name] = item[field.name] ?? (field.type === "checkbox" ? false : "");
    });
    setFormData(editData);
    setShowAddForm(false);
  };

  const renderField = (field) => {
    const commonClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white text-gray-900";

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
            placeholder={`Enter ${field.label.toLowerCase()}`}
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
            <span className="text-sm text-gray-700">Active</span>
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
            {field.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      
      case "file":
        return (
          <div className="space-y-2">
            <input
              type="file"
              name={field.name}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFormData(prev => ({
                    ...prev,
                    [field.name]: file
                  }));
                }
              }}
              accept={field.accept}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white text-gray-900 cursor-pointer"
            />
            {formData[field.name] && typeof formData[field.name] === "object" && (
              <p className="text-sm text-green-600">✓ {formData[field.name].name}</p>
            )}
            {formData[field.name] && typeof formData[field.name] === "string" && (
              <p className="text-sm text-blue-600">Current: {formData[field.name]}</p>
            )}
          </div>
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
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );
    }
  };

  const getStatusBadge = (item) => {
    if (item.is_active !== undefined) {
      return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          item.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
        }`}>
          {item.is_active ? "Active" : "Inactive"}
        </span>
      );
    }
    if (item.is_upcoming !== undefined) {
      return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          item.is_upcoming ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
        }`}>
          {item.is_upcoming ? "Upcoming" : "Past"}
        </span>
      );
    }
    if (item.status) {
      const statusColors = {
        pending: "bg-yellow-100 text-yellow-800",
        approved: "bg-green-100 text-green-800",
        active: "bg-green-100 text-green-800",
        inactive: "bg-gray-100 text-gray-800"
      };
      return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[item.status] || "bg-gray-100 text-gray-800"}`}>
          {item.status}
        </span>
      );
    }
    return null;
  };

  const renderItemCard = (item) => {
    return (
      <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h4 className="text-lg font-semibold text-gray-900 truncate">
                {item.title || item.name}
              </h4>
              {getStatusBadge(item)}
            </div>

            {item.description && (
              <p className="text-gray-600 mb-3 line-clamp-2">{item.description}</p>
            )}

            {item.subject && (
              <p className="text-gray-700 font-medium mb-2">Subject: {item.subject}</p>
            )}

            {item.message && section === "contacts" && (
              <p className="text-gray-600 mb-3 line-clamp-2">{item.message}</p>
            )}

            <div className="flex flex-wrap gap-3 text-sm text-gray-500">
              {item.email && (
                <span className="flex items-center gap-1">
                  <Mail size={14} />
                  {item.email}
                </span>
              )}
              {item.phone && (
                <span className="flex items-center gap-1">
                  <Phone size={14} />
                  {item.phone}
                </span>
              )}
              {item.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {item.location}
                </span>
              )}
              {item.city && (
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {item.city}
                </span>
              )}
              {item.event_date && (
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(item.event_date).toLocaleDateString()}
                </span>
              )}
              {item.value !== undefined && (
                <span className="text-lg font-bold text-yellow-600">
                  {item.value.toLocaleString()}+
                </span>
              )}
              {item.interest_area && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                  {item.interest_area}
                </span>
              )}
            </div>

            {item.created_at && (
              <p className="text-xs text-gray-400 mt-2">
                Created: {new Date(item.created_at).toLocaleString()}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            {!currentSection.readOnly && (
              <button
                onClick={() => startEdit(item)}
                className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                title="Edit"
              >
                <Edit2 size={18} />
              </button>
            )}
            <button
              onClick={() => handleDelete(item.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-4xl">{currentSection.emoji}</div>
            <h1 className="text-4xl font-bold text-gray-900">
              {currentSection.label}
            </h1>
          </div>
          <p className="text-gray-600">
            Manage your NGO's {currentSection.label.toLowerCase()} efficiently
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total {currentSection.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{data.length}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  {currentSection.icon}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Active</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {data.filter(item => item.is_active || item.is_upcoming || item.status === "active").length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle size={20} className="text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Last Updated</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {data.length > 0 ? "Today" : "No data"}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Clock size={20} className="text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {!currentSection.readOnly && !showAddForm && !editingItem && (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-all shadow-md hover:shadow-lg mb-6"
            >
              <Plus size={20} />
              Add New {currentSection.label.slice(0, -1)}
            </button>
          )}

          {(showAddForm || editingItem) && (
            <div className="bg-white rounded-xl shadow-lg p-8 mb-6 border-t-4 border-yellow-600">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                {editingItem ? `Edit ${currentSection.label.slice(0, -1)}` : `Add New ${currentSection.label.slice(0, -1)}`}
              </h3>
              <form onSubmit={editingItem ? handleUpdate : handleCreate}>
                <div className="grid gap-6">
                  {currentSection.fields.map(field => (
                    <div key={field.name}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      {renderField(field)}
                    </div>
                  ))}

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                      <Save size={18} />
                      {loading ? "Saving..." : `Save ${currentSection.label.slice(0, -1)}`}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors shadow-md"
                    >
                      <XCircle size={18} />
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                All {currentSection.label} ({data.length})
              </h3>
            </div>

            {loading && !data.length ? (
              <div className="p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-yellow-500 border-t-transparent"></div>
                <p className="text-gray-500 mt-4">Loading {currentSection.label.toLowerCase()}...</p>
              </div>
            ) : data.length === 0 ? (
              <div className="p-12 text-center">
                <div className="text-6xl mb-4">{currentSection.emoji}</div>
                <p className="text-gray-500 text-lg">
                  No {currentSection.label.toLowerCase()} found. {!currentSection.readOnly && "Add your first one to get started!"}
                </p>
              </div>
            ) : (
              <div>
                {data.map(item => renderItemCard(item))}
              </div>
            )}
          </div>
      </div>
    </div>
  );
}