import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "../admin/AdminLogin";
import AdminDevLogin from "../admin/AdminDevLogin";
import AdminLayout from "../admin/AdminLayout";
import AdminDashboard from "../admin/AdminDashboard";

/**
 * Admin Routes - Separate from public routes
 * NO public Layout (Navbar/Footer)
 * Only admin pages with their own layouts
 */
export default function AdminRoutes() {
  return (
    <Routes>
      {/* Login - No sidebar */}
      <Route path="/login" element={<AdminLogin />} />
      {/* Dev helper: auto-login with test admin credentials and redirect */}
      <Route path="/dev" element={<AdminDevLogin />} />

      {/* Dashboard - With sidebar layout */}
      <Route path="/dashboard" element={<AdminLayout />}>
        {/* Default section when visiting /admin/dashboard */}
        <Route index element={<Navigate to="programs" replace />} />
        
        {/* Dynamic section routing */}
        <Route path=":section" element={<AdminDashboard />} />
      </Route>

      {/* Fallback to dashboard */}
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}
