import React from "react";
import SeenIndicator from "./SeenIndicator";
import ImageMessage from "./ImageMessage";
import VoiceMessage from "./VoiceMessage";

const MessageBubble = ({ message, currentUserId }) => {
  const isMine =
    message?.sender === currentUserId ||
    message?.sender?._id === currentUserId;

  // Safe Date parsing to eliminate runtime RangeErrors/Crashes
  let formattedTime = "";
  if (message?.createdAt) {
    const dateObj = new Date(message.createdAt);
    if (!isNaN(dateObj.getTime())) {
      formattedTime = dateObj.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  }

  return (
    <div
      className={`flex w-full mb-4 animate-fade-in ${
        isMine ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`relative max-w-md px-4 py-2.5 shadow-xl transition-all duration-200
        ${
          isMine
            ? "bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl rounded-tr-xs shadow-purple-950/20"
            : "bg-white/[0.03] border border-white/10 text-slate-100 rounded-2xl rounded-tl-xs backdrop-blur-md shadow-black/40"
        }`}
      >
        {/* TEXT MESSAGE */}
        {message?.content && (
          <p className="break-words text-sm leading-relaxed tracking-wide font-medium">
            {message.content}
          </p>
        )}

        {/* IMAGE MESSAGE */}
        {message?.imageUrl && (
          <div className="mt-2">
            <ImageMessage imageUrl={message.imageUrl} />
          </div>
        )}

        {/* VOICE MESSAGE */}
        {message?.audioUrl && (
          <div className="mt-2">
            <VoiceMessage audioUrl={message.audioUrl} />
          </div>
        )}

        {/* FOOTER META DATA */}
        <div
          className={`flex items-center justify-end gap-1.5 mt-1.5 text-[10px] font-mono tracking-wider select-none opacity-60 ${
            isMine ? "text-purple-200" : "text-slate-400"
          }`}
        >
          <span>{formattedTime}</span>

          {isMine && (
            <div className="flex-shrink-0 transformation transition-transform duration-150 scale-90">
              <SeenIndicator seen={message?.seen} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;