import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '@/src/lib/supabase';
import emailjs from '@emailjs/browser';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  whatsapp: z.string().optional(),
  messengerId: z.string().min(1, 'Messenger ID is required for demo'),
  plan: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan: 'Starter'
    }
  });

  useEffect(() => {
    const handleSelectPlan = (e: any) => {
      if (e.detail) {
        setValue('plan', e.detail);
      }
    };
    window.addEventListener('selectPlan', handleSelectPlan);
    return () => window.removeEventListener('selectPlan', handleSelectPlan);
  }, [setValue]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // 1. Save Lead to Supabase
      const { error: supabaseError } = await supabase
        .from('leads')
        .insert([
          { 
            name: data.name, 
            email: data.email, 
            messenger_id: data.messengerId,
            status: 'new',
            plan: data.plan || 'Not Specified',
          }
        ]);

      if (supabaseError) throw supabaseError;

      // 2. Trigger Welcome Email
      await fetch('/api/send-brevo-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toEmail: data.email,
          toName: data.name,
          plan: data.plan || 'Starter'
        })
      });

      setIsSuccess(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL === 'https://your-project-id.supabase.co') {
        setIsSuccess(true);
      } else {
        setError(err.message || 'Something went wrong. Please check console for details.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card p-8 md:p-12 max-w-xl mx-auto relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
      
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="text-2xl font-bold mb-2">Get Started for Free</h3>
            <p className="text-text-secondary mb-8 text-sm">
              Enter your details to start your 14-day trial or book a custom demo.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2 ml-1">Plan</label>
                  <select
                    {...register('plan')}
                    className="input-glass cursor-pointer appearance-none bg-bg-dark"
                  >
                    <option value="Starter">Starter ($19/mo)</option>
                    <option value="Pro">Pro ($49/mo)</option>
                    <option value="Agency">Agency ($149/mo)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2 ml-1">Full Name</label>
                  <input
                    {...register('name')}
                    placeholder="John Doe"
                    className="input-glass"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-2 ml-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2 ml-1">Email Address</label>
                  <input
                    {...register('email')}
                    placeholder="john@example.com"
                    className="input-glass"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-2 ml-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2 ml-1">Messenger ID / Page Link</label>
                  <input
                    {...register('messengerId')}
                    placeholder="fb.com/yourpage"
                    className="input-glass"
                  />
                  {errors.messengerId && <p className="text-red-400 text-xs mt-2 ml-1">{errors.messengerId.message}</p>}
                </div>
              </div>

              {error && <p className="text-red-400 text-xs text-center">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full h-14 flex items-center justify-center gap-3 text-lg font-bold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Start Automating Now
                  </>
                )}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-3xl font-bold mb-4 text-gradient">You're All Set!</h3>
            <p className="text-text-secondary mb-10 max-w-xs mx-auto">
              Our team will reach out to your Messenger ID within the next 24 hours to help you set up your first flow.
            </p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="text-primary font-bold hover:underline"
            >
              Send another request
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
