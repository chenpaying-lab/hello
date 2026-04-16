import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

export default function VideoModal({ isOpen, onClose, videoUrl }: VideoModalProps) {
  const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
  const isShorts = videoUrl.includes('/shorts/');

  const getEmbedUrl = (url: string) => {
    if (url.includes('/shorts/')) {
      const id = url.split('/shorts/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('watch?v=')) {
      const id = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`relative w-full ${isShorts ? 'max-w-sm aspect-[9/16]' : 'max-w-5xl aspect-video'} bg-black rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,255,255,0.3)] border border-cyber-cyan/20`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-cyber-cyan text-white hover:text-cyber-black rounded-full transition-all"
            >
              <X size={24} />
            </button>
            
            {isYouTube ? (
              <iframe
                src={getEmbedUrl(videoUrl)}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Video"
              />
            ) : (
              <video
                src={videoUrl}
                className="w-full h-full object-contain"
                controls
                autoPlay
              >
                您的瀏覽器不支援影片播放。
              </video>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
