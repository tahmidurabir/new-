import { motion } from 'motion/react';
import { INITIAL_CONTENT } from '../../constants';
import { Check } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface PricingProps {
  customContent?: typeof INITIAL_CONTENT.pricing;
}

export default function Pricing({ customContent }: PricingProps) {
  const pricing = customContent || INITIAL_CONTENT.pricing;

  return (
    <section className="py-24" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{pricing.headline}</h2>
            <p className="text-lg text-text-secondary">
              Choose the perfect plan for your business size and automation needs.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricing.plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "glass-card p-10 flex flex-col relative overflow-hidden",
                plan.isPopular && "border-primary/50 shadow-[0_0_40px_rgba(91,140,255,0.15)] ring-1 ring-primary/20"
              )}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rotate-45 translate-x-3 translate-y-3 origin-center">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="mb-8">
                <span className="text-primary text-sm font-bold uppercase tracking-widest">{plan.name}</span>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-5xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">{plan.price}</span>
                  <span className="text-text-secondary/70">/mo</span>
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('selectPlan', { detail: plan.name }));
                  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={cn(
                "w-full py-4 rounded-xl font-bold transition-all duration-300 inline-block text-center cursor-pointer",
                plan.isPopular 
                  ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20" 
                  : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
              )}>
                Start with {plan.name}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
