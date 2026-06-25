import { useState, useRef } from "react";
import { SendHorizontal, Paperclip, Mic, X } from "lucide-react";
import { sendMessage } from "../../services/message.services";
import { uploadFile } from "../../services/upload.services";
import {
  typingStart,
  typingStop,
  sendMessage as socketSendMessage,
} from "../../socket/socketManager";

const MessageInput = ({ conversationId, setMessages }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const fileInputRef = useRef(null);
  const typingTimerRef = useRef(null);

  const handleTyping = (e) => {
    setText(e.target.value);

    // Emit typing start
    typingStart(conversationId);

    // Debounce typing stop
    clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => {
      typingStop(conversationId);
    }, 1500);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if ((!text.trim() && !previewFile) || !conversationId) return;

    try {
      setLoading(true);
      typingStop(conversationId);

      let payload = { conversationId };

      if (previewFile) {
        setUploading(true);
        const uploadRes = await uploadFile(previewFile.file);
        const url = uploadRes?.data?.url;
        if (previewFile.type === "image") {
          payload.imageUrl = url;
        } else {
          payload.audioUrl = url;
        }
        setPreviewFile(null);
        setUploading(false);
      }

      if (text.trim()) {
        payload.content = text.trim();
      }

      const res = await sendMessage(conversationId, payload);
      const newMessage = res?.data;

      if (newMessage) {
        setMessages((prev) => [...prev, newMessage]);
        // Emit via socket so other user sees it in real-time
        socketSendMessage(newMessage);
      }

      setText("");
    } catch (err) {
      console.error("Send error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const isImage = file.type.startsWith("image/");
    setPreviewFile({
      file,
      type: isImage ? "image" : "audio",
      preview: isImage ? URL.createObjectURL(file) : null,
      name: file.name,
    });
  };

  return (
    <div className="border-t border-white/10 bg-[#030014]/80 backdrop-blur-sm">
      {/* File preview */}
      {previewFile && (
        <div className="px-4 pt-3 flex items-center gap-2">
          {previewFile.type === "image" && (
            <img
              src={previewFile.preview}
              alt="preview"
              className="h-16 w-16 object-cover rounded-lg border border-white/10"
            />
          )}
          <span className="text-xs text-slate-400 font-mono truncate flex-1">
            {previewFile.name}
          </span>
          <button
            type="button"
            onClick={() => setPreviewFile(null)}
            className="text-slate-400 hover:text-rose-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <form
        onSubmit={handleSend}
        className="flex items-center gap-2 p-3"
      >
        {/* File attach */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,audio/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-purple-400 hover:border-purple-500/30 transition-all duration-200"
          title="Attach file"
        >
          <Paperclip className="w-4 h-4" />
        </button>

        <input
          value={text}
          onChange={handleTyping}
          placeholder="Type a message..."
          disabled={loading}
          className="flex-1 bg-white/[0.03] border border-white/10 px-4 py-2.5 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/40 focus:bg-white/[0.05] transition-all duration-200 disabled:opacity-50"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) handleSend(e);
          }}
        />

        <button
          type="submit"
          disabled={loading || uploading || (!text.trim() && !previewFile)}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-md shadow-purple-950/30 hover:shadow-pink-600/20 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
        >
          <SendHorizontal className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;