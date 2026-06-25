import React from "react";

const ImageMessage = ({ imageUrl }) => {
  return (
    <div className="relative max-w-xs rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] p-1 shadow-xl shadow-purple-950/20 group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-purple-500/30">
      
      {/* Premium Cosmic Hover Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
      
      {/* Main Attachment Image */}
      <img
        src={imageUrl}
        alt="Shared media attachment"
        loading="lazy"
        className="w-full h-auto max-h-64 object-cover rounded-xl relative z-0 bg-[#06031a]"
      />
    </div>
  );
};

export default ImageMessage;