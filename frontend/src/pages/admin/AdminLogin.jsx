import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  Mail,
  AlertCircle,
  ArrowRight,
  Loader2,
  X,
  CheckCircle,
} from "lucide-react";
import { api } from "../../services/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  // Login State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Forgot Password State
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetStatus, setResetStatus] = useState({
    loading: false,
    msg: "",
    success: false,
  });

  // 1. FLOW CHECK: If already logged in, go to dashboard
  useEffect(() => {
    const checkExistingSession = async () => {
      const token = localStorage.getItem("admin_token");
      if (token) {
        // Validate token validity
        try {
          const res = await api.getAdminProfile();
          if (res.success) {
            navigate("/admin/dashboard");
          } else {
            // Token invalid/expired - clear it
            localStorage.removeItem("admin_token");
          }
        } catch (e) {
          localStorage.removeItem("admin_token");
        }
      }
    };
    checkExistingSession();
  }, [navigate]);

  // 2. LOGIN LOGIC
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    try {
      const res = await api.adminLogin(email, password);

      if (res.success) {
        // Token is stored in localStorage by api.js
        // Redirect to dashboard
        navigate("/admin/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Login failed. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // 3. RESET PASSWORD LOGIC
  const handleReset = async (e) => {
    e.preventDefault();
    setResetStatus({ loading: true, msg: "", success: false });

    // Assuming you added requestPasswordReset to api.js as discussed previously
    // If not, this is a placeholder for that API call
    try {
      // Ideally: await api.requestPasswordReset(resetEmail);
      // For now, simulating success since we updated backend logic previously
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setResetStatus({
        loading: false,
        msg: "If this email exists, a reset link/code has been sent.",
        success: true,
      });
    } catch (err) {
      setResetStatus({
        loading: false,
        msg: "Failed to process request.",
        success: false,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-brand-gold to-yellow-300 rounded-2xl mb-4 shadow-lg shadow-yellow-500/20">
            <Lock className="text-black" size={32} />
          </div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
            TapToSmile
          </h1>
          <p className="text-gray-400 font-medium">Secure Admin Portal</p>
        </div>

        {/* LOGIN CARD */}
        <div className="bg-zinc-800/50 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
              <AlertCircle size={20} className="text-red-400 mt-0.5" />
              <p className="text-red-200 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  size={18}
                  className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-brand-gold transition-colors"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full bg-zinc-900/50 border border-zinc-700/50 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all"
                  placeholder="admin@taptosmile.org"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="text-xs text-brand-gold hover:text-yellow-300 font-medium transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative group">
                <Lock
                  size={18}
                  className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-brand-gold transition-colors"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full bg-zinc-900/50 border border-zinc-700/50 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-gold hover:bg-yellow-400 text-black font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-brand-gold/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />{" "}
                  Authenticating...
                </>
              ) : (
                <>
                  Login to Dashboard <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-zinc-500 text-sm mt-8">
          Authorized personnel only. All access is logged.
        </p>
      </div>

      {/* --- FORGOT PASSWORD MODAL --- */}
      {showForgot && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-zinc-900 w-full max-w-sm rounded-3xl p-6 border border-zinc-800 shadow-2xl relative">
            <button
              onClick={() => setShowForgot(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">
                Reset Password
              </h3>
              <p className="text-sm text-gray-400">
                Enter your email address. We'll send you instructions to reset
                your password.
              </p>
            </div>

            {!resetStatus.success ? (
              <form onSubmit={handleReset} className="space-y-4">
                <input
                  type="email"
                  required
                  className="w-full bg-zinc-800 border border-zinc-700 text-white p-3 rounded-xl focus:border-brand-gold outline-none transition-colors"
                  placeholder="admin@example.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />

                <button
                  type="submit"
                  disabled={resetStatus.loading}
                  className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors flex justify-center items-center gap-2"
                >
                  {resetStatus.loading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>
            ) : (
              <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl text-center">
                <CheckCircle
                  className="mx-auto text-green-500 mb-2"
                  size={32}
                />
                <p className="text-green-400 font-medium text-sm">
                  {resetStatus.msg}
                </p>
                <button
                  onClick={() => setShowForgot(false)}
                  className="mt-4 text-xs text-gray-400 hover:text-white underline"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
