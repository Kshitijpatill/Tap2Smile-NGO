import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import * as api from "./api";

export default function AdminDevLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const autoLogin = async () => {
      try {
        // Use backend test credentials to obtain a real token
        await api.loginAdmin("admin@taptosmile.org", "admin123");
        sessionStorage.setItem("adminLoggedIn", "true");
        setLoading(false);
        navigate("/admin/dashboard/programs");
      } catch (err) {
        console.error("AdminDevLogin error:", err);
        setError(err.message || "Auto-login failed");
        setLoading(false);
      }
    };

    autoLogin();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader className="animate-spin" />
            <p className="text-gray-700">Auto-authenticating and redirecting to admin dashboard...</p>
          </div>
        ) : error ? (
          <div>
            <p className="text-red-600 font-medium">{error}</p>
            <p className="text-sm text-gray-600 mt-2">Make sure backend is running and credentials are correct.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
