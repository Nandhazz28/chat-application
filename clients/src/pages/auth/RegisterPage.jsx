import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Loader2, UserPlus, AlertCircle, CheckCircle2 } from "lucide-react";
import { register } from "../../services/auth.services";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await register(form);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.errors?.[0]?.message ||
          err.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      name: "username",
      label: "Username",
      type: "text",
      Icon: User,
      placeholder: "your_username",
      autoComplete: "username",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      Icon: Mail,
      placeholder: "you@example.com",
      autoComplete: "email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      Icon: Lock,
      placeholder: "••••••••",
      autoComplete: "new-password",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#030014] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-pink-600/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-600/8 blur-[130px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        <div className="bg-[#06031a]/60 border border-white/[0.08] rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-pink-500/40 to-transparent rounded-t-2xl" />

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-600/20 to-purple-600/10 border border-pink-500/20 mb-4">
              <UserPlus className="w-5 h-5 text-purple-400" />
            </div>
            <h1 className="text-xl font-bold text-white mb-1">Create account</h1>
            <p className="text-sm text-slate-500">Join and start chatting</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 rounded-xl p-3.5 mb-5 text-sm text-rose-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3.5 mb-5 text-sm text-emerald-400">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Account created! Redirecting to login…</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(({ name, label, type, Icon, placeholder, autoComplete }) => (
              <div key={name}>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  {label}
                </label>
                <div className="relative">
                  <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={type}
                    name={name}
                    required
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    value={form[name]}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-pink-500/50 focus:bg-white/[0.05] transition-all"
                  />
                </div>
              </div>
            ))}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-pink-950/30 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-60 disabled:translate-y-0 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Creating…
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-400 hover:text-pink-400 font-semibold transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;