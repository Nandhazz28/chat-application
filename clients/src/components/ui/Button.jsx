const Button = ({
  children,
  onClick,
  loading,
  type = "button",
  variant = "primary",
  className = "",
  disabled,
}) => {
  const base = "w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";

  const styles = {
    primary: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:-translate-y-0.5 active:translate-y-0",
    secondary: "bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 hover:border-white/20",
    danger: "bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`${base} ${styles[variant] || styles.primary} ${className}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;