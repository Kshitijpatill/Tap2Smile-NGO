import axios from "axios";

const API_URL = "/api";

const getAuthHeader = () => {
    const token = localStorage.getItem("admin_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleResponse = async (request) => {
    try {
        const response = await request;
        return { success: true, data: response.data };
    } catch (error) {
        console.error("API Error:", error);
        return {
            success: false,
            message: error.response?.data?.detail || "Something went wrong"
        };
    }
};

export const api = {

    adminLogin: async (email, password) => {
        const formData = new FormData();
        formData.append("username", email);
        formData.append("password", password);

        try {
            const res = await axios.post(`${API_URL}/admin/login`, formData);
            if (res.data.access_token) {
                localStorage.setItem("admin_token", res.data.access_token);
                return { success: true };
            }
        } catch (error) {
            return { success: false, message: "Invalid Credentials" };
        }
    },

    adminLogout: () => {
        localStorage.removeItem("admin_token");
        window.location.href = "/admin/login";
    },

    getAdminProfile: async () => {
        return handleResponse(axios.get(`${API_URL}/admin/me`, { headers: getAuthHeader() }));
    },


    getPrograms: async () => {
        try {
            const res = await axios.get(`${API_URL}/programs/`);

            const adaptedData = res.data.map(p => ({
                id: p.id,
                title: p.title ?? "",
                description: p.description ?? "",
                icon: ["Utensils", "BookOpen", "Home", "Heart"].includes(p.icon) ? p.icon : "Heart",
                cover_image: typeof p.cover_image === "string" && (p.cover_image.startsWith("http") || p.cover_image.startsWith("/assets"))
                    ? p.cover_image
                    : "/placeholder.jpg",
                is_active: p.is_active
            }));

            return { success: true, data: adaptedData };
        } catch (error) {
            console.error("Programs Fetch Error", error);
            return { success: false, data: [] };
        }
    },
    createProgram: async (data) => handleResponse(axios.post(`${API_URL}/programs/`, data, { headers: getAuthHeader() })),
    updateProgram: async (id, data) => handleResponse(axios.patch(`${API_URL}/programs/${id}`, data, { headers: getAuthHeader() })),
    deleteProgram: async (id) => handleResponse(axios.delete(`${API_URL}/programs/${id}`, { headers: getAuthHeader() })),


    getEvents: async () => {
        try {
            const res = await axios.get(`${API_URL}/events/`);
            const adaptedData = res.data.map(e => ({
                ...e,
                date: e.event_date
            }));
            return { success: true, data: adaptedData };
        } catch (error) {
            return { success: false, data: [] };
        }
    },
    createEvent: async (data) => handleResponse(axios.post(`${API_URL}/events/`, data, { headers: getAuthHeader() })),
    updateEvent: async (id, data) => handleResponse(axios.patch(`${API_URL}/events/${id}`, data, { headers: getAuthHeader() })),
    deleteEvent: async (id) => handleResponse(axios.delete(`${API_URL}/events/${id}`, { headers: getAuthHeader() })),


    getProjects: async () => handleResponse(axios.get(`${API_URL}/projects/`)),
    createProject: async (data) => handleResponse(axios.post(`${API_URL}/projects/`, data, { headers: getAuthHeader() })),
    updateProject: async (id, data) => handleResponse(axios.patch(`${API_URL}/projects/${id}`, data, { headers: getAuthHeader() })),
    deleteProject: async (id) => handleResponse(axios.delete(`${API_URL}/projects/${id}`, { headers: getAuthHeader() })),


    getImpact: async () => handleResponse(axios.get(`${API_URL}/impact/`)),
    createImpact: async (data) => handleResponse(axios.post(`${API_URL}/impact/`, data, { headers: getAuthHeader() })),
    updateImpact: async (id, data) => handleResponse(axios.patch(`${API_URL}/impact/${id}`, data, { headers: getAuthHeader() })),
    deleteImpact: async (id) => handleResponse(axios.delete(`${API_URL}/impact/${id}`, { headers: getAuthHeader() })),


    submitVolunteer: async (data) => {
        const payload = {
            name: data.full_name,
            email: data.email,
            phone: data.phone,
            city: data.city,
            interest_area: data.interest_area
        };
        return handleResponse(axios.post(`${API_URL}/volunteers/`, payload));
    },
    getAdminVolunteers: async () => handleResponse(axios.get(`${API_URL}/volunteers/`, { headers: getAuthHeader() })),
    updateVolunteerStatus: async (id, status) => handleResponse(axios.patch(`${API_URL}/volunteers/${id}/status`, { status }, { headers: getAuthHeader() })),


    submitContact: async (data) => {
        return handleResponse(axios.post(`${API_URL}/contact/`, data));
    },
    getAdminMessages: async () => handleResponse(axios.get(`${API_URL}/contact/`, { headers: getAuthHeader() })),
    deleteMessage: async (id) => handleResponse(axios.delete(`${API_URL}/contact/${id}`, { headers: getAuthHeader() })),



    submitDonation: async (data) => {
        const payload = {
            donor_name: data.name,
            donor_email: data.email,
            donor_phone: data.phone,
            amount: parseFloat(data.amount),
            message: "Website Donation Pledge"
        };
        return handleResponse(axios.post(`${API_URL}/donations/`, payload));
    },
    getAdminDonations: async () => {
        return handleResponse(axios.get(`${API_URL}/donations/`, { headers: getAuthHeader() }));
    },
    updateDonationStatus: async (id, status) => {
        return handleResponse(axios.patch(`${API_URL}/donations/${id}/status`,
            { status: status },
            { headers: getAuthHeader() }
        ));
    }
};

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



import axios from "axios";

const API_URL = "/api";

const handleResponse = async (request) => {
    try {
        const response = await request;
        return { success: true, data: response.data };
    } catch (error) {
        console.error("API Error:", error);
        return {
            success: false,
            message: error.response?.data?.detail || "Something went wrong"
        };
    }
};

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const PROJECTS = [
//     {
//         id: "p1",
//         title: "School Kit Distribution",
//         program: "Education",
//         date: "2025-06-12",
//         thumbnail: "/assets/3af1fa51-2586-4b2f-80de-f8d549a15094.jpg",
//     },
//     {
//         id: "p2",
//         title: "Clean Water Initiative",
//         program: "Food & Water",
//         date: "2025-08-05",
//         thumbnail: "/assets/7dae08d9-696a-4a7b-badd-88611cea6d80.jpg",
//     },
//     {
//         id: "p3",
//         title: "Winter Relief Drive",
//         program: "Home & Shelter",
//         date: "2025-11-20",
//         thumbnail: "/assets/86b0333e-99d5-4d90-8b01-e07595cc170d.jpg",
//     },
// ];

export const api = {
    getPrograms: async () => {
        try {
            const res = await axios.get(`${API_URL}/programs/`);

            const adaptedData = res.data.map(p => ({
                id: p.id,
                title: p.title ?? "",
                description: p.description ?? "",
                icon: ["Utensils", "BookOpen", "Home", "Heart"].includes(p.icon)
                    ? p.icon
                    : "Heart",
                cover_image:
                    typeof p.cover_image === "string" &&
                        (p.cover_image.startsWith("http") ||
                            p.cover_image.startsWith("/assets"))
                        ? p.cover_image
                        : "/placeholder.jpg"

            }));


            return { success: true, data: adaptedData };
        } catch (error) {
            console.error("Programs Fetch Error", error);
            return { success: false, data: [] };
        }
    },
    getEvents: async () => {
        try {
            const res = await axios.get(`${API_URL}/events/`);
            const adaptedData = res.data.map(e => ({
                ...e,
                date: e.event_date
            }));
            return { success: true, data: adaptedData };
        } catch (error) {
            return { success: false, data: [] };
        }
    },
    getProjects: async () => {
        return handleResponse(axios.get(`${API_URL}/projects/`));
    },

    submitVolunteer: async (data) => {
        const payload = {
            name: data.full_name,
            email: data.email,
            phone: data.phone,
            city: data.city,
            interest_area: data.interest_area
        };
        return handleResponse(axios.post(`${API_URL}/volunteers/`, payload));
    },
    submitContact: async (data) => {
        return handleResponse(axios.post(`${API_URL}/contact/`, data));
    },
    submitDonation: async (data) => {
        const payload = {
            donor_name: data.name,
            donor_email: data.email,
            donor_phone: data.phone,
            amount: parseFloat(data.amount),
            message: "Website Donation Pledge"
        };
        return handleResponse(axios.post(`${API_URL}/donations/`, payload));
    }
};