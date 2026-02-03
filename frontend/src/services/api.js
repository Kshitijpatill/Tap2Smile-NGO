const BASE_URL = '/api';

const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
        return { success: false, message: data.message || 'Something went wrong' };
    }
    return data;
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

    getPrograms: async () => {
        try {
            const response = await fetch(`${BASE_URL}/programs`);
            return await handleResponse(response);
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    getEvents: async () => {
        try {
            const response = await fetch(`${BASE_URL}/events`);
            return await handleResponse(response);
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    getProjects: async () => {
        try {
            const response = await fetch(`${BASE_URL}/projects`);
            return await handleResponse(response);
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    submitVolunteer: async (data) => {
        try {
            const response = await fetch(`${BASE_URL}/volunteers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            return await handleResponse(response);
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    submitContact: async (data) => {
        try {
            const response = await fetch(`${BASE_URL}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            return await handleResponse(response);
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    // Admin Auth
    login: async (credentials) => {
        try {
            const response = await fetch(`${BASE_URL}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
            const result = await handleResponse(response);
            if (result.success && result.data?.token) {
                localStorage.setItem('admin_token', result.data.token);
                localStorage.setItem('admin_user', JSON.stringify(result.data.user));
            }
            return result;
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    logout: () => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
    }
};
