import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { api } from "../../services/api";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute() {
  const [status, setStatus] = useState("checking"); // checking | authenticated | unauthorized

  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem("admin_token");

      // 1. If no token immediately found, fail fast
      if (!token) {
        setStatus("unauthorized");
        return;
      }

      // 2. Background Check: Verify token validity with backend
      try {
        const res = await api.getAdminProfile();
        if (res.success) {
          setStatus("authenticated");
        } else {
          // Token invalid or expired
          localStorage.removeItem("admin_token");
          setStatus("unauthorized");
        }
      } catch (error) {
        localStorage.removeItem("admin_token");
        setStatus("unauthorized");
      }
    };

    verifySession();
  }, []);

  if (status === "checking") {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-yellow-600 mb-4" />
        <p className="text-gray-500 font-medium">Verifying Access...</p>
      </div>
    );
  }

  // If authenticated, render the Admin Layout (Outlet)
  return status === "authenticated" ? <Outlet /> : <Navigate to="/admin/login" replace />;
}