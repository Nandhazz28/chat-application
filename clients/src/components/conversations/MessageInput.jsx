import { useState, useRef, useCallback } from "react";
import { SendHorizontal, Paperclip, Mic, X, StopCircle } from "lucide-react";
import { sendMessage } from "../../services/message.services";
import { uploadFile } from "../../services/upload.services";
import {
  typingStart,
  typingStop,
  sendMessage as socketSend,
} from "../../socket/socketManager";
import { useChatContext } from "../../shared/context/ChatContext";
import useVoiceRecorder from "../../shared/hooks/useVoiceRecorder";

const MessageInput = ({ conversationId, currentUser }) => {
  const { addMessage, replyTo, setReplyTo } = useChatContext();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [uploadPct, setUploadPct] = useState(0);
  const [error, setError] = useState("");

  const fileRef = useRef(null);
  const timerRef = useRef(null);

  const {
    recording,
    audioBlob,
    audioUrl: voicePreviewUrl,
    duration,
    startRecording,
    stopRecording,
    resetRecording,
  } = useVoiceRecorder();

  const handleStopRecording = useCallback(() => {
    stopRecording();
    setTimeout(() => {
      if (audioBlob) {
        const file = new File([audioBlob], `voice-${Date.now()}.webm`, {
          type: audioBlob.type || "audio/webm",
        });
        setPreview({
          file,
          type: "audio",
          previewUrl: voicePreviewUrl,
          name: file.name,
        });
      }
    }, 150);
  }, [stopRecording, audioBlob, voicePreviewUrl]);

  const handleTyping = (e) => {
    setText(e.target.value);
    typingStart(conversationId, currentUser?._id, currentUser?.username);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(
      () => typingStop(conversationId, currentUser?._id),
      2000,
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const isImg = file.type.startsWith("image/");
    const isAudio = file.type.startsWith("audio/");
    setPreview({
      file,
      type: isImg ? "image" : isAudio ? "audio" : "file",
      previewUrl: isImg ? URL.createObjectURL(file) : null,
      name: file.name,
      size: (file.size / 1024).toFixed(1) + " KB",
    });
    e.target.value = "";
  };

  const clearPreview = () => {
    if (preview?.previewUrl) URL.revokeObjectURL(preview.previewUrl);
    setPreview(null);
    resetRecording();
  };

  const handleSend = useCallback(
    async (e) => {
      e?.preventDefault();
      if ((!text.trim() && !preview) || !conversationId || loading) return;
      setError("");

      try {
        setLoading(true);
        typingStop(conversationId, currentUser?._id);

        const payload = {
          conversationId,
          ...(replyTo && { replyTo: replyTo._id }),
        };

        if (preview) {
          const up = await uploadFile(preview.file, (pct) => setUploadPct(pct));
          const url = up?.data?.url;
          if (!url) throw new Error("Upload failed — no URL returned");

          if (preview.type === "image") payload.imageUrl = url;
          else if (preview.type === "audio") payload.audioUrl = url;
          else {
            payload.fileUrl = url;
            payload.fileName = preview.name;
            payload.fileType = preview.file?.type;
            payload.fileSize = preview.file?.size;
          }
          clearPreview();
          setUploadPct(0);
        }

        if (text.trim()) payload.content = text.trim();

        const res = await sendMessage(payload);
        const msg = res?.data;
        if (msg) {
          addMessage(msg);
          socketSend(msg);
        }
        setText("");
        setReplyTo(null);
      } catch (err) {
        setError(err?.response?.data?.message || err.message || "Send failed");
      } finally {
        setLoading(false);
        setUploadPct(0);
      }
    },
    [
      text,
      preview,
      conversationId,
      loading,
      replyTo,
      currentUser,
      addMessage,
      setReplyTo,
    ],
  );

  const fmtDuration = (s) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const canSend = (text.trim() || preview) && !loading;

  return (
    <div className="border-t border-white/[0.06] bg-[#030014]/90 backdrop-blur-xl">
      {uploadPct > 0 && (
        <div className="h-0.5 bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
            style={{ width: `${uploadPct}%` }}
          />
        </div>
      )}

      {error && (
        <div className="px-4 py-1.5 text-xs text-rose-400 font-mono bg-rose-500/5 border-b border-rose-500/10 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError("")}>
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {replyTo && (
        <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-b border-white/[0.04]">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-purple-400 font-mono">
              ↩ Replying to {replyTo.senderId?.username || "message"}
            </span>
            <span className="text-slate-400 truncate max-w-[200px]">
              {replyTo.content || "media"}
            </span>
          </div>
          <button
            onClick={() => setReplyTo(null)}
            className="text-slate-500 hover:text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {preview && (
        <div className="flex items-center gap-3 px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.04]">
          {preview.type === "image" && (
            <img
              src={preview.previewUrl}
              alt="preview"
              className="h-14 w-14 object-cover rounded-lg border border-white/10 flex-shrink-0"
            />
          )}
          {preview.type === "audio" && (
            <div className="flex items-center gap-2 text-purple-400">
              <Mic className="w-4 h-4" />
              <span className="text-xs font-mono">Voice message ready</span>
            </div>
          )}
          {preview.type === "file" && (
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-lg">📎</span>
              <div>
                <p className="text-xs font-medium truncate max-w-[180px]">
                  {preview.name}
                </p>
                <p className="text-[10px] text-slate-500 font-mono">
                  {preview.size}
                </p>
              </div>
            </div>
          )}
          <button
            onClick={clearPreview}
            className="ml-auto text-slate-500 hover:text-rose-400 transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {recording && (
        <div className="flex items-center gap-2 px-4 py-2 bg-rose-500/5 border-b border-rose-500/10">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-xs text-rose-400 font-mono">
            Recording… {fmtDuration(duration)}
          </span>
        </div>
      )}

      <div className="flex items-center gap-2 px-3 py-3">
        <input
          ref={fileRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*,audio/*,video/*,.pdf,.doc,.docx,.zip,.txt"
        />

        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={loading || recording}
          className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.07] text-slate-400 hover:text-purple-400 hover:border-purple-500/30 transition-all disabled:opacity-40"
        >
          <Paperclip className="w-4 h-4" />
        </button>

        <input
          value={text}
          onChange={handleTyping}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) handleSend(e);
          }}
          placeholder={recording ? "Recording…" : "Type a message…"}
          disabled={loading || recording}
          className="flex-1 min-w-0 bg-white/[0.03] border border-white/[0.07] px-4 py-2.5 rounded-2xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/40 focus:bg-white/[0.05] transition-all disabled:opacity-50"
        />

        {canSend ? (
          <button
            type="button"
            onClick={handleSend}
            disabled={loading}
            className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-950/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
          >
            <SendHorizontal className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={recording ? handleStopRecording : startRecording}
            disabled={loading}
            className={`w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl transition-all border disabled:opacity-40 ${
              recording
                ? "bg-rose-500/20 border-rose-500/40 text-rose-400 animate-pulse"
                : "bg-white/[0.03] border-white/[0.07] text-slate-400 hover:text-purple-400 hover:border-purple-500/30"
            }`}
          >
            {recording ? (
              <StopCircle className="w-4 h-4" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageInput;
