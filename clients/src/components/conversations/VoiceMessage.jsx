const VoiceMessage = ({
  audioUrl,
}) => {
  return (
    <audio controls>
      <source
        src={audioUrl}
      />
    </audio>
  );
};

export default VoiceMessage;