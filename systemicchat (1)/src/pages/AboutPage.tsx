import React from 'react';
import Navbar from '../components/layout/Navbar';
import { motion } from 'motion/react';

export default function AboutPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-8">About SystemicChat</h1>
            
            <div className="prose prose-invert max-w-none text-text-secondary space-y-6">
              <p className="text-xl">
                We are building the future of conversational AI for businesses.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">Our Mission</h2>
              <p>
                Our mission is to empower teams with intelligent, automated communication tools that save time, increase efficiency, and provide exceptional experiences for their customers.
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">The Team</h2>
              <p>
                Founded by passionate engineers and product designers, we believe that software should be intuitive, fast, and elegantly designed.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
