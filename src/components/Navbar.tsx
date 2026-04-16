import { motion } from 'motion/react';
import { Github, Instagram, Mail, ExternalLink } from 'lucide-react';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 px-10 py-6 flex justify-between items-center pointer-events-none"
    >
      <div className="flex items-center gap-4 pointer-events-auto">
        <div className="w-10 h-10 border border-cyber-cyan flex items-center justify-center text-cyber-cyan shadow-[0_0_10px_rgba(0,255,255,0.2)]">
          <span className="font-mono text-xs font-bold">CPY</span>
        </div>
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">Peiying OS v1.0</span>
      </div>

      <div className="hidden lg:flex items-center gap-10 pointer-events-auto">
        {['About', 'Projects'].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`} 
            className="text-[10px] uppercase tracking-[0.4em] text-white/50 hover:text-cyber-cyan transition-colors"
          >
            {item}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-6 pointer-events-auto">
        <a href="#" className="text-white/30 hover:text-cyber-pink transition-colors"><Instagram size={16} /></a>
        <a href="#" className="text-white/30 hover:text-cyber-cyan transition-colors"><Github size={16} /></a>
      </div>
    </motion.nav>
  );
}
