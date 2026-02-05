import {
  BookOpen,
  Calendar,
  Briefcase,
  Users,
  Mail,
  Heart,
  BarChart3,
  AlertCircle,
  Shield
} from "lucide-react";
import { api } from "../../../services/api";

export const SECTION_CONFIG = {
  programs: {
    label: "Programs",
    emoji: "📚",
    icon: <BookOpen size={24} className="text-yellow-600" />,
    fetchFn: api.getPrograms,
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
      { name: "icon", label: "Icon Name (e.g. Heart, School)", type: "text" },
      { name: "cover_image", label: "Cover Image URL", type: "text" },
      {
        name: "is_active",
        label: "Active",
        type: "checkbox",
        defaultValue: true,
      },
    ],
  },
  projects: {
    label: "Projects",
    emoji: "🏗️",
    icon: <Briefcase size={24} className="text-yellow-600" />,
    fetchFn: api.getAdminProjects,
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
      // Updated to Multi Select
      {
        name: "program_ids",
        label: "Programs (Select Multiple)",
        type: "program_multi_select",
        required: true,
      },
      // Updated to handle array as comma-separated string for simplicity in UI, or generic text input
      { name: "images", label: "Image URL", type: "text" },
      { name: "start_date", label: "Start Date", type: "date" },
      { name: "end_date", label: "End Date", type: "date" },
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
    fetchFn: api.getEvents,
    createFn: api.createEvent,
    updateFn: api.updateEvent,
    deleteFn: api.deleteEvent,
    fields: [
      { name: "title", label: "Event Title", type: "text", required: true },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        required: true,
      },
      { name: "event_date", label: "Event Date", type: "date", required: true },
      { name: "location", label: "Location", type: "text" },
      {
        name: "is_upcoming",
        label: "Is Upcoming?",
        type: "checkbox",
        defaultValue: true,
      },
    ],
  },
  volunteers: {
    label: "Volunteers",
    emoji: "👥",
    icon: <Users size={24} className="text-yellow-600" />,
    fetchFn: api.getAdminVolunteers,
    updateFn: api.updateVolunteer, // Now allows editing
    deleteFn: api.deleteVolunteer, // Added delete
    fields: [
      { name: "name", label: "Name", type: "text", readOnly: true },
      { name: "email", label: "Email", type: "text", readOnly: true },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["new", "contacted", "onboarded", "rejected"],
      },
    ],
  },
  donations: {
    label: "Pledges",
    emoji: "💖",
    icon: <Heart size={24} className="text-yellow-600" />,
    fetchFn: api.getAdminDonations,
    createFn: api.createDonation, // Enabled CRUD
    updateFn: api.updateDonation,
    deleteFn: api.deleteDonation,
    fields: [
      { name: "donor_name", label: "Donor Name", type: "text", required: true },
      { name: "donor_email", label: "Donor Email", type: "text" },
      { name: "amount", label: "Amount", type: "number", required: true },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["pending", "received", "cancelled"],
      },
    ],
  },
  impact: {
    label: "Impact Stats",
    emoji: "📊",
    icon: <BarChart3 size={24} className="text-yellow-600" />,
    fetchFn: api.getImpact,
    createFn: api.createImpact,
    updateFn: api.updateImpact,
    deleteFn: api.deleteImpact,
    fields: [
      {
        name: "title",
        label: "Stat Title (e.g. Trees Planted)",
        type: "text",
        required: true,
      },
      {
        name: "value",
        label: "Value (e.g. 5000)",
        type: "number",
        required: true,
      },
      { name: "icon", label: "Icon Name", type: "text" },
    ],
  },
  messages: {
    label: "Messages",
    emoji: "✉️",
    icon: <Mail size={24} className="text-yellow-600" />,
    fetchFn: api.getAdminMessages,
    deleteFn: api.deleteMessage,
    readOnly: true,
    customActions: true,
  },
  admins: {
    label: "Admins",
    emoji: "🛡️",
    icon: <Shield size={24} className="text-yellow-600" />,
    fetchFn: api.getAdmins,
    createFn: api.createAdmin,
    deleteFn: api.deleteAdmin,
    canEdit: false,
    fields: [
      { name: "email", label: "Email Address", type: "text", required: true },
      { name: "password", label: "Password", type: "password", required: true },
    ],
  },
};
