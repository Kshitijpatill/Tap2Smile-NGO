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
