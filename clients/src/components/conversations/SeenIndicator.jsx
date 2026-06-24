const SeenIndicator = ({
  seen,
}) => {
  return (
    <span>
      {seen
        ? "✓✓ Seen"
        : "✓ Sent"}
    </span>
  );
};

export default SeenIndicator;