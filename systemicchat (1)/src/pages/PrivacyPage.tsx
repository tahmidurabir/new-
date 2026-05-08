import React from 'react';
import Navbar from '../components/layout/Navbar';
import { motion } from 'motion/react';

export default function PrivacyPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
            
            <div className="prose prose-invert max-w-none text-text-secondary space-y-6">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. Information We Collect</h2>
              <p>
                We collect information that you provide directly to us, such as when you create or modify your account, request services, contact customer support, or otherwise communicate with us.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. How We Use Information</h2>
              <p>
                We use the information we collect to provide, maintain, and improve our services, such as to administer your account, provide customer support, and develop new features.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Sharing of Information</h2>
              <p>
                We do not sell your personal information. We may share your information with third-party vendors and service providers that perform services on our behalf.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
