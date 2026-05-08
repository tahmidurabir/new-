import React from 'react';
import Navbar from '../components/layout/Navbar';
import { motion } from 'motion/react';

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-32 pb-20 relative">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms of Service</h1>
            
            <div className="prose prose-invert max-w-none text-text-secondary space-y-6">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Use of License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials on SystemicChat's website for personal, non-commercial transitory viewing only.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Disclaimer</h2>
              <p>
                The materials on SystemicChat's website are provided on an 'as is' basis. SystemicChat makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
