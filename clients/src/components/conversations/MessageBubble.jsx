import SeenIndicator from "./SeenIndicator";
import ImageMessage from "./ImageMessage";
import VoiceMessage from "./VoiceMessage";

const MessageBubble = ({
  message,
  currentUserId,
}) => {
  const isMine =
    message?.sender ===
      currentUserId ||
    message?.sender?._id ===
      currentUserId;

  return (
    <div
      className={`flex mb-3 ${
        isMine
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-md px-4 py-2 rounded-2xl shadow
        ${
          isMine
            ? "bg-blue-500 text-white"
            : "bg-white border"
        }`}
      >
        {/* TEXT MESSAGE */}

        {message?.content && (
          <p className="break-words">
            {message.content}
          </p>
        )}

        {/* IMAGE MESSAGE */}

        {message?.imageUrl && (
          <div className="mt-2">
            <ImageMessage
              imageUrl={
                message.imageUrl
              }
            />
          </div>
        )}

        {/* VOICE MESSAGE */}

        {message?.audioUrl && (
          <div className="mt-2">
            <VoiceMessage
              audioUrl={
                message.audioUrl
              }
            />
          </div>
        )}

        {/* FOOTER */}

        <div className="flex items-center justify-end gap-2 mt-2 text-xs opacity-80">
          <span>
            {message?.createdAt
              ? new Date(
                  message.createdAt
                ).toLocaleTimeString(
                  [],
                  {
                    hour:
                      "2-digit",
                    minute:
                      "2-digit",
                  }
                )
              : ""}
          </span>

          {isMine && (
            <SeenIndicator
              seen={
                message?.seen
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;