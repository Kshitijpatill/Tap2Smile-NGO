import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Plus, Loader2, AlertCircle, Trash2, Check, X 
} from "lucide-react";

// Components
import AdminStats from "./Dashboard_Components/AdminStats";
import AdminForm from "./Dashboard_Components/AdminForm";
import AdminList from "./Dashboard_Components/AdminList";
import AdminOverview from "./Dashboard_Components/AdminOverview";

// Configuration
import { SECTION_CONFIG } from "./config/sections";

export default function AdminDashboard() {
  const { section = "dashboard" } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal State
  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const currentSection = SECTION_CONFIG[section];

  // --- FETCH DATA ---
  const fetchData = async () => {
    if (!currentSection) return;
    setLoading(true);
    setError("");
    try {
      const res = await currentSection.fetchFn();
      if (res.success) {
        setData(Array.isArray(res.data) ? res.data : []);
      } else {
        setError("Failed to load data.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (section === "dashboard") return;
    if (!currentSection) {
        navigate("/admin/dashboard");
        return;
    }
    fetchData();
  }, [section]);

  // --- HANDLERS ---
  const handleOpenCreate = () => {
    setEditingItem(null);
    setShowAddForm(true);
  };

  const handleOpenEdit = (item) => {
    // Data Mapping for Form Compatibility
    let editData = { ...item };
    
    // Flatten Image Array to String for Display (taking first image)
    if (section === "projects" && Array.isArray(item.images)) {
        editData.images = item.images[0] || "";
    }
    
    setEditingItem(editData);
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditingItem(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    setLoading(true);
    try {
      const res = await currentSection.deleteFn(id);
      if (res.success) fetchData();
      else alert(res.message || "Failed to delete");
    } catch (err) {
      alert("Failed to delete item.");
    } finally {
      setLoading(false);
    }
  };

  // --- RENDER ---
  if (section === "dashboard") {
    return <AdminOverview />;
  }

  if (!currentSection) return null;

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto w-full">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold border border-brand-gold/20">
            {currentSection.icon}
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
              {currentSection.label} <span className="text-2xl opacity-80">{currentSection.emoji}</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
              Manage your {currentSection.label.toLowerCase()}
            </p>
          </div>
        </div>

        {!currentSection.readOnly && (
          <button 
            onClick={handleOpenCreate}
            className="btn-primary flex items-center gap-2 shadow-xl shadow-brand-gold/10"
          >
            <Plus size={20} /> <span className="font-bold">Add New</span>
          </button>
        )}
      </div>

      {/* ERROR DISPLAY */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl flex items-center gap-3">
          <AlertCircle size={20} /> {error}
        </div>
      )}

      {/* CONTENT AREA */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-10 h-10 text-brand-gold animate-spin" />
        </div>
      ) : (
        <>
          <AdminStats data={data} label={currentSection.label} icon={currentSection.icon} />
          
          <AdminList 
            data={data} 
            section={section}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
            readOnly={currentSection.readOnly} // Pass readOnly prop if needed in list
            customActions={currentSection.customActions}
          />
        </>
      )}

      {/* MODAL FORM */}
      {showAddForm && (
        <AdminForm 
          section={section}
          initialData={editingItem}
          fields={currentSection.fields}
          onClose={handleCloseForm}
          onSuccess={() => {
            handleCloseForm();
            fetchData();
          }}
        />
      )}
    </div>
  );
}