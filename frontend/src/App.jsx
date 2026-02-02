import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";

import AdminRoutes from "./routes/AdminRoutes";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC WEBSITE - with Layout (Navbar + Footer) */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/events" element={<Events />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/donate" element={<Donate />} />
              </Routes>
            </Layout>
          }
        />

        {/* ADMIN PANEL - NO public Layout (NO Navbar/Footer) */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
}
