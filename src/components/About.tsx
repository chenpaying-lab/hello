import { motion, useScroll, useTransform } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';

const storyLines = [
  "我叫陳姵穎，目前是佛光大學資應系大一學生。",
  "我的定位：AI 角色訓練師 / 數位靈魂塑造者。",
  "我的核心精神：天馬行空，只要想得到，就想辦法讓 AI 做到。",
  "想讓小說角色活過來，彌補故事遺憾，這是我最初的動機。",
  "我曾訓練 AI 模擬國外朋友的語氣作為替身，解決了跨越時區的情感連結問題。",
  "未來，我計畫從語氣、聲音、表情全方位訓練出「超人類」AI。",
  "這不僅是技術，更是一場關於情感與協作的浪漫想像。"
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative py-10 px-10 lg:px-20 bg-transparent overflow-hidden">
      <div className="max-w-3xl space-y-12">
        {storyLines.map((line, index) => (
          <StoryLine key={index} text={line} index={index} />
        ))}
      </div>
    </section>
  );
}

function StoryLine({ text, index }: { text: string; index: number; key?: React.Key }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 60%"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [10, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x }}
      className="text-xl lg:text-2xl font-serif italic leading-relaxed text-white/80 border-l border-cyber-cyan/20 pl-6"
    >
      {text}
    </motion.div>
  );
}
