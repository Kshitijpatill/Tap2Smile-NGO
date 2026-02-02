import axios from "axios";

const ADMIN_API = "/api/admin";

export const adminApi = {
  login: (data) =>
    axios.post(`${ADMIN_API}/login`, data),

  getPrograms: (token) =>
    axios.get(`${ADMIN_API}/programs`, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  createProgram: (data, token) =>
    axios.post(`${ADMIN_API}/programs`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  updateProgram: (id, data, token) =>
    axios.put(`${ADMIN_API}/programs/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  deleteProgram: (id, token) =>
    axios.delete(`${ADMIN_API}/programs/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
};
