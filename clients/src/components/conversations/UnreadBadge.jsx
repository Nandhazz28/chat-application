import React from "react";

const UnreadBadge = ({ count }) => {
  if (!count) return null;

  return (
    <span className="inline-flex items-center justify-center min-w-[18px] h-4.5 px-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-bold font-mono tracking-tighter shadow-[0_0_12px_rgba(219,39,119,0.4)] border border-white/10 select-none">
      {count}
      <span className="sr-only">unread messages</span>
    </span>
  );
};

export default UnreadBadge;
