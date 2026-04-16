import { motion, AnimatePresence } from 'motion/react';
import { Book, Shield, Mic2, Play, Pause } from 'lucide-react';
import React, { useState, useRef } from 'react';

const projects = [
  {
    id: 1,
    title: "字典共用計畫",
    subtitle: "Dictionary Sharing Project",
    icon: Book,
    color: "#00FFFF",
    description: "【問題】在團隊協作中，資訊碎片化導致查詢效率低下。【解決方案】建立分散式運算邏輯的共用字典系統，優化查詢流程並實現即時同步。【成果與啟發】顯著提升團隊協作速度，展現了對流程優化與系統化思維的深刻理解。",
    tags: ["分散式運算", "流程優化", "團隊協作"]
  },
  {
    id: 2,
    title: "萬用密碼演算法",
    subtitle: "Universal Password Algorithm",
    icon: Shield,
    color: "#FFB7C5",
    description: "【問題】個人資安管理混亂，傳統密碼難以兼顧記憶與強度。【解決方案】基於模式識別開發一套規則自動化思維的密碼生成邏輯，確保每個平台擁有唯一且強大的密碼。【成果與啟發】強化了資安意識，並將複雜規則轉化為簡潔的自動化流程。",
    tags: ["模式識別", "資安意識", "自動化思維"]
  },
  {
    id: 3,
    title: "聲優與 AI 語音訓練",
    subtitle: "Voice Acting & AI Training",
    icon: Mic2,
    color: "#00FFFF",
    description: "【問題】AI 語音缺乏情感起伏與角色靈魂。【解決方案】利用多模態數據採集，結合專業配音經驗，對 AI 進行跨領域的情感語調訓練。【成果與啟發】成功訓練出具有高度表現力的 AI 角色，為未來「AI 角色聲音訓練」奠定技術基礎。",
    tags: ["多模態數據", "跨領域結合", "聲音表現力"],
    hasAudio: true,
    audioUrl: "https://videotourl.com/audio/1776338225720-1f5d7daf-9edd-459f-99c5-0a443a33c252.mp3"
  }
];

export default function Projects() {
  const [activeAudio, setActiveAudio] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = (id: number, url?: string) => {
    if (activeAudio === id) {
      audioRef.current?.pause();
      setActiveAudio(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (url) {
        audioRef.current = new Audio(url);
        audioRef.current.play();
        audioRef.current.onended = () => setActiveAudio(null);
        setActiveAudio(id);
      }
    }
  };

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          isActive={activeAudio === project.id}
          onToggleAudio={() => toggleAudio(project.id, project.audioUrl)}
        />
      ))}

      {/* Background Audio Visualizer Effect for Project 3 */}
      <AnimatePresence>
        {activeAudio === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none flex items-end justify-center gap-2 p-20 z-0"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: [20, 100, 40, 120, 20] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1 + Math.random(),
                  ease: "easeInOut"
                }}
                className="w-4 bg-cyber-cyan rounded-full"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectCard({ project, isActive, onToggleAudio }: { 
  project: typeof projects[0]; 
  isActive: boolean;
  onToggleAudio: () => void;
  key?: React.Key;
}) {
  const Icon = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group p-6 border-b border-white/10 hover:bg-cyber-cyan/[0.05] transition-all duration-300 cursor-pointer"
      onClick={project.hasAudio ? onToggleAudio : undefined}
    >
      <div className="flex items-start gap-4 mb-3">
        <div className="w-10 h-10 border border-cyber-cyan flex items-center justify-center text-cyber-cyan shadow-[0_0_8px_rgba(0,255,255,0.3)] shrink-0">
          <Icon size={18} />
        </div>
        <div>
          <h4 className="text-lg font-bold text-cyber-pink">{project.title}</h4>
          <div className="flex flex-wrap gap-2 mt-1">
            {project.tags.map(tag => (
              <span key={tag} className="text-[10px] uppercase tracking-tighter border border-cyber-cyan px-1.5 py-0.5 text-cyber-cyan">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <p className="text-sm leading-relaxed text-gray-400">
        {project.description}
      </p>

      {project.hasAudio && (
        <div className="mt-4 flex items-center gap-2 text-cyber-cyan text-xs font-mono uppercase tracking-widest">
          {isActive ? <Pause size={14} /> : <Play size={14} />}
          <span>{isActive ? 'Playing Sample...' : 'Listen to Voice Sample'}</span>
        </div>
      )}
    </motion.div>
  );
}
