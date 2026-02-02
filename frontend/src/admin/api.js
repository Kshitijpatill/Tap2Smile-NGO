// Admin API Layer - Centralized backend communication
const API_BASE = "http://127.0.0.1:8000";

/**
 * Get stored auth token
 */
function getAuthToken() {
  return sessionStorage.getItem("adminToken");
}

/**
 * Store auth token
 */
function setAuthToken(token) {
  sessionStorage.setItem("adminToken", token);
}

/**
 * Clear auth token
 */
export function clearAuthToken() {
  sessionStorage.removeItem("adminToken");
  sessionStorage.removeItem("adminLoggedIn");
}

/**
 * Normalized API request handler
 * Converts MongoDB _id to id for consistency
 * Handles both JSON and FormData (for file uploads)
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const token = getAuthToken();
  
  try {
    const headers = { ...options.headers };

    // Add auth token if available
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Only add Content-Type for non-FormData requests
    if (!(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(url, {
      headers,
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || `HTTP ${response.status}`);
    }

    const data = await response.json();

    // Normalize MongoDB _id to id
    if (Array.isArray(data)) {
      return data.map(item => normalizeItem(item));
    }

    return normalizeItem(data);
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

/**
 * Convert MongoDB _id to id field
 */
function normalizeItem(item) {
  if (item && item._id && !item.id) {
    return { ...item, id: item._id };
  }
  return item;
}

/**
 * Serialize data - handles both FormData and JSON
 */
function serializeBody(data) {
  if (data instanceof FormData) {
    return data; // Return FormData as-is
  }
  return JSON.stringify(data);
}

// ==================== AUTHENTICATION ====================
export async function loginAdmin(email, password) {
  // Use application/x-www-form-urlencoded which OAuth2PasswordRequestForm expects
  const body = new URLSearchParams();
  body.append("username", email);
  body.append("password", password);

  try {
    const response = await fetch(`${API_BASE}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    if (!response.ok) {
      // Try to parse JSON error, otherwise throw generic
      let errMsg = `HTTP ${response.status}`;
      try {
        const e = await response.json();
        errMsg = e.detail || e.message || errMsg;
      } catch (_) {}
      throw new Error(errMsg || "Login failed");
    }

    const data = await response.json();
    setAuthToken(data.access_token);
    return data;
  } catch (err) {
    console.error("loginAdmin error:", err);
    // Re-throw a friendly error that the UI can display
    throw new Error(err.message || "Failed to fetch");
  }
}

// ==================== PROGRAMS ====================
export async function fetchPrograms() {
  return apiRequest("/api/programs");
}

export async function createProgram(data) {
  return apiRequest("/api/programs", {
    method: "POST",
    body: serializeBody(data),
  });
}

export async function updateProgram(id, data) {
  return apiRequest(`/api/programs/${id}`, {
    method: "PUT",
    body: serializeBody(data),
  });
}

export async function deleteProgram(id) {
  return apiRequest(`/api/programs/${id}`, {
    method: "DELETE",
  });
}

// ==================== EVENTS ====================
export async function fetchEvents() {
  return apiRequest("/api/events");
}

export async function createEvent(data) {
  return apiRequest("/api/events", {
    method: "POST",
    body: serializeBody(data),
  });
}

export async function updateEvent(id, data) {
  return apiRequest(`/api/events/${id}`, {
    method: "PUT",
    body: serializeBody(data),
  });
}

export async function deleteEvent(id) {
  return apiRequest(`/api/events/${id}`, {
    method: "DELETE",
  });
}

// ==================== PROJECTS ====================
export async function fetchProjects() {
  return apiRequest("/api/projects");
}

export async function createProject(data) {
  return apiRequest("/api/projects", {
    method: "POST",
    body: serializeBody(data),
  });
}

export async function updateProject(id, data) {
  return apiRequest(`/api/projects/${id}`, {
    method: "PUT",
    body: serializeBody(data),
  });
}

export async function deleteProject(id) {
  return apiRequest(`/api/projects/${id}`, {
    method: "DELETE",
  });
}

// ==================== VOLUNTEERS ====================
export async function fetchVolunteers() {
  return apiRequest("/api/volunteers");
}

// Read-only section - no create/update/delete for volunteers

// ==================== CONTACTS ====================
export async function fetchContacts() {
  return apiRequest("/api/contacts");
}

// Read-only section - no create/update/delete for contacts

// ==================== IMPACT ====================
export async function fetchImpact() {
  return apiRequest("/api/impact");
}

export async function createImpact(data) {
  return apiRequest("/api/impact", {
    method: "POST",
    body: serializeBody(data),
  });
}

export async function updateImpact(id, data) {
  return apiRequest(`/api/impact/${id}`, {
    method: "PUT",
    body: serializeBody(data),
  });
}

export async function deleteImpact(id) {
  return apiRequest(`/api/impact/${id}`, {
    method: "DELETE",
  });
}
