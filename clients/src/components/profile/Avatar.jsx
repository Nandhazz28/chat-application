const Avatar = ({ name, size = "md" }) => {
  const sizeClass =
    size === "sm"
      ? "w-8 h-8 text-sm"
      : size === "lg"
      ? "w-14 h-14 text-lg"
      : "w-10 h-10 text-base";

  return (
    <div
      className={`${sizeClass} rounded-full bg-green-500 text-white flex items-center justify-center font-bold`}
    >
      {name?.charAt(0)}
    </div>
  );
};

export default Avatar;