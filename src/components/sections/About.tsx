'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useConfig } from '@/context/ConfigContext';

export function About() {
  const { config } = useConfig();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-20 md:py-32 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <h2 className="mb-8 text-4xl font-bold text-slate-900 md:text-5xl lg:text-6xl">{config.about.title}</h2>
            <div className="space-y-6 text-base md:text-lg text-slate-700 leading-relaxed">
              {config.about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 grid grid-cols-2 gap-6 lg:gap-8"
          >
            {config.about.stats.map((stat, index) => (
              <div key={index} className="rounded-xl bg-white p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="text-5xl lg:text-6xl font-bold text-amber-600 mb-3">{stat.value}</div>
                <div className="text-sm lg:text-base text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
