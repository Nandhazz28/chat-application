import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Terminal, AlertCircle } from "lucide-react";
import LoginForm from "../../components/auth/LoginForm";
import { login } from "../../services/auth.services";
import { connectSocket, userOnline } from "../../socket/socketManager";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (formData) => {
    try {
      setLoading(true);
      setError(""); // Purge active authentication errors

      const response = await login(formData);
      console.log("LOGIN RESPONSE", response);

      const token = response?.data?.accessToken;
      const user = response?.data?.user;

      if (!token) {
        throw new Error("Access token not found");
      }

      // Secure local credentials store
      localStorage.setItem("token", token);

      // Establish real-time WebSocket communication layer
      connectSocket();

      if (user?._id) {
        userOnline(user._id);
      }

      // Route sequence handover
      navigate("/chat");
    } catch (err) {
      console.error(err);
      // Fallback state mapping bypasses primitive native popups
      setError(err?.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#030014] flex items-center justify-center p-4 overflow-hidden selection:bg-pink-500/30">
      
      {/* Immersive Background Space Matrix Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-600/10 blur-[120px] pointer-events-none animate-pulse [animation-duration:6s]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-pink-600/5 blur-[120px] pointer-events-none animate-pulse [animation-duration:4s]" />

      {/* Structural Card Container */}
      <div className="relative w-full max-w-md bg-[#080425]/40 border border-white/10 rounded-2xl p-8 shadow-2xl shadow-purple-950/20 backdrop-blur-xl z-10 transition-all duration-300 hover:border-purple-500/20">
        
        {/* Subtle top edge border gradient highlight */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />

        {/* BRAND IDENTITY HEADER BLOCK */}
        <div className="flex flex-col items-center text-center mb-8 select-none">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)] mb-3">
            <Terminal className="w-5 h-5 text-pink-400" />
          </div>
          <h1 className="text-xl font-bold tracking-wide text-white flex items-center gap-1.5">
            Authenticate Session
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          </h1>
          <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mt-1">
            Secure Gateway Access
          </p>
        </div>

        {/* INLINE ERROR TELEMETRY ALERTS */}
        {error && (
          <div 
            role="alert"
            className="flex items-start gap-2.5 bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 mb-6 text-xs text-rose-400 font-mono tracking-wide animate-fade-in"
          >
            <AlertCircle className="w-4 h-4 stroke-[2] flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* APPLICATION AUTH FORM LAYER */}
        <LoginForm onSubmit={handleLogin} loading={loading} />

      </div>
    </div>
  );
};

export default LoginPage;