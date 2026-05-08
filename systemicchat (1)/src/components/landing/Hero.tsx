import { motion } from 'motion/react';
import { INITIAL_CONTENT } from '../../constants';
import { ChevronRight, Play } from 'lucide-react';

interface HeroProps {
  customContent?: typeof INITIAL_CONTENT.hero;
  analyticsContent?: any;
}

export default function Hero({ customContent, analyticsContent }: HeroProps) {
  const hero = customContent || INITIAL_CONTENT.hero;
  
  const extractYoutubeId = (url: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? match[1] : null;
  };

  const youtubeId = extractYoutubeId(analyticsContent?.youtubeLink);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-accent/20 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-accent uppercase tracking-widest mb-6 inline-block">
              Scale your business faster
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8">
              {hero.headline.split(' — ').map((part, i) => (
                <span key={i} className={i === 1 ? 'text-gradient' : ''}>
                  {part} {i === 0 ? ' — ' : ''}
                </span>
              ))}
            </h1>
            <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
              {hero.subheadline}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#lead-form" className="btn-primary w-full sm:w-auto h-14 px-8 flex items-center justify-center gap-2 text-lg">
                {hero.primary_cta}
                <ChevronRight className="w-5 h-5" />
              </a>
              <a href="#features" className="btn-secondary w-full sm:w-auto h-14 px-8 flex items-center justify-center gap-2 text-lg">
                <Play className="w-4 h-4 fill-current" />
                {hero.secondary_cta}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-20 relative px-4"
          >
            <div className="glass-card aspect-video max-w-5xl mx-auto p-2 overflow-hidden group">
              <div className="w-full h-full bg-white/5 backdrop-blur-xl rounded-lg overflow-hidden relative">
                {youtubeId ? (
                  <iframe 
                    src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&controls=1`} 
                    title="Product Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full relative z-10"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/20 group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-primary fill-current" />
                      </div>
                      <p className="text-white/40 text-sm font-medium">Watch Product Demo</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
