import React, { useState } from "react";
import { User, Mail, Lock, Loader2 } from "lucide-react";

const RegisterForm = ({ onSubmit, loading }) => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="username"
          className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold"
        >
          Username
        </label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            id="username"
            type="text"
            name="username"
            required
            autoComplete="username"
            placeholder="your_username"
            value={form.username}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500/40 transition-all duration-200"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold"
        >
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            id="email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="name@domain.com"
            value={form.email}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500/40 transition-all duration-200"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold"
        >
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            id="password"
            type="password"
            name="password"
            required
            autoComplete="new-password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500/40 transition-all duration-200"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3.5 rounded-xl shadow-[0_0_20px_rgba(219,39,119,0.3)] hover:shadow-[0_0_30px_rgba(219,39,119,0.5)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 text-sm"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Creating Account...
          </>
        ) : (
          "Deploy Account"
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
