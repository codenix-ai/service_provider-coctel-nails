"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ReservationForm } from "@/components/forms/ReservationForm";
import { useConfig } from "@/context/ConfigContext";

export function Navigation() {
  const { config } = useConfig();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className={`text-2xl font-bold transition-colors ${
                isScrolled ? "text-slate-900" : "text-white"
              }`}
            >
              {config.branding.name}
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {config.navigation.items.map((item) => (
                <a
                  key={item.link}
                  href={item.link}
                  className={`transition-colors hover:text-amber-600 ${
                    isScrolled ? "text-slate-700" : "text-white"
                  }`}
                >
                  {item.text}
                </a>
              ))}
              <Button
                onClick={() => setIsModalOpen(true)}
                variant={isScrolled ? "primary" : "outline"}
                className={
                  !isScrolled ? "border-white text-white hover:bg-white/10" : ""
                }
              >
                Reserva
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 transition-colors ${
                isScrolled ? "text-slate-900" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-200"
            >
              <div className="px-4 py-6 space-y-3">
                {config.navigation.items.map((item) => (
                  <a
                    key={item.link}
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-base font-medium text-slate-700 hover:text-amber-600 transition-colors"
                  >
                    {item.text}
                  </a>
                ))}
                <div className="pt-2">
                  <Button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsModalOpen(true);
                    }}
                    className="w-full"
                  >
                    Reserva tu cita
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Reserva tu cita"
      >
        <ReservationForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
}
