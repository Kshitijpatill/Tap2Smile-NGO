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
            // Mock Data Fallback
            return {
                success: true, data: [
                    { id: 1, title: "Education for All", description: "Providing quality education to underprivileged children.", icon: "GraduationCap", cover_image: "/assets/academicknowledge.jpg", is_active: true },
                    { id: 2, title: "Zero Hunger", description: "Ensuring no child goes to bed hungry.", icon: "Utensils", cover_image: "/assets/b4c1eccf-d2fc-4fd7-8851-b447df82a47f.jpg", is_active: true },
                    { id: 3, title: "Women Empowerment", description: "Skill development tailored for women.", icon: "Heart", cover_image: "/assets/7dae08d9-696a-4a7b-badd-88611cea6d80.jpg", is_active: true }
                ]
            };
        }
    },
    createProgram: async (data) => handleResponse(axios.post(`${API_URL}/programs/`, data, { headers: getAuthHeader() })),
    updateProgram: async (id, data) => handleResponse(axios.patch(`${API_URL}/programs/${id}`, data, { headers: getAuthHeader() })),
    deleteProgram: async (id) => handleResponse(axios.delete(`${API_URL}/programs/${id}`, { headers: getAuthHeader() })),

    getProjects: async () => {
        try {
            return await handleResponse(axios.get(`${API_URL}/projects/`));
        } catch {
            // Mock Data Fallback
            return {
                success: true, data: [
                    { id: 1, title: "Weekend School", program_id: 1, location: "Mumbai", created_at: new Date().toISOString() },
                    { id: 2, title: "Food Distribution Drive", program_id: 2, location: "Pune", created_at: new Date().toISOString() }
                ]
            };
        }
    },
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
            // Mock Data Fallback
            return {
                success: true, data: [
                    { id: 1, title: "Annual Charity Gala", date: "2024-12-25", location: "Mumbai", description: "Join us for an evening of giving." },
                    { id: 2, title: "Marathon for Peace", date: "2024-01-15", location: "Pune", description: "Running for a cause." }
                ]
            };
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

    getSlides: async () => {
        try {
            return await handleResponse(axios.get(`${API_URL}/slides`));
        } catch {
            return { success: false, data: [] }; // HeroSlider handles empty data by using its default slides
        }
    }
};
