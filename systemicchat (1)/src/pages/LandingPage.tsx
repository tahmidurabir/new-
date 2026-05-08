import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { INITIAL_CONTENT } from '../constants';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Pricing from '../components/landing/Pricing';
import LeadForm from '../components/landing/LeadForm';
import FloatingChatWidget from '../components/landing/FloatingChatWidget';
import { ArrowRight, MessageCircle, AlertCircle, Quote, Plus, Minus, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/src/lib/utils';
import { supabase } from '../lib/supabase';

export default function LandingPage() {
  const [siteData, setSiteData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase.from('site_content').select('*').in('section', ['hero', 'pricing', 'analytics']);
      if (data) {
        const map: any = {};
        data.forEach(d => map[d.section] = d.content);
        setSiteData(map);
      }
      setLoading(false);
    };
    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-transparent">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  // Merge live content with fallback
  const heroContent = { ...INITIAL_CONTENT.hero, ...(siteData.hero || {}) };
  const pricingContent = siteData.pricing ? { ...INITIAL_CONTENT.pricing, ...siteData.pricing } : INITIAL_CONTENT.pricing;
  const analyticsContent = siteData.analytics || {};

  return (
    <div className="relative">
      <Hero customContent={heroContent} analyticsContent={analyticsContent} />
      <SocialProof />
      <Problem />
      <Features />
      <HowItWorks />
      <Pricing customContent={pricingContent} />
      <FAQ />
      <FinalCTA />
      
      {/* Footer */}
      <footer className="py-20 border-t border-white/5 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
          <div className="md:col-span-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <MessageCircle className="text-white w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl">Systemic<span className="text-primary">Chat</span></span>
            </div>
            <p className="text-text-secondary max-w-sm mb-8">
              Empowering 4,000+ businesses to automate their Messenger sales funnels and grow faster without the manual effort.
            </p>
          </div>
          <div className="md:col-span-3">
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-text-secondary">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-text-secondary">
              <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-text-secondary text-sm relative z-10">
          <p>© 2026 SystemicChat. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://www.facebook.com/Tahmidurrahmanabir01" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
            <a href="https://www.linkedin.com/in/tahmidurpro/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://www.instagram.com/abirtahmidurrahman" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </footer>

      <FloatingChatWidget />
    </div>
  );
}

function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/20 blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -50, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-500/10 blur-[150px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.05, 0.15, 0.05],
          x: [0, 30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
        className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-purple-500/10 blur-[100px]"
      />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
}

function SocialProof() {
  const { social_proof } = INITIAL_CONTENT;
  return (
    <section className="py-20 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-semibold text-text-secondary uppercase tracking-[0.2em] mb-12">
          Trusted by Innovative Teams Worldwide
        </p>
        
        {/* Testimonials Ticker/Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {social_proof.testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 relative group hover:-translate-y-2 transition-transform duration-500"
            >
              <Quote className="absolute top-6 right-8 text-primary/10 w-16 h-16 group-hover:scale-110 group-hover:text-primary/20 transition-all duration-500" />
              <p className="text-xl font-light mb-8 relative z-10 leading-relaxed text-text-primary/90">"{t.text}"</p>
              <div className="flex items-center gap-4 relative z-10">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border border-primary/20 shadow-[0_0_15px_rgba(91,140,255,0.2)]" />
                <div>
                  <h4 className="font-bold leading-none mb-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">{t.name}</h4>
                  <p className="text-xs font-light text-text-secondary/80">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const { problem } = INITIAL_CONTENT;
  return (
    <section className="py-24 overflow-hidden relative">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-[1.2]">
            {problem.headline}
          </h2>
          <div className="space-y-6">
            {problem.points.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                </div>
                <p className="text-xl text-text-secondary font-medium">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="relative">
          <div className="glass-card aspect-square max-w-lg mx-auto p-8 flex flex-col justify-center shadow-[0_0_50px_rgba(248,113,113,0.1)]">
            <div className="text-center">
              <div className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-red-400 to-red-600 mb-4 animate-pulse">82%</div>
              <p className="text-xl font-bold mb-2 text-red-100">Lead Decay Rate</p>
              <p className="text-red-200/60 font-light">
                Leads not responded to within <span className="text-white font-bold">5 minutes</span> are 80% less likely to convert.
              </p>
            </div>
            <div className="mt-12 space-y-4">
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '82%' }}
                  className="h-full bg-red-500"
                />
              </div>
              <div className="flex justify-between text-xs text-text-secondary uppercase font-bold tracking-widest">
                <span>Fast Response</span>
                <span>Lost Revenue</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const { how_it_works } = INITIAL_CONTENT;
  return (
    <section id="how-it-works" className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-display font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Launch Your Bot in 3 Steps</h2>
          <p className="text-text-secondary text-lg">You don't need a developer or a heavy budget. Get started today.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10" />
          
          {how_it_works.map((step, i) => (
            <div key={i} className="text-center relative z-10 glass-card p-10 rounded-[3rem] group">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-bg-dark to-primary/20 backdrop-blur-md border border-primary/30 group-hover:border-primary/60 shadow-[0_0_20px_rgba(91,140,255,0.2)] group-hover:shadow-[0_0_30px_rgba(91,140,255,0.5)] flex items-center justify-center mx-auto mb-8 text-3xl font-display font-bold transition-all duration-500 group-hover:scale-110 text-primary">
                {step.step}
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">{step.title}</h3>
              <p className="text-text-secondary/80 font-light leading-relaxed px-4">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const { faq } = INITIAL_CONTENT;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white/[0.02]">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-20">Got Questions?</h2>
        <div className="space-y-4">
          {faq.map((item, i) => (
            <div key={i} className="glass-card overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-lg font-bold">{item.question}</span>
                {openIndex === i ? <Minus className="text-primary" /> : <Plus className="text-primary" />}
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6 text-text-secondary leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const { final_cta } = INITIAL_CONTENT;
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/10 blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 text-center mb-20">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8 max-w-4xl mx-auto tracking-tight">
            Ready to <span className="text-gradient">Automate</span> Your Growth?
          </h2>
          <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto">
            Join 4,000+ businesses using SystemicChat to grow their conversions 24/7. No credit card required.
          </p>
        </motion.div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6" id="lead-form">
        <LeadForm />
      </div>
    </section>
  );
}
