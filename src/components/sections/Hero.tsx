"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ReservationForm } from "@/components/forms/ReservationForm";
import { useConfig } from "@/context/ConfigContext";
import { getUnsplashUrl } from "@/lib/utils/unsplash";

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { config } = useConfig();

  if (!config) return null;

  const { hero } = config;

  // Fallback image for restaurants if hero image is not available or invalid
  const defaultFallback =
    "https://images.unsplash.com/photo-1602585578130-c9076e09330d?q=80&w=2666&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  let heroImageUrl = defaultFallback;

  if (hero.backgroundImage?.id && hero.backgroundImage.id.trim() !== "") {
    const imageId = hero.backgroundImage.id.trim();

    // Validate if it's a proper Unsplash URL or photo ID (should contain 'photo-' or be a full URL)
    const isValidUnsplashId =
      imageId.startsWith("http") ||
      imageId.startsWith("photo-") ||
      imageId.match(/^[A-Za-z0-9_-]{10,}$/); // Unsplash IDs are typically alphanumeric with 10+ chars

    // if (isValidUnsplashId) {
    //   try {
    //     heroImageUrl = getUnsplashUrl({
    //       id: imageId,
    //       alt: hero.backgroundImage.alt,
    //     });
    //     console.log('🚀 ~ Hero ~ heroImageUrl:', heroImageUrl);
    //   } catch (error) {
    heroImageUrl = defaultFallback;
    // }
    // }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero Image */}
      <Image
        src={heroImageUrl}
        alt={hero.backgroundImage?.alt || "Restaurant interior"}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="max-w-5xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 text-5xl font-bold text-white md:text-7xl lg:text-8xl tracking-tight"
          >
            {hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6 text-xl text-amber-200 md:text-2xl lg:text-3xl font-light"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6"
          >
            {hero.buttons.map((button, index) => (
              <Button
                key={index}
                size="lg"
                variant={button.variant as "primary" | "outline"}
                className={
                  button.variant === "outline"
                    ? "border-white text-white hover:bg-white/10"
                    : ""
                }
                onClick={() => {
                  if (button.action === "openReservation") {
                    setIsModalOpen(true);
                  } else if (button.action === "scrollToMenu") {
                    document
                      .getElementById("menu")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {button.text}
              </Button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-white/70">Scroll to explore</span>
          <svg
            className="h-6 w-6 animate-bounce text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>

      {/* Reservation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Reserva tu cita"
      >
        <ReservationForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </section>
  );
}
