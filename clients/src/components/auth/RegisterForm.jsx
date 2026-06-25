import React, { useState } from "react";
import { User, Mail, Lock, Sparkles, Loader2 } from "lucide-react";

const RegisterForm = ({ onSubmit, loading }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#030014] text-slate-200 overflow-hidden font-sans antialiased p-4">
      {/* Deep Space Ambient Glow Blobs */}
      <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-gradient-to-bl from-purple-600/20 to-pink-600/20 blur-[120px] pointer-events-none transform-gpu" />
      <div className="absolute bottom-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-blue-600/20 to-violet-600/20 blur-[120px] pointer-events-none transform-gpu" />

      {/* Glassmorphic Registration Box */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/5 p-8 rounded-2xl shadow-2xl shadow-purple-950/30 border border-white/10 backdrop-blur-xl"
      >
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
            Create Space Account
          </h2>
          <p className="text-sm text-slate-400">
            Join the collective and launch your platform console
          </p>
        </div>

        {/* Input Matrix */}
        <div className="space-y-5">
          {/* USERNAME */}
          <div className="space-y-2">
            <label htmlFor="username" className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">
              Identity Call Sign
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                id="username"
                type="text"
                name="username"
                required
                autoComplete="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">
              Comms Link (Email)
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                id="email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="name@domain.com"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">
              Access Encryption Key
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                id="password"
                type="password"
                name="password"
                required
                autoComplete="new-password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl shadow-[0_0_20px_rgba(219,39,119,0.3)] hover:shadow-[0_0_30px_rgba(219,39,119,0.5)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Credentials...
            </>
          ) : (
            "Deploy Account"
          )}
        </button>

        {/* Footnote */}
        <p className="text-center text-xs text-slate-500 mt-6">
          By registering, you agree to our interstellar terms of service.
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;