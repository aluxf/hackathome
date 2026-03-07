"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShaderBackground } from "@/components/ui/shaders-hero-section";

/* ───────────────────── Team randomizer logic ───────────────────── */

const ADJECTIVES = [
  "cosmic","neon","shadow","crystal","quantum","turbo","hyper","cyber",
  "phantom","solar","lunar","arctic","blazing","iron","golden","silent",
  "rapid","atomic","velvet","chrome","ember","frost","storm","void",
  "prism","rogue","noble","vivid","savage","mystic","bold","fierce",
];
const NOUNS = [
  "falcon","tiger","phoenix","dragon","wolf","cobra","hawk","panther",
  "viper","eagle","lion","shark","raven","fox","bear","lynx","puma",
  "orca","mantis","jaguar","stallion","hornet","raptor","sphinx",
  "kraken","hydra","titan","pulse","byte","node","spark","forge",
];
const TEAM_COLORS = [
  "oklch(0.75 0.15 30)","oklch(0.75 0.15 60)","oklch(0.75 0.15 150)",
  "oklch(0.75 0.15 200)","oklch(0.75 0.15 270)","oklch(0.75 0.15 330)",
  "oklch(0.75 0.15 120)","oklch(0.75 0.15 180)","oklch(0.75 0.12 45)",
  "oklch(0.75 0.12 290)",
];

interface Team {
  name: string;
  members: string[];
  table: number;
  color: string;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function generateTeamName(used: Set<string>): string {
  let name: string;
  let attempts = 0;
  do {
    name = `${pickRandom(ADJECTIVES)}-${pickRandom(NOUNS)}`;
    attempts++;
  } while (used.has(name) && attempts < 100);
  used.add(name);
  return name;
}
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const DEFAULT_PARTICIPANTS = ``;

const DEFAULT_TRACKS_TEXT = ``;

/* ───────────────────── Slide components ───────────────────── */

function SlideHero() {
  return (
    <ShaderBackground>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 -mt-12">
        <h1 className="text-7xl md:text-9xl tracking-tight mb-6 leading-tight text-white">
          <span className="font-medium italic instrument">Stockholm&apos;s</span>{" "}
          <span className="font-light">First</span>
          <br />
          <span className="font-light tracking-tight">{"{ Hackathome }"}</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/50 font-light max-w-xl drop-shadow-md">
          24 builders. 10 hours. One apartment.
          <br />
          Saturday, March 7th
        </p>
      </div>
    </ShaderBackground>
  );
}

function SlideSpawned() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <img src="/spawned-logo.png" alt="Spawned" className="h-16 md:h-20 mb-8 invert ml-[64px]" />
      <p className="text-xl md:text-2xl text-white/50 font-light max-w-lg">
        Agentic cloud infrastructure
      </p>
      <p className="text-lg text-white/30 font-light mt-2">spawned.ai</p>
    </div>
  );
}

function SlideAgreo() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <div className="h-20 md:h-28 mb-8 overflow-hidden flex items-center">
        <img src="/agreo-logo.svg" alt="Agreo" className="h-48 md:h-64" />
      </div>
      <p className="text-xl md:text-2xl text-white/50 font-light max-w-lg">
        Swish for loans. Simple, secure peer-to-peer lending.
      </p>
      <p className="text-lg text-white/30 font-light mt-2">agreo.se</p>
    </div>
  );
}

function SlideIcebreaker() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <img src="/icebreaker-logo.png" alt="Icebreaker" className="h-16 md:h-24 mb-8 invert" />
      <p className="text-xl md:text-2xl text-white/50 font-light max-w-lg">
        Idea-stage VC - tickets up to &euro;1.5M
      </p>
      <p className="text-lg text-white/30 font-light mt-2">icebreaker.vc</p>
    </div>
  );
}

function SlideTimetable() {
  const schedule = [
    { time: "11:15", event: "Hack" },
    { time: "13:00", event: "Lunch @ Professorn" },
    { time: "14:00", event: "Hack" },
    { time: "18:00", event: "Pokebowls" },
    { time: "21:00", event: "Presentations" },
    { time: "?", event: "Wrap up + fika ai short talk" },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full px-8">
      <h2 className="text-5xl md:text-7xl font-light mb-12 text-center text-white">
        <span className="italic instrument">Timetable</span>
      </h2>
      <div className="w-full max-w-lg space-y-0">
        {schedule.map((item, i) => (
          <motion.div
            key={item.time}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-6 py-4 border-b border-white/10 last:border-0"
          >
            <span className="text-lg md:text-xl font-mono text-white/40 w-24 text-right shrink-0">
              {item.time}
            </span>
            <span className="text-xl md:text-2xl font-light text-white">{item.event}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideJudges() {
  const judges = [
    { name: "Bjarni Bjarnason", role: "Founding Engineer @ Vesence", img: "/judge-bjarni.jpeg" },
    { name: "Oslo Agbonkhese", role: "Cloud Solution Architect @ Microsoft", img: "/judge-oslo.jpeg" },
    { name: "Jesse Tinell", role: "Partner @ Icebreaker.vc", img: "/judge-jesse.jpeg" },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full px-8">
      <h2 className="text-5xl md:text-7xl font-light mb-14 text-center text-white">
        <span className="italic instrument">Judges</span>
      </h2>
      <div className="grid grid-cols-3 gap-10 md:gap-16">
        {judges.map((j, i) => (
          <motion.div
            key={j.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="text-center"
          >
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-white/10 border border-white/10 mx-auto mb-5 overflow-hidden">
              <img src={j.img} alt={j.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl md:text-2xl font-medium mb-1 text-white">{j.name}</h3>
            <p className="text-white/50 font-light">{j.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideCriteria() {
  const criteria = [
    "Originality",
    "Design & UX",
    "Launch readiness",
    "Presentation",
    "Startup potential",
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full px-8">
      <h2 className="text-5xl md:text-7xl font-light mb-14 text-center text-white">
        <span className="italic instrument">Judging Criteria</span>
      </h2>
      <div className="space-y-0 w-full max-w-md">
        {criteria.map((c, i) => (
          <motion.div
            key={c}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
            className="flex items-center gap-5 py-4 border-b border-white/10 last:border-0"
          >
            <span className="text-2xl md:text-3xl font-mono text-white/20 w-10 text-right">
              {i + 1}
            </span>
            <span className="text-2xl md:text-3xl font-light text-white">{c}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideOpportunityBoard() {
  const opportunities = [
    {
      name: "fika ai",
      description: "AI native talent marketplace",
      seeking: ["AI Engineer", "Backend Developer", "Fullstack Developer"],
      logo: (
        <div className="w-24 h-24 flex items-center justify-center mb-4">
          <img src="/fika-ai-logo.png" alt="fika ai" className="h-20 rounded-2xl" />
        </div>
      ),
    },
    {
      name: "Velia",
      description: "Legora for real-estate",
      seeking: ["CTO & Co-founder"],
      logo: (
        <div className="w-24 h-24 flex items-center justify-center mb-4">
          <img src="/velia-logo.png" alt="Velia" className="h-20 rounded-2xl" />
        </div>
      ),
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full px-8">
      <h2 className="text-5xl md:text-7xl font-light mb-14 text-center text-white">
        <span className="italic instrument">Opportunity</span> Board
      </h2>
      <div className="grid grid-cols-2 gap-16 max-w-2xl">
        {opportunities.map((opp, i) => (
          <motion.div
            key={opp.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="text-center"
          >
            <div className="flex justify-center">{opp.logo}</div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-2 text-white">{opp.name}</h3>
            <p className="text-lg md:text-xl text-white/50 mb-5">{opp.description}</p>
            <p className="text-xl md:text-2xl font-semibold italic instrument mb-3 text-white/80">Seeking</p>
            {opp.seeking.map((role) => (
              <p key={role} className="text-lg md:text-xl text-white/60">{role}</p>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideSpawnedCredits() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8">
      <h2 className="text-5xl md:text-7xl font-light mb-12 text-white">
        <span className="italic instrument">Resources</span>
      </h2>

      <div className="flex items-center gap-4 mb-8">
        <img src="/spawned-logo.png" alt="Spawned" className="h-12 invert ml-[64px]" />
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 mb-8">
        <p className="text-lg text-white/40 font-light mb-1">WiFi</p>
        <p className="text-2xl font-mono text-white">TP-Link_1CA3_5G</p>
        <p className="text-xl font-mono text-white/60 mt-1">pass: 36701209</p>
      </div>

      <p className="text-xl md:text-2xl text-white/50 font-light mb-6">$20 grant codes (2x):</p>

      <div className="flex gap-6 mb-10">
        <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4">
          <code className="text-2xl md:text-3xl font-mono text-white">4WGLCL8I</code>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4">
          <code className="text-2xl md:text-3xl font-mono text-white">YHD70ZXI</code>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="bg-white rounded-xl p-3">
          <img src="/spawned-qr.png" alt="QR code" className="w-36 h-36" />
        </div>
        <p className="font-mono text-lg text-white/40 mt-4">discord - support</p>
      </div>
    </div>
  );
}

interface RandomizerState {
  participants: string;
  setParticipants: (v: string) => void;
  tracksInput: string;
  setTracksInput: (v: string) => void;
  teams: Team[];
  setTeams: (v: Team[]) => void;
  selectedTracks: string[];
  setSelectedTracks: (v: string[]) => void;
  trackCount: number;
  setTrackCount: (v: number) => void;
  animKey: number;
  setAnimKey: (fn: (k: number) => number) => void;
}

function SlideRandomizer({ state }: { state: RandomizerState }) {
  const {
    participants, setParticipants, tracksInput, setTracksInput,
    teams, setTeams, selectedTracks, setSelectedTracks,
    trackCount, setTrackCount, animKey, setAnimKey,
  } = state;
  const [showInputs, setShowInputs] = useState(false);

  const getNames = () => participants.split("\n").map((n) => n.trim()).filter(Boolean);
  const getTracks = () => tracksInput.split("\n").map((t) => t.trim()).filter(Boolean);

  const randomizeAll = () => {
    const allTracks = getTracks();
    const picked = shuffle(allTracks).slice(0, Math.min(trackCount, allTracks.length));
    setSelectedTracks(picked);

    const names = getNames();
    const shuffled = shuffle(names);
    const usedNames = new Set<string>();
    const shuffledColors = shuffle([...TEAM_COLORS]);
    const totalTeams = Math.ceil(shuffled.length / 3);
    const tableNumbers = shuffle(Array.from({ length: totalTeams }, (_, i) => i + 1));
    const newTeams: Team[] = [];
    for (let i = 0; i < shuffled.length; i += 3) {
      const members = shuffled.slice(i, i + 3);
      const idx = Math.floor(i / 3);
      newTeams.push({
        name: generateTeamName(usedNames),
        members,
        table: tableNumbers[idx],
        color: shuffledColors[idx % shuffledColors.length],
      });
    }
    setTeams(newTeams);
    setAnimKey((k) => k + 1);
  };

  return (
    <div className="flex flex-col h-full px-8 py-8 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-5xl md:text-6xl font-light text-white">
          <span className="italic instrument">Teams</span> & Tracks
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowInputs(!showInputs)}
            className="px-5 py-2.5 rounded-xl text-base font-medium bg-white/10 text-white/70 hover:bg-white/15 border border-white/10 transition-all cursor-pointer"
          >
            {showInputs ? "Hide inputs" : "Edit inputs"}
          </button>
          <label className="text-base text-white/40 font-light">Tracks:</label>
          <input
            type="number"
            min={1}
            max={getTracks().length || 1}
            value={trackCount}
            onChange={(e) => setTrackCount(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-base text-center font-mono text-white focus:outline-none focus:border-white/25"
          />
          <button
            onClick={randomizeAll}
            disabled={getNames().length === 0}
            className="px-8 py-3 rounded-xl text-base font-medium bg-white text-stone-900 hover:bg-white/90 active:scale-[0.98] transition-all cursor-pointer"
          >
            Randomize
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showInputs && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden mb-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-white/30 uppercase tracking-widest font-medium mb-2 block">
                  Participants (one per line)
                </label>
                <textarea
                  value={participants}
                  onChange={(e) => setParticipants(e.target.value)}
                  rows={8}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-light text-white placeholder:text-white/20 focus:outline-none focus:border-white/25 resize-none font-mono"
                />
              </div>
              <div>
                <label className="text-xs text-white/30 uppercase tracking-widest font-medium mb-2 block">
                  Tracks (one per line)
                </label>
                <textarea
                  value={tracksInput}
                  onChange={(e) => setTracksInput(e.target.value)}
                  rows={8}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-light text-white placeholder:text-white/20 focus:outline-none focus:border-white/25 resize-none font-mono"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedTracks.length > 0 && (
        <motion.div
          key={`tracks-${animKey}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <h3 className="text-white/30 text-sm font-medium uppercase tracking-widest mb-4">
            Selected Tracks
          </h3>
          <div className="flex flex-wrap gap-4">
            {selectedTracks.map((track, i) => (
              <motion.span
                key={track}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/5 border border-white/10 rounded-lg px-5 py-3 text-2xl font-light instrument italic text-white/90"
              >
                {track}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      {teams.length > 0 && (
        <motion.div
          key={`teams-${animKey}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1"
        >
          <h3 className="text-white/30 text-sm font-medium uppercase tracking-widest mb-4">
            {teams.length} Teams &middot; Tables assigned
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...teams].sort((a, b) => a.table - b.table).map((team, i) => (
              <motion.div
                key={team.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 relative"
              >
                <div className="absolute top-4 right-4 w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center">
                  <span className="text-base font-mono font-semibold text-white/50">{team.table}</span>
                </div>
                <p className="text-sm text-white/25 uppercase tracking-widest mb-1 font-medium">
                  Table {team.table}
                </p>
                <h4
                  className="text-4xl font-light tracking-tight instrument italic mb-3"
                  style={{ color: team.color }}
                >
                  {team.name}
                </h4>
                <div className="space-y-2">
                  {team.members.map((m) => (
                    <div key={m} className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                      <span className="text-xl font-light text-white/60">{m}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {teams.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-white/20 text-2xl font-light">
            Hit Randomize to generate teams & tracks
          </p>
        </div>
      )}
    </div>
  );
}

/* ───────────────────── Main Slideshow ───────────────────── */

const SLIDES = [
  { id: "hero", label: "Hackathome", component: SlideHero },
  { id: "spawned", label: "Spawned", component: SlideSpawned },
  { id: "agreo", label: "Agreo", component: SlideAgreo },
  { id: "icebreaker", label: "Icebreaker", component: SlideIcebreaker },
  { id: "timetable", label: "Timetable", component: SlideTimetable },
  { id: "judges", label: "Judges", component: SlideJudges },
  { id: "criteria", label: "Criteria", component: SlideCriteria },
  { id: "opportunity", label: "Opportunity Board", component: SlideOpportunityBoard },
  { id: "resources", label: "Resources", component: SlideSpawnedCredits },
  { id: "randomizer", label: "Randomizer" },
];

const RANDOMIZER_INDEX = SLIDES.length - 1;

export default function IntroPage() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showFooter, setShowFooter] = useState(true);

  // Lifted randomizer state
  const [participants, setParticipants] = useState(DEFAULT_PARTICIPANTS);
  const [tracksInput, setTracksInput] = useState(DEFAULT_TRACKS_TEXT);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [trackCount, setTrackCount] = useState(2);
  const [animKey, setAnimKey] = useState(0);

  const randomizerState: RandomizerState = {
    participants, setParticipants, tracksInput, setTracksInput,
    teams, setTeams, selectedTracks, setSelectedTracks,
    trackCount, setTrackCount, animKey, setAnimKey,
  };

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= SLIDES.length || index === current) return;
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
      if (e.key === "f") {
        setShowFooter((v) => !v);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  const slide = SLIDES[current];
  const SlideComponent = "component" in slide ? slide.component : null;

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div className="h-screen w-screen bg-stone-900 text-white flex flex-col overflow-hidden select-none">
      {/* Slide area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Randomizer rendered persistently, hidden when not active */}
        <div className={`absolute inset-0 ${current === RANDOMIZER_INDEX ? "" : "pointer-events-none invisible"}`}>
          <SlideRandomizer state={randomizerState} />
        </div>

        {current !== RANDOMIZER_INDEX && (
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {SlideComponent && <SlideComponent />}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Bottom bar */}
      {showFooter && <div className="border-t border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                i === current
                  ? "bg-white w-6"
                  : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <span className="text-xs text-white/30 font-mono">
          {current + 1} / {SLIDES.length}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            disabled={current === 0}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer ${
              current === 0
                ? "text-white/20 cursor-not-allowed"
                : "text-white/60 hover:bg-white/10"
            }`}
          >
            &larr;
          </button>
          <button
            onClick={next}
            disabled={current === SLIDES.length - 1}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer ${
              current === SLIDES.length - 1
                ? "text-white/20 cursor-not-allowed"
                : "text-white/60 hover:bg-white/10"
            }`}
          >
            &rarr;
          </button>
        </div>
      </div>}
    </div>
  );
}
