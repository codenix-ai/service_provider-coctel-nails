"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useConfig } from "@/context/ConfigContext";

export function MenuHighlights() {
  const { config } = useConfig();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-20 md:py-32 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl lg:text-6xl">
            {config.menu.title}
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {config.menu.subtitle}
          </p>
        </motion.div>

        <div className="grid gap-8 lg:gap-10 md:grid-cols-2">
          {config.menu.items.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="mb-5 inline-block rounded-full bg-amber-100 px-4 py-1.5 text-xs font-semibold text-amber-700 uppercase tracking-wide">
                {item.category}
              </div>

              <h3 className="mb-4 text-2xl lg:text-3xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                {item.name}
              </h3>
              <p className="mb-6 text-slate-600 leading-relaxed text-base">
                {item.description}
              </p>
              <div className="text-3xl font-bold text-amber-600">
                {item.price}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
