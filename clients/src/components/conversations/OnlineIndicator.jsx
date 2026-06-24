const OnlineIndicator = ({
  online,
}) => {
  return (
    <span
      className={`w-3 h-3 rounded-full inline-block ${
        online
          ? "bg-green-500"
          : "bg-gray-400"
      }`}
    />
  );
};

export default OnlineIndicator;