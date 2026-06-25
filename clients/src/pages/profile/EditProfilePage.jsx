import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fingerprint, Sparkles, AlertCircle, ShieldCheck } from "lucide-react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { getCurrentUser, updateProfile } from "../../services/user.services";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ username: "", email: "" });

  useEffect(() => {
    let isCurrentMount = true;

    const loadProfile = async () => {
      try {
        const response = await getCurrentUser();
        // ApiResponse: { status, message, data: user }
        const userData = response?.data || response;
        if (isCurrentMount && userData) {
          setForm({
            username: userData.username || "",
            email: userData.email || "",
          });
        }
      } catch (err) {
        console.error("Profile load error:", err);
      }
    };

    loadProfile();
    return () => { isCurrentMount = false; };
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await updateProfile(form);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to update profile settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#030014] flex items-center justify-center p-6 overflow-hidden relative selection:bg-pink-500/30">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-pink-500/10 to-purple-500/5 blur-[130px] pointer-events-none animate-pulse [animation-duration:5s]" />

      <div className="relative w-full max-w-lg bg-[#080425]/40 border border-white/10 rounded-2xl p-8 shadow-2xl shadow-purple-950/20 backdrop-blur-xl z-10">
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />

        <div className="flex flex-col items-center text-center mb-8 select-none">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)] mb-3">
            <Fingerprint className="w-5 h-5 text-pink-400" />
          </div>
          <h1 className="text-xl font-bold tracking-wide text-white flex items-center gap-1.5">
            Identity Parameters
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          </h1>
          <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mt-1">
            Modify System Credentials
          </p>
        </div>

        {error && (
          <div role="alert" className="flex items-start gap-2.5 bg-rose-500/10 border border-rose-500/20 rounded-xl p-3.5 mb-6 text-xs text-rose-400 font-mono tracking-wide">
            <AlertCircle className="w-4 h-4 stroke-[2] flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
          <Input
            label="System Routing Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />

          <div className="pt-3">
            <Button type="submit" loading={loading}>
              <ShieldCheck className="w-4 h-4 stroke-[2] inline mr-2" />
              Commit Structural Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;