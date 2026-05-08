import { motion } from 'motion/react';
import { INITIAL_CONTENT } from '../../constants';
import * as LucideIcons from 'lucide-react';

export default function Features() {
  const { solution } = INITIAL_CONTENT;

  return (
    <section className="py-24 bg-white/[0.02]" id="features">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{solution.headline}</h2>
            <p className="text-lg text-text-secondary">
              {solution.description}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solution.features.map((feature, index) => {
            const IconComponent = (LucideIcons as any)[feature.icon] || LucideIcons.Zap;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 group hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(91,140,255,0.3)]">
                  <IconComponent className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">{feature.title}</h3>
                <p className="text-text-secondary/80 leading-relaxed font-light">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
