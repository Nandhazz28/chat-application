import { useState, useRef } from "react";
import { Check, CheckCheck, MoreVertical, Reply, Pencil, Trash2, Smile, X, Copy } from "lucide-react";
import { formatTime } from "../../shared/utils/formatDate";
import ImageMessage from "./ImageMessage";
import VoiceMessage from "./VoiceMessage";
import { deleteMessage, editMessage, addReaction } from "../../services/message.services";
import { emitMessageDelete, emitMessageEdit, emitReaction } from "../../socket/socketManager";

const EMOJIS = ["👍","❤️","😂","😮","😢","🔥"];

const StatusIcon = ({ status }) => {
  if (status === "seen")      return <CheckCheck className="w-3.5 h-3.5 text-blue-400" />;
  if (status === "delivered") return <CheckCheck className="w-3.5 h-3.5 text-slate-400" />;
  return <Check className="w-3.5 h-3.5 text-slate-500" />;
};

const MessageBubble = ({ message, currentUserId, conversationId, onReply, onUpdate, onDelete }) => {
  const senderId = message?.senderId?._id || message?.senderId;
  const isMine   = String(senderId) === String(currentUserId);
  const [showMenu, setShowMenu]     = useState(false);
  const [showEmoji, setShowEmoji]   = useState(false);
  const [editing, setEditing]       = useState(false);
  const [editText, setEditText]     = useState(message?.content || "");
  const menuRef = useRef(null);

  if (message?.deletedForEveryone) {
    return (
      <div className="flex justify-center my-1">
        <span className="text-[10px] text-slate-500 italic font-mono bg-white/[0.02] px-3 py-1 rounded-full border border-white/5">
          🚫 This message was deleted
        </span>
      </div>
    );
  }

  const handleDelete = async (deleteFor) => {
    try {
      await deleteMessage(message._id, deleteFor);
      emitMessageDelete({ conversationId, messageId: message._id, deleteFor });
      if (deleteFor === "everyone") onDelete?.(message._id);
      setShowMenu(false);
    } catch(e) { console.error(e); }
  };

  const handleEdit = async () => {
    if (!editText.trim() || editText === message.content) { setEditing(false); return; }
    try {
      const res = await editMessage(message._id, editText.trim());
      const updated = res?.data || { ...message, content: editText.trim(), edited: true };
      onUpdate?.(updated);
      emitMessageEdit({ ...updated, conversationId });
      setEditing(false);
    } catch(e) { console.error(e); }
  };

  const handleReaction = async (emoji) => {
    try {
      await addReaction(message._id, emoji);
      emitReaction({ conversationId, messageId: message._id, emoji, userId: currentUserId });
      setShowEmoji(false);
    } catch(e) { console.error(e); }
  };

  const reactions = message?.reactions ? Object.entries(
    typeof message.reactions === "object" && !Array.isArray(message.reactions)
      ? message.reactions
      : {}
  ).filter(([, users]) => Array.isArray(users) && users.length > 0) : [];

  return (
    <div className={`group flex w-full mb-1 px-4 ${isMine ? "justify-end" : "justify-start"}`}>

      {!isMine && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0 self-end mb-1 border border-white/10 shadow-md">
          {(message?.senderId?.username || "?").charAt(0).toUpperCase()}
        </div>
      )}

      <div className="relative max-w-[70%]">
        {message?.replyTo && (
          <div className={`mb-1 px-3 py-1.5 rounded-xl text-[11px] border-l-2 border-purple-400 bg-white/[0.03] text-slate-400 font-mono truncate ${isMine ? "text-right" : ""}`}>
            <span className="text-purple-400 font-semibold">↩ {message.replyTo?.senderId?.username || "reply"}</span>
            <span className="ml-2 truncate">{message.replyTo?.content || "media"}</span>
          </div>
        )}

        <div
          className={`relative px-4 py-2.5 shadow-lg transition-all duration-150 rounded-2xl
            ${isMine
              ? "bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 text-white rounded-tr-sm"
              : "bg-[#0f0a2e] border border-white/[0.07] text-slate-100 rounded-tl-sm backdrop-blur-sm"
            }`}
        >
          {editing ? (
            <div className="flex items-center gap-2">
              <input
                autoFocus
                value={editText}
                onChange={e => setEditText(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") handleEdit(); if (e.key === "Escape") setEditing(false); }}
                className="flex-1 bg-white/10 text-white text-sm px-2 py-1 rounded-lg outline-none border border-white/20"
              />
              <button onClick={handleEdit}  className="text-green-400 hover:text-green-300"><Check className="w-4 h-4" /></button>
              <button onClick={() => setEditing(false)} className="text-slate-400 hover:text-slate-300"><X className="w-4 h-4" /></button>
            </div>
          ) : (
            <>
              {message?.content && (
                <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">{message.content}</p>
              )}
              {message?.imageUrl && <div className="mt-1"><ImageMessage imageUrl={message.imageUrl} /></div>}
              {message?.audioUrl && <div className="mt-1"><VoiceMessage audioUrl={message.audioUrl} /></div>}
              {message?.fileUrl  && (
                <a href={message.fileUrl} target="_blank" rel="noreferrer"
                   className="flex items-center gap-2 mt-1 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-xs font-mono">
                  📎 {message.fileName || "Download file"}
                </a>
              )}
            </>
          )}

          <div className={`flex items-center gap-1.5 mt-1 select-none ${isMine ? "justify-end" : "justify-start"}`}>
            {message?.edited && <span className="text-[9px] opacity-50 font-mono italic">edited</span>}
            <span className="text-[10px] opacity-50 font-mono">{formatTime(message?.createdAt)}</span>
            {isMine && <StatusIcon status={message?.status} />}
          </div>
        </div>

        {reactions.length > 0 && (
          <div className={`flex gap-1 mt-1 flex-wrap ${isMine ? "justify-end" : "justify-start"}`}>
            {reactions.map(([emoji, users]) => (
              <button key={emoji} onClick={() => handleReaction(emoji)}
                className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[11px] hover:bg-white/[0.1] transition-colors">
                {emoji}<span className="text-slate-400 font-mono text-[9px]">{users.length}</span>
              </button>
            ))}
          </div>
        )}

        {!editing && (
          <div className={`absolute top-0 ${isMine ? "right-full mr-1" : "left-full ml-1"} flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150`}>
            <button onClick={() => setShowEmoji(!showEmoji)}
              className="w-6 h-6 rounded-full bg-[#0f0a2e] border border-white/10 flex items-center justify-center text-slate-400 hover:text-yellow-400 transition-colors shadow-md">
              <Smile className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => { onReply?.(message); }}
              className="w-6 h-6 rounded-full bg-[#0f0a2e] border border-white/10 flex items-center justify-center text-slate-400 hover:text-purple-400 transition-colors shadow-md">
              <Reply className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setShowMenu(!showMenu)}
              className="w-6 h-6 rounded-full bg-[#0f0a2e] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors shadow-md">
              <MoreVertical className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {showEmoji && (
          <div className={`absolute z-50 top-0 ${isMine ? "right-full mr-8" : "left-full ml-8"} bg-[#0f0a2e] border border-white/10 rounded-2xl p-2 flex gap-1 shadow-2xl`}>
            {EMOJIS.map(e => (
              <button key={e} onClick={() => handleReaction(e)} className="text-lg hover:scale-125 transition-transform">{e}</button>
            ))}
          </div>
        )}

        {showMenu && (
          <div ref={menuRef} className={`absolute z-50 top-0 ${isMine ? "right-0" : "left-0"} mt-6 bg-[#0f0a2e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden min-w-[150px]`}>
            <button onClick={() => { navigator.clipboard.writeText(message.content || ""); setShowMenu(false); }}
              className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-slate-300 hover:bg-white/[0.05] transition-colors">
              <Copy className="w-3.5 h-3.5" /> Copy
            </button>
            {isMine && (
              <button onClick={() => { setEditing(true); setShowMenu(false); }}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-slate-300 hover:bg-white/[0.05] transition-colors">
                <Pencil className="w-3.5 h-3.5" /> Edit
              </button>
            )}
            <button onClick={() => handleDelete("me")}
              className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-slate-300 hover:bg-white/[0.05] transition-colors">
              <Trash2 className="w-3.5 h-3.5" /> Delete for me
            </button>
            {isMine && (
              <button onClick={() => handleDelete("everyone")}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors">
                <Trash2 className="w-3.5 h-3.5" /> Delete for everyone
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble