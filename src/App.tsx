/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Chatbot from './components/Chatbot';
import Navbar from './components/Navbar';
import { motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative min-h-screen bg-[#0D0D0D] text-white overflow-x-hidden">
      {/* Grid Background */}
      <div className="grid-bg fixed inset-0 pointer-events-none z-0" />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-cyber-cyan z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Left Pane: Hero & About */}
        <div className="lg:w-[55%] border-r border-cyber-cyan/10 flex flex-col">
          <section id="hero" className="flex-grow">
            <Hero />
          </section>
          <section id="about">
            <About />
          </section>
          
          {/* Profile Info Footer (Left Pane) */}
          <div className="p-10 border-t border-white/10 mt-auto">
            <h1 className="text-2xl font-bold">陳姵穎 Chen Peiying</h1>
            <p className="text-sm text-gray-500 mt-1">佛光大學資訊應用學系 | AI 角色訓練實習生 · 網路配音員</p>
          </div>
        </div>

        {/* Right Pane: Projects */}
        <div className="lg:w-[45%] bg-gradient-to-br from-[#0D0D0D]/90 to-cyber-pink/5 p-4 lg:p-10">
          <section id="projects">
            <Projects />
          </section>
        </div>
      </div>

      <Chatbot />
    </main>
  );
}

