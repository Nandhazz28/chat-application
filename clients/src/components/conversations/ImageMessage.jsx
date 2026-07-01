import { useState } from "react";
import { ZoomIn, Download, X } from "lucide-react";

const ImageMessage = ({ imageUrl }) => {
  const [lightbox, setLightbox] = useState(false);
  const [loaded, setLoaded]     = useState(false);

  return (
    <>
      <div className="relative group cursor-pointer" onClick={() => setLightbox(true)}>
        {!loaded && (
          <div className="w-48 h-32 rounded-xl bg-white/5 animate-pulse" />
        )}
        <img
          src={imageUrl}
          alt="message"
          onLoad={() => setLoaded(true)}
          className={`max-w-[220px] max-h-[220px] rounded-xl object-cover border border-white/10 transition-all duration-300 hover:brightness-90 ${loaded ? "block" : "hidden"}`}
          loading="lazy"
        />
        {loaded && (
          <div className="absolute inset-0 rounded-xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <ZoomIn className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md flex items-center justify-center" onClick={() => setLightbox(false)}>
          <div className="relative max-w-[90vw] max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <img src={imageUrl} alt="full" className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain" />
            <div className="absolute top-3 right-3 flex gap-2">
              <a href={imageUrl} download target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors" onClick={e => e.stopPropagation()}>
                <Download className="w-4 h-4" />
              </a>
              <button onClick={() => setLightbox(false)}
                className="w-9 h-9 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageMessage;