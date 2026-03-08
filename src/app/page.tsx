"use client";

import { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { ShaderBackground } from "@/components/ui/shaders-hero-section";
import { motion, AnimatePresence } from "framer-motion";

const supabase = createClient(
  "https://jvvfpqddnxmapxaixmcx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2dmZwcWRkbnhtYXB4YWl4bWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0MzE3MDUsImV4cCI6MjA4NzAwNzcwNX0.wCCvvQiJB--Jr9WXxbpSuBXfb8LfKXT-4bFTghcT3co"
);

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", linkedin: "" });
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const hasInteracted = useRef(false);

  useEffect(() => {
    if (hasInteracted.current) {
      inputRef.current?.focus();
    }
  }, [currentStep]);

  const steps = [
    { key: "name", label: "What's your name?", placeholder: "Type your full name...", type: "text" },
    { key: "email", label: "What's your email?", placeholder: "name@example.com", type: "email" },
    { key: "linkedin", label: "Share your LinkedIn profile", placeholder: "https://linkedin.com/in/...", type: "url" },
  ];

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const canProceed = () => {
    const value = formData[steps[currentStep].key as keyof typeof formData];
    if (steps[currentStep].key === "email") return isValidEmail(value);
    return value.trim().length > 0;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    const { error } = await supabase.from("hackathome-waitlist").insert({
      name: formData.name,
      email: formData.email,
      linkedin: formData.linkedin,
    });
    setSubmitting(false);
    if (error) {
      if (error.code === "23505") {
        setError("This email is already on the list!");
      } else {
        setError("Something went wrong. Please try again.");
      }
      return;
    }
    setSubmitted(true);
  };

  const handleNext = () => {
    hasInteracted.current = true;
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (canProceed()) handleNext();
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ShaderBackground>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative z-10 text-center max-w-4xl px-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white mb-6 leading-tight">
              <span className="font-light tracking-tight">{"{ Hackathome }"}</span>
            </h1>

            <p className="text-sm md:text-base text-white/80 mb-8 font-light leading-relaxed max-w-lg mx-auto drop-shadow-md">
              Intimate hackathons hosted in living rooms. Small groups, big builds, good vibes.
            </p>

            <div className="flex items-center justify-center gap-4">
              <button
                className="px-8 py-3 rounded-full bg-white text-black font-normal text-sm transition-all duration-200 hover:bg-white/90 cursor-pointer"
                onClick={() => {
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Join Waitlist
              </button>
              <button
                className="px-8 py-3 rounded-full bg-stone-900 text-white font-normal text-sm transition-all duration-200 hover:bg-stone-800 cursor-pointer"
                onClick={() => {
                  document
                    .getElementById("past-events")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Past Events
              </button>
            </div>
          </div>
        </div>
        <p className="absolute bottom-6 left-0 right-0 text-center text-white/30 text-xs font-light">
          Built with <a href="https://senka.dev" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/50 transition-colors">Senka</a>, deployed on <a href="https://spawned.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/50 transition-colors">Spawned</a>
        </p>
      </ShaderBackground>

      {/* What is Hackathome */}
      <section id="about" className="bg-stone-900 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-16 text-center">
            What is <span className="italic instrument">Hackathome?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="text-center">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-lg font-medium mb-2">In someone&apos;s apartment</h3>
              <p className="text-white/60 text-sm font-light">
                No conference halls. No corporate vibes. Just a living room, good WiFi, and builders who ship.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎲</div>
              <h3 className="text-lg font-medium mb-2">Randomized themes</h3>
              <p className="text-white/60 text-sm font-light">
                Participants suggest themes. On hack day, we randomize a few and everyone builds around the chosen ones.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-lg font-medium mb-2">Expert judges</h3>
              <p className="text-white/60 text-sm font-light">
                After demos, a panel of judges scores each project on originality, design, and launch readiness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section id="past-events" className="bg-stone-50 py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-stone-900 mb-16 text-center">
            Past <span className="italic instrument">events</span>
          </h2>

          {/* Event Card */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden max-w-2xl mx-auto">
            <div className="bg-stone-900 text-white p-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-medium uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
                  Completed
                </span>
                <span className="text-xs text-white/50">March 7, 2026</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-light mb-2">
                <span className="italic instrument">Stockholm&apos;s</span>{" "}
                <span className="font-light">First Hackathome</span>
              </h3>
              <p className="text-white/60 text-sm font-light">
                24 builders, 10 hours, one apartment. Stockholm, Sweden.
              </p>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div>
                  <p className="text-2xl font-light text-stone-900">24</p>
                  <p className="text-xs text-stone-400 mt-1">Builders</p>
                </div>
                <div>
                  <p className="text-2xl font-light text-stone-900">10h</p>
                  <p className="text-xs text-stone-400 mt-1">Duration</p>
                </div>
                <div>
                  <p className="text-2xl font-light text-stone-900">8</p>
                  <p className="text-xs text-stone-400 mt-1">Teams</p>
                </div>
                <div>
                  <p className="text-2xl font-light text-stone-900">3</p>
                  <p className="text-xs text-stone-400 mt-1">Sponsors</p>
                </div>
              </div>

              {/* Hosts & Partners */}
              <div className="border-t border-stone-100 pt-6">
                <p className="text-xs text-stone-400 uppercase tracking-wider mb-4">Hosted by</p>
                <div className="flex items-center gap-4 flex-wrap">
                  <a href="https://www.linkedin.com/in/alexfooladi/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-stone-200 group-hover:border-stone-400 transition-colors">
                      <img src="/alex.jpeg" alt="Alex" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">Alex</span>
                  </a>
                  <a href="https://www.linkedin.com/in/jonas-rosengren-2a4908211/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-stone-200 group-hover:border-stone-400 transition-colors">
                      <img src="/cohost.jpeg" alt="Jonas" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">Jonas</span>
                  </a>
                </div>
              </div>

              <div className="border-t border-stone-100 pt-6 mt-6">
                <p className="text-xs text-stone-400 uppercase tracking-wider mb-4">In partnership with</p>
                <div className="flex items-center gap-6 flex-wrap">
                  <a href="https://spawned.ai/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                    <img src="/spawned-logo.png" alt="Spawned" className="h-6 w-auto brightness-0" />
                  </a>
                  <a href="https://www.agreo.se/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity -ml-8 translate-y-1">
                    <img src="/agreo-logo.svg" alt="Agreo" className="h-24 w-auto brightness-0" />
                  </a>
                  <a href="https://icebreaker.vc" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                    <img src="/icebreaker-logo.png" alt="Icebreaker" className="h-4 w-auto brightness-0" />
                  </a>
                </div>
              </div>

              <div className="border-t border-stone-100 pt-6 mt-6">
                <p className="text-xs text-stone-400 uppercase tracking-wider mb-2">Featured builders from</p>
                <p className="text-sm text-stone-500 font-light">
                  Lovable, Microsoft, Strawberry, Vesence and more
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section
        id="waitlist"
        className="min-h-screen bg-stone-900 flex items-center justify-center px-4 py-20"
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
                <div className="w-20 h-20 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
                  You&apos;re on the <span className="italic instrument">list!</span>
                </h2>
                <p className="text-white/50 text-lg">
                  We&apos;ll reach out when details for the next event are ready.
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
                {/* Header */}
                {currentStep === 0 && (
                  <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-light text-white mb-3">
                      Next event <span className="italic instrument">coming soon</span>
                    </h2>
                    <p className="text-white/50 text-sm font-light">
                      Join the waitlist to be the first to know when we announce the next Hackathome.
                    </p>
                  </div>
                )}

                {/* Progress */}
                <div className="flex gap-2 mb-12">
                  {steps.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        i <= currentStep ? "bg-white" : "bg-white/20"
                      }`}
                    />
                  ))}
                </div>

                {/* Question */}
                <div className="mb-8">
                  <span className="text-white/40 text-sm mb-2 block">
                    {currentStep + 1} →
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-8">
                    {steps[currentStep].label}
                  </h2>
                  <input
                    ref={inputRef}
                    type={steps[currentStep].type}
                    placeholder={steps[currentStep].placeholder}
                    value={formData[steps[currentStep].key as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({ ...formData, [steps[currentStep].key]: e.target.value })
                    }
                    onKeyDown={handleKeyDown}
                    className="w-full text-2xl md:text-3xl font-light bg-transparent border-b-2 border-white/20 focus:border-white outline-none pb-4 text-white placeholder:text-white/30 transition-colors"
                  />
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleNext}
                    disabled={!canProceed() || submitting}
                    className={`px-8 py-3 rounded-full text-sm font-normal transition-all duration-200 ${
                      canProceed() && !submitting
                        ? "bg-white text-black hover:bg-white/90 cursor-pointer"
                        : "bg-white/10 text-white/30 cursor-not-allowed"
                    }`}
                  >
                    {submitting ? "Submitting..." : currentStep === steps.length - 1 ? "Join Waitlist" : "Continue"}
                  </button>
                  <span className="text-white/40 text-sm">
                    press <kbd className="px-2 py-1 bg-white/10 rounded text-xs">Enter ↵</kbd>
                  </span>
                </div>

                {error && (
                  <p className="mt-4 text-red-400 text-sm">{error}</p>
                )}

                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="mt-8 text-white/40 text-sm hover:text-white/60 transition-colors"
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
