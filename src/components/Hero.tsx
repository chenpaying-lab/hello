import { motion } from 'motion/react';
import { useState } from 'react';
import VideoModal from './VideoModal';

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative min-h-[60vh] lg:min-h-screen w-full flex flex-col justify-center px-10 lg:px-20 py-20">
      {/* Torii Visual */}
      <div className="absolute top-20 left-10 w-[180px] h-[160px] opacity-30 pointer-events-none">
        <div 
          className="w-full h-full border-t-[15px] border-cyber-cyan"
          style={{
            clipPath: 'polygon(10% 0%, 90% 0%, 100% 20%, 85% 20%, 85% 100%, 75% 100%, 75% 20%, 25% 20%, 25% 100%, 15% 100%, 15% 20%, 0% 20%)',
            filter: 'drop-shadow(0 0 15px #00FFFF)'
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl flex flex-col lg:flex-row items-center lg:items-start gap-12">
        <div className="max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tighter slogan-gradient mb-4"
          >
            聲優的感性 ×<br />資訊的理性
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            className="text-lg lg:text-xl text-cyber-pink tracking-[2px] mb-10"
          >
            在 AI 的世界裡，為每一個虛擬角色找回遺憾。
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)' }}
            onClick={() => setIsVideoOpen(true)}
            className="px-8 py-3 border border-cyber-cyan text-cyber-cyan uppercase tracking-[3px] text-xs font-bold transition-all duration-300 neon-border-cyan"
          >
            探尋數位靈魂之源
          </motion.button>

          {/* Bio Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 p-6 bg-white/[0.02] border-l-2 border-cyber-pink max-w-md"
          >
            <h3 className="text-xs uppercase tracking-[1px] text-cyber-pink mb-3 font-bold">About Digital Alchemist</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              「想讓小說角色活過來，是我最浪漫的技術實踐。」我致力於從語氣、聲音、表情全方位訓練出「超人類」AI。曾成功訓練 AI 模擬跨國友人的語氣作為替身，在科技的冷冽中注入靈魂的溫度。
            </p>
          </motion.div>
        </div>

        {/* Hero Image - Portrait 4:3 (Vertical) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="w-full max-w-[320px] aspect-[3/4] z-0"
        >
          <div className="relative w-full h-full">
            {/* Decorative frame */}
            <div className="absolute -inset-4 border border-cyber-cyan/20 pointer-events-none" />
            <div className="absolute -top-2 -right-2 w-8 h-8 border-t border-r border-cyber-pink" />
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b border-l border-cyber-pink" />
            
            <div className="w-full h-full overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <img 
                src="https://cdn.phototourl.com/free/2026-04-16-fe807964-f09f-4d8f-b8eb-65860cc1a6e8.jpg" 
                alt="Long haired anime girl with headphones recording" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105 object-[70%_center]"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Scanning line effect */}
            <motion.div 
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-[1px] bg-cyber-cyan/30 z-10 shadow-[0_0_10px_#00FFFF]"
            />
          </div>
        </motion.div>
      </div>

      <VideoModal 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
        videoUrl="https://youtube.com/shorts/mGlWUuVF2cI?si=yd6_GiwzZL6wqHLS" 
      />
    </section>
  );
}

