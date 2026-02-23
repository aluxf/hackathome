"use client";

import { useState } from "react";

type Application = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  linkedin: string;
  theme_suggestion: string;
  team_name: string | null;
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [search, setSearch] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");

    const res = await fetch("/api/admin/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setLoginError(data.error || "Invalid credentials");
      return;
    }

    setApplications(data.applications || []);
    setAuthenticated(true);
  };

  const filtered = applications.filter((app) => {
    const q = search.toLowerCase();
    return (
      app.name.toLowerCase().includes(q) ||
      app.email.toLowerCase().includes(q) ||
      app.theme_suggestion.toLowerCase().includes(q) ||
      (app.team_name?.toLowerCase().includes(q) ?? false)
    );
  });

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
            <h1 className="text-2xl font-light text-stone-900 mb-1 text-center">
              <span className="italic instrument">Admin</span>
            </h1>
            <p className="text-stone-400 text-sm text-center mb-8">
              Hackathome Dashboard
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-400 transition-colors"
                  placeholder="Enter username"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-400 transition-colors"
                  placeholder="Enter password"
                />
              </div>
              {loginError && (
                <p className="text-red-500 text-xs">{loginError}</p>
              )}
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-stone-900 text-white text-sm font-normal hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Header */}
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-light text-stone-900">
              <span className="italic instrument">Hackathome</span>{" "}
              <span className="text-stone-400">Admin</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-stone-400">
              {applications.length} application{applications.length !== 1 ? "s" : ""}
            </span>
            <button
              onClick={() => setAuthenticated(false)}
              className="text-sm text-stone-500 hover:text-stone-700 transition-colors cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-6 h-6 border-2 border-stone-300 border-t-stone-600 rounded-full animate-spin" />
            <p className="mt-3 text-stone-400 text-sm">Loading applications...</p>
          </div>
        ) : fetchError ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 text-sm">{fetchError}</p>
          </div>
        ) : (
          <>
            {/* Search + Stats */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <input
                type="text"
                placeholder="Search by name, email, theme..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-stone-200 bg-white text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 transition-colors"
              />
              <div className="flex gap-3">
                <div className="bg-white border border-stone-200 rounded-lg px-4 py-2.5 text-center min-w-[100px]">
                  <p className="text-xs text-stone-400">Total</p>
                  <p className="text-lg font-medium text-stone-900">{applications.length}</p>
                </div>
                <div className="bg-white border border-stone-200 rounded-lg px-4 py-2.5 text-center min-w-[100px]">
                  <p className="text-xs text-stone-400">With Teams</p>
                  <p className="text-lg font-medium text-stone-900">
                    {applications.filter((a) => a.team_name).length}
                  </p>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-stone-100 bg-stone-50/50">
                      <th className="text-left px-4 py-3 font-medium text-stone-500 text-xs uppercase tracking-wider">
                        #
                      </th>
                      <th className="text-left px-4 py-3 font-medium text-stone-500 text-xs uppercase tracking-wider">
                        Name
                      </th>
                      <th className="text-left px-4 py-3 font-medium text-stone-500 text-xs uppercase tracking-wider">
                        Email
                      </th>
                      <th className="text-left px-4 py-3 font-medium text-stone-500 text-xs uppercase tracking-wider">
                        LinkedIn
                      </th>
                      <th className="text-left px-4 py-3 font-medium text-stone-500 text-xs uppercase tracking-wider">
                        Theme Suggestion
                      </th>
                      <th className="text-left px-4 py-3 font-medium text-stone-500 text-xs uppercase tracking-wider">
                        Team
                      </th>
                      <th className="text-left px-4 py-3 font-medium text-stone-500 text-xs uppercase tracking-wider">
                        Registered
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-12 text-stone-400">
                          {search ? "No matching applications" : "No applications yet"}
                        </td>
                      </tr>
                    ) : (
                      filtered.map((app, i) => (
                        <tr
                          key={app.id}
                          className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors"
                        >
                          <td className="px-4 py-3 text-stone-400">{i + 1}</td>
                          <td className="px-4 py-3 font-medium text-stone-900">
                            {app.name}
                          </td>
                          <td className="px-4 py-3 text-stone-600">{app.email}</td>
                          <td className="px-4 py-3">
                            <a
                              href={app.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                            >
                              Profile
                            </a>
                          </td>
                          <td className="px-4 py-3 text-stone-600">
                            {app.theme_suggestion}
                          </td>
                          <td className="px-4 py-3 text-stone-600">
                            {app.team_name || (
                              <span className="text-stone-300">-</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-stone-400 text-xs">
                            {new Date(app.created_at).toLocaleDateString("en-SE", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
