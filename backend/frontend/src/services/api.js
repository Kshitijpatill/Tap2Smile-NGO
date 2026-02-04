import axios from "axios";

/* =================================================
   BASE CONFIG
================================================= */
const API_URL = "/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =================================================
   AUTH HEADER (BACKWARD COMPATIBLE)
================================================= */
const getAuthHeader = () => {
  const token = localStorage.getItem("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/* =================================================
   RESPONSE INTERCEPTOR (HARD SECURITY)
================================================= */
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.clear();
      localStorage.removeItem("admin_token");

      if (!window.location.pathname.startsWith("/admin/login")) {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

/* =================================================
   SAFE RESPONSE HANDLER
================================================= */
const handle = async (req) => {
  try {
    const res = await req;
    return { success: true, data: res.data };
  } catch (err) {
    console.error("API Error:", err);
    return {
      success: false,
      message:
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Request failed",
      data: null,
    };
  }
};

/* =================================================
   API METHODS
================================================= */
export const api = {
  /* ---------- AUTH ---------- */
  adminLogin: async (email, password) => {
    const fd = new URLSearchParams();
    fd.append("username", email);
    fd.append("password", password);

    return handle(
      axios.post(`${API_URL}/admin/login`, fd, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
    );
  },

  adminLogout: async () => {
    localStorage.removeItem("admin_token");
    return handle(axiosInstance.post("/admin/logout"));
  },

  getAdminProfile: () =>
    handle(
      axiosInstance.get("/admin/me", {
        headers: getAuthHeader(),
      })
    ),

  /* ---------- ADMIN DASHBOARD ---------- */

  // Admins (superadmin)
  getAdmins: () =>
    handle(
      axiosInstance.get("/admin", {
        headers: getAuthHeader(),
      })
    ),

  // Programs
  getPrograms: () => handle(axiosInstance.get("/programs/")),
  createProgram: (data) =>
    handle(
      axiosInstance.post("/programs/", data, {
        headers: getAuthHeader(),
      })
    ),
  updateProgram: (id, data) =>
    handle(
      axiosInstance.put(`/programs/${id}`, data, {
        headers: getAuthHeader(),
      })
    ),
  deleteProgram: (id) =>
    handle(
      axiosInstance.delete(`/programs/${id}`, {
        headers: getAuthHeader(),
      })
    ),

  // Events
  getEvents: () => handle(axiosInstance.get("/events/")),
  createEvent: (data) =>
    handle(
      axiosInstance.post("/events/", data, {
        headers: getAuthHeader(),
      })
    ),
  updateEvent: (id, data) =>
    handle(
      axiosInstance.put(`/events/${id}`, data, {
        headers: getAuthHeader(),
      })
    ),
  deleteEvent: (id) =>
    handle(
      axiosInstance.delete(`/events/${id}`, {
        headers: getAuthHeader(),
      })
    ),

  // Projects
  getProjects: () => handle(axiosInstance.get("/projects/")),
  createProject: (data) =>
    handle(
      axiosInstance.post("/projects/", data, {
        headers: getAuthHeader(),
      })
    ),
  updateProject: (id, data) =>
    handle(
      axiosInstance.put(`/projects/${id}`, data, {
        headers: getAuthHeader(),
      })
    ),
  deleteProject: (id) =>
    handle(
      axiosInstance.delete(`/projects/${id}`, {
        headers: getAuthHeader(),
      })
    ),

  // Volunteers
  getAdminVolunteers: () =>
    handle(
      axiosInstance.get("/volunteers/", {
        headers: getAuthHeader(),
      })
    ),
  updateVolunteerStatus: (id, status) =>
    handle(
      axiosInstance.patch(
        `/volunteers/${id}/status`,
        { status },
        { headers: getAuthHeader() }
      )
    ),

  // Messages
  getAdminMessages: () =>
    handle(
      axiosInstance.get("/contact/", {
        headers: getAuthHeader(),
      })
    ),
  deleteMessage: (id) =>
    handle(
      axiosInstance.delete(`/contact/${id}`, {
        headers: getAuthHeader(),
      })
    ),

  // Donations
  getAdminDonations: () =>
    handle(
      axiosInstance.get("/donations/", {
        headers: getAuthHeader(),
      })
    ),
  updateDonationStatus: (id, status) =>
    handle(
      axiosInstance.patch(
        `/donations/${id}/status`,
        { status },
        { headers: getAuthHeader() }
      )
    ),
};
