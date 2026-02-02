import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// --- PUBLIC COMPONENTS ---
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";

// --- ADMIN COMPONENTS ---
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import DonationsList from "./pages/admin/DonationsList";

// Simple Placeholder for the Dashboard Home
const DashboardHome = () => (
  <div className="p-4 text-gray-400">
    <h2 className="text-2xl font-bold text-white mb-4">Welcome, Admin</h2>
    <p>Select an item from the sidebar to manage records.</p>
  </div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        
        {/* GROUP 1: PUBLIC WEBSITE (Wrapped in Navbar & Footer) */}
        {/* The 'Layout' component will wrap all these child routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
        </Route>

        {/* GROUP 2: ADMIN LOGIN (Standalone Page, No Layout) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* GROUP 3: ADMIN DASHBOARD (Wrapped in Sidebar Layout) */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Default page when visiting /admin */}
          <Route index element={<DashboardHome />} />
          
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="donations" element={<DonationsList />} />
          {/* Add more admin routes here later (e.g., volunteers, messages) */}
        </Route>

      </Routes>
    </Router>
  );
}