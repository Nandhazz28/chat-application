import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User, SlidersHorizontal, Activity } from "lucide-react";
import ProfileCard from "../../components/profile/ProfileCard";
import Loader from "../../components/ui/Loader";
import { getCurrentUser } from "../../services/user.services";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCurrentMount = true;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await getCurrentUser();
        // ApiResponse: { status, message, data: user }
        const userData = response?.data || response;
        if (isCurrentMount) setUser(userData);
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        if (isCurrentMount) setLoading(false);
      }
    };

    fetchProfile();
    return () => { isCurrentMount = false; };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#030014] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-[#030014] flex items-center justify-center p-6 overflow-hidden select-none selection:bg-pink-500/30">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-purple-600/10 to-pink-600/5 blur-[140px] pointer-events-none" />

      <div className="relative w-full max-w-2xl z-10 space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-purple-400">
              <User className="w-4 h-4 stroke-[1.8]" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide text-white">Identity Profile</h1>
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 flex items-center gap-1.5 mt-0.5">
                <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
                Security Level // Certified Node
              </p>
            </div>
          </div>
        </div>

        <div className="relative rounded-2xl bg-[#080425]/20 border border-white/5 backdrop-blur-xl p-1">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
          <ProfileCard user={user} />
        </div>

        <div className="flex justify-end pt-2">
          <Link
            to="/profile/edit"
            className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] transition-all duration-300 hover:-translate-y-0.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 stroke-[2] transition-transform duration-500 group-hover:rotate-90" />
            Modify Control Parameters
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;