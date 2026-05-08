import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, MessageCircle, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  // Restart animation when opened
  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      return;
    }

    const timer = setInterval(() => {
      setStep((s) => (s < 4 ? s + 1 : 0));
    }, 2500);
    return () => clearInterval(timer);
  }, [isOpen]);

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0, y: 0 }}
        animate={isOpen ? { scale: 0, opacity: 0, y: 0 } : { scale: 1, opacity: 1, y: [0, -6, 0] }}
        transition={{ 
          scale: { type: "spring", stiffness: 260, damping: 20 },
          opacity: { duration: 0.2 },
          y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
        }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full flex items-center justify-center",
          "bg-gradient-to-tr from-primary to-accent shadow-[0_0_20px_rgba(91,140,255,0.3)]",
          "hover:shadow-[0_0_30px_rgba(91,140,255,0.6)] transition-shadow duration-300 group",
          isOpen ? "pointer-events-none" : "cursor-pointer"
        )}
      >
        <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20" />
        <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
      </motion.button>

      {/* Expanded Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-6 right-6 z-[60] w-[340px] rounded-[24px] p-[1px] bg-gradient-to-b from-white/20 to-white/5 shadow-[0_10px_50px_rgba(0,0,0,0.5),_0_0_40px_rgba(91,140,255,0.15)] group"
          >
            {/* Outer Glow */}
            <div className="absolute inset-0 bg-primary/10 rounded-[24px] blur-xl" />
            
            <div className="relative rounded-[23px] bg-[#0A0A0A]/95 overflow-hidden backdrop-blur-xl h-[420px] flex flex-col border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              {/* Header */}
              <div className="absolute top-0 left-0 w-full p-4 border-b border-white/10 bg-white/[0.03] flex items-center justify-between z-10 backdrop-blur-xl">
                 <div className="flex items-center gap-3">
                   <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-[0_0_20px_rgba(91,140,255,0.3)]">
                      <Sparkles className="w-5 h-5 text-white" />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#0A0A0A] shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                   </div>
                   <div>
                      <div className="text-sm font-display font-bold text-white tracking-wide">SystemicAI Assist</div>
                      <div className="text-[11px] text-green-400 font-medium flex items-center gap-1.5 uppercase tracking-wider">
                        Online
                      </div>
                   </div>
                 </div>
                 
                 <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-text-secondary hover:text-white transition-colors"
                 >
                   <X className="w-4 h-4" />
                 </button>
              </div>

              {/* Chat Body */}
              <div className="flex-1 p-5 pt-24 pb-20 flex flex-col justify-end gap-4 relative z-0 overflow-hidden">
                <AnimatePresence mode="popLayout">
                  {step >= 1 && (
                    <motion.div
                      key="msg1"
                      initial={{ opacity: 0, y: 15, scale: 0.9, transformOrigin: 'bottom right' }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="self-end max-w-[85%] bg-white/10 backdrop-blur-md border border-white/10 shadow-lg text-[13px] leading-relaxed text-white px-4 py-3 rounded-2xl rounded-tr-sm"
                    >
                      Hi! Does this integrate with my existing Shopify store?
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0, scale: 0.8, transformOrigin: 'bottom left' }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="self-start bg-white/5 border border-white/5 px-4 py-3.5 rounded-2xl rounded-tl-sm flex items-center gap-1.5 mt-1 shadow-sm"
                    >
                      <div className="flex gap-1.5">
                        <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }} className="w-1.5 h-1.5 rounded-full bg-text-secondary" />
                        <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2, ease: "easeInOut" }} className="w-1.5 h-1.5 rounded-full bg-text-secondary" />
                        <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4, ease: "easeInOut" }} className="w-1.5 h-1.5 rounded-full bg-text-secondary" />
                      </div>
                    </motion.div>
                  )}

                  {step >= 3 && (
                    <motion.div
                      key="msg2"
                      initial={{ opacity: 0, y: 15, scale: 0.9, transformOrigin: 'bottom left' }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="self-start max-w-[90%] bg-gradient-to-r from-primary to-accent text-white text-[13px] leading-relaxed px-4 py-3 rounded-2xl rounded-tl-sm mt-1 shadow-[0_4px_20px_rgba(91,140,255,0.3)] border border-white/20 font-medium"
                    >
                      Yes! We seamlessly integrate with Shopify in 2 minutes. I can guide you through it! ✨
                    </motion.div>
                  )}

                  {step >= 4 && (
                    <motion.div
                      key="link1"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="self-start max-w-[80%]"
                    >
                      <a href="#how-it-works" onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                        setIsOpen(false);
                      }} className="mt-1 inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors border border-white/20 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white">
                        See how it works
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Fake Input Area */}
              <div className="absolute bottom-0 left-0 w-full p-4 bg-white/[0.02] border-t border-white/10 backdrop-blur-xl">
                <div className="relative flex items-center">
                  <input 
                    type="text" 
                    placeholder="Ask me anything..." 
                    disabled
                    className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 disabled:opacity-80"
                  />
                  <button disabled className="absolute right-2 px-2 py-1 rounded-full bg-primary/20 text-primary pointer-events-none">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
