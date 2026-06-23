const Button = ({
  children,
  onClick,
  loading,
  type = "button",
  variant = "primary",
}) => {
  const base =
    "px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50";

  const styles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`${base} ${styles[variant]}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;