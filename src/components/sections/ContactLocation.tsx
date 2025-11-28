'use client';

import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { ReservationForm } from '@/components/forms/ReservationForm';
import { useConfig } from '@/context/ConfigContext';

export function ContactLocation() {
  const { config } = useConfig();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { address, phone, email, hours } = config.contact;

  return (
    <section id="contact" className="py-20 md:py-32 px-4 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">Visit Us</h2>
          <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            We look forward to welcoming you to an exceptional dining experience
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Address */}
            <div>
              <h3 className="mb-3 text-xl font-semibold text-amber-400">Address</h3>
              <p className="text-slate-300">
                {address.street}
                <br />
                {address.city}, {address.state} {address.zip}
                <br />
                {address.country}
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-3 text-xl font-semibold text-amber-400">Contact</h3>
              <p className="text-slate-300">
                Phone:{' '}
                <a href={`tel:${phone}`} className="hover:text-amber-400 transition-colors">
                  {phone}
                </a>
                <br />
                Email:{' '}
                <a href={`mailto:${email}`} className="hover:text-amber-400 transition-colors">
                  {email}
                </a>
              </p>
            </div>

            {/* Hours */}
            <div>
              <h3 className="mb-3 text-xl font-semibold text-amber-400">Hours</h3>
              <div className="space-y-2 text-slate-300">
                {Object.entries(hours).map(([day, time]) => (
                  <div key={day} className="flex gap-4">
                    <span className="capitalize font-medium min-w-[100px]">{day}:</span>
                    <span>{time}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={() => setIsModalOpen(true)} size="lg" className="w-full">
              Reserve Your Table
            </Button>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="rounded-lg bg-slate-800 h-[500px] flex items-center justify-center"
          >
            <div className="text-center p-8">
              <svg
                className="mx-auto h-16 w-16 text-amber-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-slate-400">
                Map integration available
                <br />
                {address.street}, {address.city}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Reserve Your Table">
        <ReservationForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </section>
  );
}
