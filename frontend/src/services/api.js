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

    requestPasswordReset: async (email) => {
        try {
            const res = await axios.post(`${API_URL}/admin/forgot-password`, { email });
            return { success: true, message: res.data.message };
        } catch (error) {
            return { success: false, message: "Request failed" };
        }
    },

    adminLogout: () => {
        localStorage.removeItem("admin_token");
        window.location.href = "/admin/login";
    },

    getAdminProfile: async () => {
        return handleResponse(axios.get(`${API_URL}/admin/me`, { headers: getAuthHeader() }));
    },
    getAdmins: async () => handleResponse(axios.get(`${API_URL}/admin/`, { headers: getAuthHeader() })),
    createAdmin: async (data) => handleResponse(axios.post(`${API_URL}/admin/`, data, { headers: getAuthHeader() })),
    deleteAdmin: async (id) => handleResponse(axios.delete(`${API_URL}/admin/${id}`, { headers: getAuthHeader() })),


    getPrograms: async () => {
        try {
            const res = await axios.get(`${API_URL}/programs/`);
            const adaptedData = res.data.map(p => ({
                id: p.id,
                title: p.title ?? "Untitled",
                description: p.description ?? "",
                icon: p.icon || "Heart",
                cover_image: p.cover_image || "/placeholder.jpg",
                is_active: p.is_active
            }));
            return { success: true, data: adaptedData };
        } catch (error) {
            return { success: false, data: [] };
        }
    },
    createProgram: async (data) => handleResponse(axios.post(`${API_URL}/programs/`, data, { headers: getAuthHeader() })),
    updateProgram: async (id, data) => handleResponse(axios.patch(`${API_URL}/programs/${id}`, data, { headers: getAuthHeader() })),
    deleteProgram: async (id) => handleResponse(axios.delete(`${API_URL}/programs/${id}`, { headers: getAuthHeader() })),

    getProjects: async () => handleResponse(axios.get(`${API_URL}/projects/`)),
    getAdminProjects: async () => handleResponse(axios.get(`${API_URL}/projects/admin`, { headers: getAuthHeader() })),
    createProject: async (data) => handleResponse(axios.post(`${API_URL}/projects/`, data, { headers: getAuthHeader() })),
    updateProject: async (id, data) => handleResponse(axios.patch(`${API_URL}/projects/${id}`, data, { headers: getAuthHeader() })),
    deleteProject: async (id) => handleResponse(axios.delete(`${API_URL}/projects/${id}`, { headers: getAuthHeader() })),


    getEvents: async () => {
        try {
            const res = await axios.get(`${API_URL}/events/`);
            const adaptedData = res.data.map(e => ({ ...e, date: e.event_date }));
            return { success: true, data: adaptedData };
        } catch (error) {
            return { success: false, data: [] };
        }
    },
    createEvent: async (data) => handleResponse(axios.post(`${API_URL}/events/`, data, { headers: getAuthHeader() })),
    updateEvent: async (id, data) => handleResponse(axios.patch(`${API_URL}/events/${id}`, data, { headers: getAuthHeader() })),
    deleteEvent: async (id) => handleResponse(axios.delete(`${API_URL}/events/${id}`, { headers: getAuthHeader() })),

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
    deleteVolunteer: async (id) => handleResponse(axios.delete(`${API_URL}/volunteers/${id}`, { headers: getAuthHeader() })),
    updateVolunteer: async (id, data) => handleResponse(axios.patch(`${API_URL}/volunteers/${id}`, data, { headers: getAuthHeader() })),
    getAdminVolunteers: async () => handleResponse(axios.get(`${API_URL}/volunteers/`, { headers: getAuthHeader() })),
    updateVolunteerStatus: async (id, status) => handleResponse(axios.patch(`${API_URL}/volunteers/${id}/status`, { status }, { headers: getAuthHeader() })),

    submitContact: async (data) => handleResponse(axios.post(`${API_URL}/contact/`, data)),
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

    getAdminDonations: async () => handleResponse(axios.get(`${API_URL}/donations/`, { headers: getAuthHeader() })),
    createDonation: async (data) => handleResponse(axios.post(`${API_URL}/donations/`, data, { headers: getAuthHeader() })),
    updateDonation: async (id, data) => handleResponse(axios.patch(`${API_URL}/donations/${id}`, data, { headers: getAuthHeader() })),
    updateDonationStatus: async (id, status) => handleResponse(axios.patch(`${API_URL}/donations/${id}/status`, { status }, { headers: getAuthHeader() })),
    deleteDonation: async (id) => handleResponse(axios.delete(`${API_URL}/donations/${id}`, { headers: getAuthHeader() })),

    getSlides: async () => handleResponse(axios.get(`${API_URL}/slides`))
};
