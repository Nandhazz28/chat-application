import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, Sparkles, AlertCircle } from "lucide-react";
import RegisterForm from "../../components/auth/RegisterForm";
import { register } from "../../services/auth.services";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (formData) => {
    try {
      setLoading(true);
      setError("");
      await register(formData);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#030014] flex items-center justify-center p-4 overflow-hidden selection:bg-pink-500/30">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-pink-600/5 blur-[120px] pointer-events-none animate-pulse [animation-duration:6s]" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-600/10 blur-[120px] pointer-events-none animate-pulse [animation-duration:4s]" />

      <div className="relative w-full max-w-md bg-[#080425]/40 border border-white/10 rounded-2xl p-8 shadow-2xl shadow-purple-950/20 backdrop-blur-xl z-10 transition-all duration-300 hover:border-purple-500/20">
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

        <div className="flex flex-col items-center text-center mb-8 select-none">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)] mb-3">
            <UserPlus className="w-5 h-5 text-pink-400" />
          </div>
          <h1 className="text-xl font-bold tracking-wide text-white flex items-center gap-1.5">
            Create Account
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          </h1>
          <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mt-1">
            Initialize System Credentials
          </p>
        </div>

        {error && (
          <div role="alert" className="flex items-start gap-2.5 bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 mb-6 text-xs text-rose-400 font-mono tracking-wide">
            <AlertCircle className="w-4 h-4 stroke-[2] flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <RegisterForm onSubmit={handleRegister} loading={loading} />

        <p className="text-center text-xs text-slate-500 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-purple-400 hover:text-pink-400 transition-colors">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;