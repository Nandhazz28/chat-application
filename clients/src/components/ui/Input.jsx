import React, { useId } from "react";

const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  disabled,
}) => {
  const generatedId = useId();
  const inputId = name || generatedId;

  return (
    <div className="mb-5 w-full select-none animate-fade-in">
      {label && (
        <label
          htmlFor={inputId}
          className={`block text-[10px] font-mono uppercase tracking-widest mb-1.5 font-semibold transition-colors duration-200
            ${error ? "text-rose-400" : "text-slate-400"}`}
        >
          {label}
        </label>
      )}

      <div
        className={`relative flex items-center w-full rounded-xl bg-white/[0.02] border backdrop-blur-md transition-all duration-300
          ${
            error
              ? "border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.1)] focus-within:border-rose-500/60 focus-within:shadow-[0_0_20px_rgba(244,63,94,0.2)]"
              : "border-white/10 focus-within:border-purple-500/40 focus-within:shadow-[0_0_25px_rgba(168,85,247,0.15)]"
          }
          ${disabled ? "opacity-35 bg-white/[0.01] cursor-not-allowed" : ""}
        `}
      >
        <input
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full bg-transparent border-none outline-none text-slate-100 text-sm placeholder-slate-500 px-4 py-2.5 selection:bg-pink-500/30 disabled:cursor-not-allowed transition-colors"
        />
      </div>

      {error && (
        <span
          role="alert"
          className="block mt-1.5 text-[10px] font-mono uppercase tracking-wide text-rose-400/90 px-1 animate-fade-in"
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;