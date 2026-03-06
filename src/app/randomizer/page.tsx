"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ADJECTIVES = [
  "cosmic", "neon", "shadow", "crystal", "quantum", "turbo", "hyper",
  "cyber", "phantom", "solar", "lunar", "arctic", "blazing", "iron",
  "golden", "silent", "rapid", "atomic", "velvet", "chrome", "ember",
  "frost", "storm", "void", "prism", "rogue", "noble", "vivid",
  "savage", "mystic", "bold", "fierce", "swift", "dark", "bright",
];

const NOUNS = [
  "falcon", "tiger", "phoenix", "dragon", "wolf", "cobra", "hawk",
  "panther", "viper", "eagle", "lion", "shark", "raven", "fox",
  "bear", "lynx", "puma", "orca", "mantis", "jaguar", "stallion",
  "hornet", "raptor", "sphinx", "kraken", "hydra", "titan", "pulse",
  "byte", "node", "spark", "forge", "blade", "drift", "orbit",
];

const TEAM_COLORS = [
  "oklch(0.65 0.15 30)",   // warm red
  "oklch(0.65 0.15 60)",   // amber
  "oklch(0.65 0.15 150)",  // teal
  "oklch(0.65 0.15 200)",  // blue
  "oklch(0.65 0.15 270)",  // purple
  "oklch(0.65 0.15 330)",  // pink
  "oklch(0.65 0.15 120)",  // green
  "oklch(0.65 0.15 180)",  // cyan
  "oklch(0.65 0.12 45)",   // peach
  "oklch(0.65 0.12 290)",  // lavender
];

interface Team {
  name: string;
  members: string[];
  table: number | null;
  color: string;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateTeamName(usedNames: Set<string>): string {
  let name: string;
  let attempts = 0;
  do {
    name = `${pickRandom(ADJECTIVES)}-${pickRandom(NOUNS)}`;
    attempts++;
  } while (usedNames.has(name) && attempts < 100);
  usedNames.add(name);
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

export default function RandomizerPage() {
  const [participants, setParticipants] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [hasRandomized, setHasRandomized] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const [tracks, setTracks] = useState("");
  const [trackCount, setTrackCount] = useState(2);
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [trackAnimKey, setTrackAnimKey] = useState(0);

  const getParticipantList = useCallback(() => {
    return participants
      .split("\n")
      .map((name) => name.trim())
      .filter((name) => name.length > 0);
  }, [participants]);

  const randomizeTeams = () => {
    const names = getParticipantList();
    if (names.length === 0) return;

    const shuffled = shuffle(names);
    const usedNames = new Set<string>();
    const newTeams: Team[] = [];

    const shuffledColors = shuffle([...TEAM_COLORS]);
    const totalTeams = Math.ceil(shuffled.length / 3);
    const tableNumbers = shuffle(
      Array.from({ length: totalTeams }, (_, i) => i + 1)
    );

    for (let i = 0; i < shuffled.length; i += 3) {
      const members = shuffled.slice(i, i + 3);
      const teamIndex = Math.floor(i / 3);
      newTeams.push({
        name: generateTeamName(usedNames),
        members,
        table: tableNumbers[teamIndex],
        color: shuffledColors[teamIndex % shuffledColors.length],
      });
    }

    setTeams(newTeams);
    setHasRandomized(true);
    setAnimationKey((k) => k + 1);
  };

  const getTrackList = useCallback(() => {
    return tracks
      .split("\n")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
  }, [tracks]);

  const randomizeTracks = () => {
    const allTracks = getTrackList();
    if (allTracks.length === 0) return;
    const count = Math.min(trackCount, allTracks.length);
    const picked = shuffle(allTracks).slice(0, count);
    setSelectedTracks(picked);
    setTrackAnimKey((k) => k + 1);
  };

  const participantCount = getParticipantList().length;
  const teamCount = Math.ceil(participantCount / 3);
  const totalTracks = getTrackList().length;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* Header */}
      <header className="border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <a href="/" className="text-stone-400 text-sm hover:text-stone-600 transition-colors">
            &larr; Back to home
          </a>
          <h1 className="text-lg font-light tracking-tight">
            <span className="italic instrument">Team</span> Randomizer
          </h1>
          <div className="w-20" />
        </div>
      </header>

      {/* Track Randomizer */}
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12">
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl md:text-3xl font-light mb-2">
                Pick <span className="italic instrument">tracks</span>
              </h2>
              <p className="text-stone-400 text-sm font-light">
                One track per line. Choose how many to randomly select.
              </p>
            </div>

            <textarea
              value={tracks}
              onChange={(e) => setTracks(e.target.value)}
              placeholder={"AI Agents\nClimate Tech\nFintech\nHealthcare\nEducation"}
              rows={6}
              className="w-full bg-white border border-stone-200 rounded-xl px-5 py-4 text-sm font-light text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-400 resize-none transition-colors font-mono"
            />

            <div className="flex items-center gap-3">
              <label className="text-sm text-stone-500 font-light whitespace-nowrap">
                Pick
              </label>
              <input
                type="number"
                min={1}
                max={Math.max(1, totalTracks)}
                value={trackCount}
                onChange={(e) => setTrackCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm text-center font-mono text-stone-900 focus:outline-none focus:border-stone-400 transition-colors"
              />
              <span className="text-sm text-stone-500 font-light">
                of {totalTracks} track{totalTracks !== 1 && "s"}
              </span>
            </div>

            <button
              onClick={randomizeTracks}
              disabled={totalTracks === 0}
              className={`w-full py-3.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                totalTracks > 0
                  ? "bg-stone-900 text-white hover:bg-stone-800 active:scale-[0.98]"
                  : "bg-stone-200 text-stone-400 cursor-not-allowed"
              }`}
            >
              Randomize Tracks
            </button>
          </div>

          <div className="flex items-center">
            <AnimatePresence mode="wait">
              {selectedTracks.length === 0 ? (
                <motion.div
                  key="empty-tracks"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex items-center justify-center min-h-[200px]"
                >
                  <p className="text-stone-300 text-sm font-light">
                    Add tracks and hit randomize
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={trackAnimKey}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full"
                >
                  <h3 className="text-stone-400 text-xs font-medium uppercase tracking-widest mb-4">
                    Selected Track{selectedTracks.length !== 1 && "s"}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedTracks.map((track, i) => (
                      <motion.div
                        key={track}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.3 }}
                        className="bg-white border border-stone-200 rounded-xl px-6 py-4 shadow-sm"
                      >
                        <span className="text-xl font-light instrument italic text-stone-800">
                          {track}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-stone-200" />
      </div>

      {/* Team Randomizer */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12">
          {/* Left Panel - Input */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-light mb-2">
                Add <span className="italic instrument">participants</span>
              </h2>
              <p className="text-stone-400 text-sm font-light">
                One name per line. Teams of max 3.
              </p>
            </div>

            <div className="relative">
              <textarea
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
                placeholder={"Alice\nBob\nCharlie\nDiana\nEve\nFrank"}
                rows={14}
                className="w-full bg-white border border-stone-200 rounded-xl px-5 py-4 text-sm font-light text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-400 resize-none transition-colors font-mono"
              />
              {participantCount > 0 && (
                <div className="absolute bottom-3 right-3 text-[11px] text-stone-400 font-mono">
                  {participantCount} participant{participantCount !== 1 && "s"} &rarr; {teamCount} team{teamCount !== 1 && "s"}
                </div>
              )}
            </div>

            <button
              onClick={randomizeTeams}
              disabled={participantCount === 0}
              className={`w-full py-3.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                participantCount > 0
                  ? "bg-stone-900 text-white hover:bg-stone-800 active:scale-[0.98]"
                  : "bg-stone-200 text-stone-400 cursor-not-allowed"
              }`}
            >
              Randomize
            </button>

            {hasRandomized && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-stone-400 text-xs font-light text-center"
              >
                Click again to re-shuffle
              </motion.p>
            )}
          </div>

          {/* Right Panel - Results */}
          <div>
            <AnimatePresence mode="wait">
              {teams.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex items-center justify-center min-h-[400px]"
                >
                  <div className="text-center">
                    <div className="text-6xl mb-6 opacity-20">🎲</div>
                    <p className="text-stone-300 text-sm font-light">
                      Add participants and hit randomize
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={animationKey}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-stone-400 text-xs font-medium uppercase tracking-widest">
                      {teams.length} Team{teams.length !== 1 && "s"} &middot; Tables assigned
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[...teams].sort((a, b) => (a.table ?? 0) - (b.table ?? 0)).map((team, i) => (
                      <motion.div
                        key={team.name}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.35 }}
                        className="group relative bg-white border border-stone-200 rounded-xl p-5 hover:border-stone-300 transition-all duration-300 shadow-sm"
                      >
                        <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center">
                          <span className="text-xs font-mono font-semibold text-stone-500">
                            {team.table}
                          </span>
                        </div>

                        <div className="mb-3">
                          <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-1 font-medium">
                            Table {team.table}
                          </p>
                          <h4
                            className="text-2xl font-light tracking-tight instrument italic"
                            style={{ color: team.color }}
                          >
                            {team.name}
                          </h4>
                        </div>

                        <div className="space-y-1.5">
                          {team.members.map((member) => (
                            <div
                              key={member}
                              className="flex items-center gap-2.5"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-stone-300" />
                              <span className="text-sm font-light text-stone-600">
                                {member}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
