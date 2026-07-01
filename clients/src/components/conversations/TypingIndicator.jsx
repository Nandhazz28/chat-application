const TypingIndicator = ({ typingUser }) => {
  if (!typingUser) return null;
  return (
    <div className="flex items-center gap-2 px-4 py-1 animate-fade-in">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold border border-white/10 flex-shrink-0">
        {(typingUser.username || "?").charAt(0).toUpperCase()}
      </div>
      <div className="flex items-center gap-1 px-3 py-2 rounded-2xl rounded-tl-sm bg-[#0f0a2e] border border-white/[0.07]">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default TypingIndicator;
