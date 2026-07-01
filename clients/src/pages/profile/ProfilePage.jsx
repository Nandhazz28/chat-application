import { useEffect, useState }    from "react";
import { Link }                   from "react-router-dom";
import { Edit3, Mail, Calendar, Circle } from "lucide-react";
import { getCurrentUser }         from "../../services/user.services";
import { formatDateSeparator }    from "../../shared/utils/formatDate";

const ProfilePage = () => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(res => setUser(res?.data || res))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-[150px]" />
      </div>
      <div className="relative w-full max-w-lg">
        <div className="bg-[#06031a]/60 border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="h-24 bg-gradient-to-r from-purple-600/30 via-pink-600/20 to-indigo-600/30 relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50" />
          </div>

          <div className="px-6 pb-6 -mt-10">
            <div className="flex items-end justify-between mb-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center text-3xl font-bold text-white border-4 border-[#030014] shadow-xl">
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#030014] ${user?.isOnline ? "bg-emerald-400" : "bg-slate-600"}`} />
              </div>
              <Link to="/profile/edit"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300 text-sm font-semibold hover:bg-white/[0.07] transition-all">
                <Edit3 className="w-3.5 h-3.5" /> Edit profile
              </Link>
            </div>

            <h1 className="text-xl font-bold text-white">{user?.username}</h1>
            <p className="text-slate-500 text-sm mt-0.5 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" />{user?.email}
            </p>
            {user?.bio && <p className="text-slate-300 text-sm mt-3 leading-relaxed">{user.bio}</p>}

            <div className="mt-5 pt-5 border-t border-white/[0.05] grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Circle className={`w-2 h-2 fill-current ${user?.isOnline ? "text-emerald-400" : "text-slate-600"}`} />
                {user?.isOnline ? "Online" : "Offline"}
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Calendar className="w-3.5 h-3.5" />
                Joined {user?.createdAt ? new Date(user.createdAt).getFullYear() : "—"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;