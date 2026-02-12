"use client";

import { useState } from "react";
import { ShaderBackground } from "@/components/ui/shaders-hero-section";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedin: "",
    teamName: "",
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    { key: "name", label: "What's your name?", placeholder: "Type your full name...", type: "text", required: true },
    { key: "email", label: "What's your email?", placeholder: "name@example.com", type: "email", required: true },
    { key: "linkedin", label: "Share your LinkedIn profile", placeholder: "https://linkedin.com/in/...", type: "url", required: true },
    { key: "teamName", label: "Got a team name?", placeholder: "Optional - leave blank if solo", type: "text", required: false },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const step = steps[currentStep];
      if (!step.required || formData[step.key as keyof typeof formData]) {
        handleNext();
      }
    }
  };

  const canProceed = () => {
    const step = steps[currentStep];
    return !step.required || formData[step.key as keyof typeof formData];
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Shader Background */}
      <ShaderBackground>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative z-10 text-center max-w-4xl px-4">
            {/* Badge */}
            <div
              className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-8 relative"
            >
              <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
              <span className="text-white/90 text-xs font-light relative z-10">
                ✨ In collaboration with X
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white mb-6 leading-tight">
              <span className="font-medium italic instrument">Stockholm&apos;s</span>{" "}
              <span className="font-light">First</span>
              <br />
              <span className="font-light tracking-tight">{"{ Hackathome }"}</span>
            </h1>

            {/* Event Details */}
            <p className="text-sm md:text-base text-white/70 mb-8 font-light leading-relaxed max-w-md mx-auto">
              Yes, it&apos;s literally in our apartment. 24 builders, 8 hours, plenty of coffee. February 28th in Stockholm.
            </p>

            {/* CTA Button */}
            <button
              className="px-8 py-3 rounded-full bg-white text-black font-normal text-sm transition-all duration-200 hover:bg-white/90 cursor-pointer"
              onClick={() => {
                document
                  .getElementById("register")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Register Now
            </button>

            {/* Social Proof */}
            <p className="mt-8 text-white/70 text-xs font-light tracking-wide">
              Featuring engineers from Lovable, Microsoft, Netlight, Doktor.se and more
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </div>
      </ShaderBackground>

      {/* Registration Form Section - Typeform Style */}
      <section
        id="register"
        className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-20"
      >
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-4">
                  You&apos;re <span className="italic instrument">registered!</span>
                </h2>
                <p className="text-stone-500 text-lg">
                  We&apos;ll be in touch with more details soon.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress */}
                <div className="flex gap-2 mb-12">
                  {steps.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        i <= currentStep ? "bg-stone-900" : "bg-stone-200"
                      }`}
                    />
                  ))}
                </div>

                {/* Question */}
                <div className="mb-8">
                  <span className="text-stone-400 text-sm mb-2 block">
                    {currentStep + 1} → {steps[currentStep].required && "*"}
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-stone-900 mb-8">
                    {steps[currentStep].label}
                  </h2>
                  <input
                    type={steps[currentStep].type}
                    placeholder={steps[currentStep].placeholder}
                    value={formData[steps[currentStep].key as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({ ...formData, [steps[currentStep].key]: e.target.value })
                    }
                    onKeyDown={handleKeyDown}
                    className="w-full text-2xl md:text-3xl font-light bg-transparent border-b-2 border-stone-200 focus:border-stone-900 outline-none pb-4 text-stone-900 placeholder:text-stone-300 transition-colors"
                  />
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className={`px-8 py-3 rounded-full text-sm font-normal transition-all duration-200 ${
                      canProceed()
                        ? "bg-stone-900 text-white hover:bg-stone-800 cursor-pointer"
                        : "bg-stone-200 text-stone-400 cursor-not-allowed"
                    }`}
                  >
                    {currentStep === steps.length - 1 ? "Submit" : "Continue"}
                  </button>
                  <span className="text-stone-400 text-sm">
                    press <kbd className="px-2 py-1 bg-stone-100 rounded text-xs">Enter ↵</kbd>
                  </span>
                </div>

                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="mt-8 text-stone-400 text-sm hover:text-stone-600 transition-colors"
                  >
                    ← Go back
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
