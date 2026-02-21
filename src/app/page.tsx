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
            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white mb-6 leading-tight">
              <span className="font-medium italic instrument">Stockholm&apos;s</span>{" "}
              <span className="font-light">First</span>
              <br />
              <span className="font-light tracking-tight">{"{ Hackathome }"}</span>
            </h1>

            {/* Event Details */}
            <p className="text-sm md:text-base text-white mb-8 font-light leading-relaxed max-w-md mx-auto drop-shadow-md">
              Yes, it&apos;s literally in our apartment. 24 builders, 10 hours. Saturday, March 7th in Stockholm.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center justify-center gap-4">
              <button
                className="px-8 py-3 rounded-full bg-stone-900 text-white font-normal text-sm transition-all duration-200 hover:bg-stone-800 cursor-pointer"
                onClick={() => {
                  document
                    .getElementById("details")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Read More
              </button>
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
            </div>

            {/* Social Proof */}
            <p className="mt-8 text-white/90 text-xs font-light tracking-wide drop-shadow-md">
              Featuring engineers from Lovable, Microsoft, Netlight, Doktor.se and more
            </p>

            {/* Partners */}
            <div className="mt-12">
              <p className="text-white/50 text-xl md:text-2xl italic instrument font-medium mb-3">
                In partnership with
              </p>
              <div className="flex items-center justify-center gap-8 md:gap-12">
                <img
                  src="/spawned-logo.png"
                  alt="Spawned"
                  className="h-7 md:h-8 w-auto"
                />
                <img
                  src="/agreo-logo.svg"
                  alt="Agreo"
                  className="h-[6.1rem] md:h-[7.2rem] w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </ShaderBackground>

      {/* Event Details Section */}
      <section id="details" className="bg-stone-900 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-16 text-center">
            What to <span className="italic instrument">expect</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="text-center">
              <div className="text-4xl mb-4">🎲</div>
              <h3 className="text-lg font-medium mb-2">Randomized themes</h3>
              <p className="text-white/60 text-sm font-light">Each participant submits a theme when registering. On hack day, we randomize and everyone builds around the chosen theme.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-lg font-medium mb-2">In our apartment</h3>
              <p className="text-white/60 text-sm font-light">An extremely chill setting in Stockholm. 24 builders, good vibes, plenty of energy drinks and pizza.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🗳️</div>
              <h3 className="text-lg font-medium mb-2">Community voted</h3>
              <p className="text-white/60 text-sm font-light">No judges. After demos, everyone votes. The community decides who wins.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-20">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-3">Schedule</h3>
              <ul className="space-y-2 text-sm font-light">
                <li className="flex justify-between"><span>Doors open</span><span className="text-white/50">09:00</span></li>
                <li className="flex justify-between"><span>Theme reveal</span><span className="text-white/50">10:00</span></li>
                <li className="flex justify-between"><span>Lunch</span><span className="text-white/50">13:00</span></li>
                <li className="flex justify-between"><span>Demos &amp; voting</span><span className="text-white/50">20:00–22:00</span></li>
                <li className="flex justify-between"><span>Foosball &amp; chill</span><span className="text-white/50">22:00+</span></li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-3">Details</h3>
              <ul className="space-y-2 text-sm font-light">
                <li className="flex justify-between"><span>Location</span><span className="text-white/50">Stockholm</span></li>
                <li className="flex justify-between"><span>Capacity</span><span className="text-white/50">24 builders</span></li>
                <li className="flex justify-between"><span>Cost</span><span className="text-white/50">Free</span></li>
                <li className="flex justify-between"><span>Food &amp; drinks</span><span className="text-white/50">Included</span></li>
                <li className="flex justify-between"><span>Teams</span><span className="text-white/50">Groups of 3</span></li>
              </ul>
            </div>
          </div>

          {/* Hosts */}
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-light mb-10">
              Your <span className="italic instrument">hosts</span>
            </h3>
            <div className="flex items-center justify-center gap-12 md:gap-20">
              <a href="#" target="_blank" rel="noopener noreferrer" className="group text-center">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white/10 border border-white/10 mx-auto mb-3 overflow-hidden group-hover:border-white/30 transition-colors">
                  <img src="/alex.jpeg" alt="Alex" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <p className="text-sm font-medium">Alex</p>
                  <svg className="w-2.5 h-2.5 text-white/20 group-hover:text-white/50 transition-colors" viewBox="0 0 20 18" fill="currentColor"><path d="M2.4 0C1.07 0 0 1.07 0 2.4c0 1.33 1.07 2.4 2.4 2.4 1.33 0 2.4-1.07 2.4-2.4C4.8 1.07 3.73 0 2.4 0zM.34 6.14h4.13V18H.34V6.14zM14.77 5.82c-2.28 0-3.63 1.25-4.13 2.1h-.06V6.14H6.72V18h4.13v-5.86c0-1.55.29-3.04 2.2-3.04 1.89 0 1.91 1.76 1.91 3.14V18H19v-6.42c0-3.19-.69-5.76-4.23-5.76z"/></svg>
                </div>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="group text-center">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white/10 border border-white/10 mx-auto mb-3 overflow-hidden group-hover:border-white/30 transition-colors">
                  <img src="/cohost.jpeg" alt="Jonas" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <p className="text-sm font-medium">Jonas</p>
                  <svg className="w-2.5 h-2.5 text-white/20 group-hover:text-white/50 transition-colors" viewBox="0 0 20 18" fill="currentColor"><path d="M2.4 0C1.07 0 0 1.07 0 2.4c0 1.33 1.07 2.4 2.4 2.4 1.33 0 2.4-1.07 2.4-2.4C4.8 1.07 3.73 0 2.4 0zM.34 6.14h4.13V18H.34V6.14zM14.77 5.82c-2.28 0-3.63 1.25-4.13 2.1h-.06V6.14H6.72V18h4.13v-5.86c0-1.55.29-3.04 2.2-3.04 1.89 0 1.91 1.76 1.91 3.14V18H19v-6.42c0-3.19-.69-5.76-4.23-5.76z"/></svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

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
