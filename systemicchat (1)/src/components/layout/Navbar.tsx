import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MessageSquareCode, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/src/lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled ? 'bg-bg-dark/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(91,140,255,0.5)] transition-all">
            <MessageSquareCode className="text-white w-6 h-6" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">
            Systemic<span className="text-primary">Chat</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">Pricing</a>
          <a href="#how-it-works" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">Templates</a>
          <a href="#lead-form" className="btn-primary py-2 text-sm">Start Automating</a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-bg-dark border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
        >
          <a href="#features" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
          <a href="#pricing" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
          <a href="#lead-form" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary w-full text-center py-3">Start Automating</a>
        </motion.div>
      )}
    </nav>
  );
}
