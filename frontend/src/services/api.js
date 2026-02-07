import axios from "axios";
axios.defaults.withCredentials = true;
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
    return data;
};

// ✅ FIX: Helper function to clean data before sending to API
const cleanData = (data) => {
    const cleaned = { ...data };
    Object.keys(cleaned).forEach(key => {
        // Convert empty strings to null for optional fields
        if (cleaned[key] === "") {
            cleaned[key] = null;
        }
    });
    return cleaned;
};

export const api = {
    // Auth & Token management (for Admin)
    setToken: (token) => {
        if (token) {
            localStorage.setItem('admin_token', token);
        } else {
            localStorage.removeItem('admin_token');
        }
    },
    getToken: () => localStorage.getItem('admin_token'),

    // Headers helper
    getHeaders: () => {
        const headers = {
            'Content-Type': 'application/json',
        };
        const token = localStorage.getItem('admin_token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    },

    adminLogout: () => {
        localStorage.removeItem("admin_token");
        window.location.href = "/admin/login";
    },

    getAdminProfile: async () => {
        return handleResponse(axios.get(`${API_URL}/admin/me`, { headers: getAuthHeader() }));
    },
    getAdmins: async () => handleResponse(axios.get(`${API_URL}/admin/`, { headers: getAuthHeader() })),
    createAdmin: async (data) => handleResponse(axios.post(`${API_URL}/admin/`, cleanData(data), { headers: getAuthHeader() })),
    deleteAdmin: async (id) => handleResponse(axios.delete(`${API_URL}/admin/${id}`, { headers: getAuthHeader() })),


    getPrograms: async () => {
        try {
            const response = await fetch(`${BASE_URL}/programs`);
            return await handleResponse(response);
        } catch (error) {
            return { success: false, message: error.message };
        }
    },
    // ✅ FIX: Clean data before sending
    createProgram: async (data) => handleResponse(axios.post(`${API_URL}/programs/`, cleanData(data), { headers: getAuthHeader() })),
    updateProgram: async (id, data) =>
        handleResponse(
            axios.put(`${API_URL}/programs/${id}`, cleanData(data), {
                headers: getAuthHeader()
            })
        ),

    deleteProgram: async (id) => handleResponse(axios.delete(`${API_URL}/programs/${id}`, { headers: getAuthHeader() })),

    getProjects: async () => {
        try {
            const response = await fetch(`${BASE_URL}/projects`);
            return await handleResponse(response);
        } catch (error) {
            return { success: false, message: error.message };
        }
    },
    getAdminProjects: async () =>
        handleResponse(
            axios.get(`${API_URL}/projects/admin`, {
                headers: {
                    ...getAuthHeader(),
                    "Content-Type": "application/json"
                }
            })
        ),

    // ✅ FIX: Clean data before sending
    createProject: async (data) => handleResponse(axios.post(`${API_URL}/projects/`, cleanData(data), { headers: getAuthHeader() })),
    updateProject: async (id, data) => handleResponse(axios.patch(`${API_URL}/projects/${id}`, cleanData(data), { headers: getAuthHeader() })),
    deleteProject: async (id) => handleResponse(axios.delete(`${API_URL}/projects/${id}`, { headers: getAuthHeader() })),


    getEvents: async () => {
        try {
            const response = await fetch(`${BASE_URL}/events`);
            return await handleResponse(response);
        } catch (error) {
            return { success: false, message: error.message };
        }
    },
    createEvent: async (data) => handleResponse(axios.post(`${API_URL}/events/`, cleanData(data), { headers: getAuthHeader() })),
    updateEvent: async (id, data) => handleResponse(axios.patch(`${API_URL}/events/${id}`, cleanData(data), { headers: getAuthHeader() })),
    deleteEvent: async (id) => handleResponse(axios.delete(`${API_URL}/events/${id}`, { headers: getAuthHeader() })),

    getImpact: async () => handleResponse(axios.get(`${API_URL}/impact/`)),
    getImpactStats: async () => {
        try {
            const response = await fetch(`${BASE_URL}/impact`);
            return await handleResponse(response);
        } catch (error) {
            return { success: false, message: error.message };
        }
    },
    createImpact: async (data) => handleResponse(axios.post(`${API_URL}/impact/`, cleanData(data), { headers: getAuthHeader() })),
    updateImpact: async (id, data) => handleResponse(axios.patch(`${API_URL}/impact/${id}`, cleanData(data), { headers: getAuthHeader() })),
    deleteImpact: async (id) => handleResponse(axios.delete(`${API_URL}/impact/${id}`, { headers: getAuthHeader() })),

    submitVolunteer: async (data) => {
        const payload = {
            name: data.full_name,
            email: data.email,
            phone: data.phone,
            city: data.city,
            interest_area: data.interest_area
        };
        return handleResponse(axios.post(`${API_URL}/volunteers/`, cleanData(payload)));
    },
    deleteVolunteer: async (id) => handleResponse(axios.delete(`${API_URL}/volunteers/${id}`, { headers: getAuthHeader() })),
    updateVolunteer: async (id, data) => handleResponse(axios.patch(`${API_URL}/volunteers/${id}`, cleanData(data), { headers: getAuthHeader() })),
    getAdminVolunteers: async () => handleResponse(axios.get(`${API_URL}/volunteers/`, { headers: getAuthHeader() })),
    updateVolunteerStatus: async (id, status) => handleResponse(axios.patch(`${API_URL}/volunteers/${id}/status`, { status }, { headers: getAuthHeader() })),

    submitContact: async (data) => handleResponse(axios.post(`${API_URL}/contact/`, cleanData(data))),
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
        return handleResponse(axios.post(`${API_URL}/donations/`, cleanData(payload)));
    },
    getAdminDonations: async () => handleResponse(axios.get(`${API_URL}/donations/`, { headers: getAuthHeader() })),
    createDonation: async (data) => handleResponse(axios.post(`${API_URL}/donations/`, cleanData(data), { headers: getAuthHeader() })),
    updateDonation: async (id, data) => handleResponse(axios.patch(`${API_URL}/donations/${id}`, cleanData(data), { headers: getAuthHeader() })),
    updateDonationStatus: async (id, status) => handleResponse(axios.patch(`${API_URL}/donations/${id}/status`, { status }, { headers: getAuthHeader() })),
    deleteDonation: async (id) => handleResponse(axios.delete(`${API_URL}/donations/${id}`, { headers: getAuthHeader() }))
};
