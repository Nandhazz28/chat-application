const ImageMessage = ({
  imageUrl,
}) => {
  return (
    <img
      src={imageUrl}
      alt="message"
      className="max-w-xs rounded-lg"
    />
  );
};

export default ImageMessage;