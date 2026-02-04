import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { api } from "../../services/api";

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("checking");
  const location = useLocation(); // 🔐 detect back/forward

  useEffect(() => {
    let active = true;

    const verifySession = async () => {
      try {
        const res = await api.getAdminProfile();

        if (!active) return;

        if (res.success && res.data) {
          sessionStorage.setItem("adminLoggedIn", "true");

          if (res.data.role) {
            sessionStorage.setItem("adminRole", res.data.role);
          }

          setStatus("ok");
        } else {
          fail();
        }
      } catch {
        fail();
      }
    };

    const fail = () => {
      if (!active) return;
      sessionStorage.clear();
      setStatus("fail");
    };

    setStatus("checking"); // 🔥 reset on every route change
    verifySession();

    return () => {
      active = false;
    };
  }, [location.pathname]); // 🔥 THIS LINE FIXES BACK BUTTON

  if (status === "checking") return null;
  if (status === "fail") return <Navigate to="/admin/login" replace />;

  return children;
}
  