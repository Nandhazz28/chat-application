import React, { useState } from "react";
import { Sparkles, Mail, Lock, Loader2 } from "lucide-react";

const LoginForm = ({ onSubmit, loading }) => {
  const [form, setForm] = useState({
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
      {/* Deep Space Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-purple-600/20 to-pink-600/20 blur-[120px] pointer-events-none transform-gpu" />
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-gradient-to-bl from-blue-600/20 to-violet-600/20 blur-[120px] pointer-events-none transform-gpu" />

      {/* Glassmorphic Form Container */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/5 p-8 rounded-2xl shadow-2xl shadow-pink-950/30 border border-white/10 backdrop-blur-xl"
      >
        {/* Boutique Header */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-500/10 border border-pink-500/20 mb-4 shadow-[0_0_15px_rgba(219,39,119,0.2)]">
            <Sparkles className="w-6 h-6 text-pink-400" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
            Welcome Back
          </h2>
          <p className="text-sm text-slate-400">
            Authenticate to access the cosmic dashboard
          </p>
        </div>

        {/* Input Fields */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-medium text-slate-300 ml-1 uppercase tracking-wider">
              Email Address
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

          <div className="space-y-2">
            <div className="flex items-center justify-between ml-1">
              <label htmlFor="password" className="text-xs font-medium text-slate-300 uppercase tracking-wider">
                Security Key
              </label>
              <a href="#" className="text-xs text-pink-400 hover:text-pink-300 transition-colors">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                id="password"
                type="password"
                name="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl shadow-[0_0_20px_rgba(219,39,119,0.3)] hover:shadow-[0_0_30px_rgba(219,39,119,0.5)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Establishing Connection...
            </>
          ) : (
            "Initialize Session"
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;