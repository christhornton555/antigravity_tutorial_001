"use client";

import { useState } from "react";

interface Flight {
  flightNumber: string;
  startTime: string;
  endTime: string;
  startLocation: string;
  endLocation: string;
  timeZone: string;
}

// Mock Data
const MOCK_FLIGHTS: Record<string, Flight> = {
  "AA123": {
    flightNumber: "AA123",
    startTime: "2023-11-20T08:00:00",
    endTime: "2023-11-20T11:30:00",
    startLocation: "JFK - New York",
    endLocation: "LHR - London",
    timeZone: "EST/GMT",
  },
  "BA456": {
    flightNumber: "BA456",
    startTime: "2023-11-21T14:00:00",
    endTime: "2023-11-21T16:45:00",
    startLocation: "LHR - London",
    endLocation: "CDG - Paris",
    timeZone: "GMT/CET",
  },
  "DL789": {
    flightNumber: "DL789",
    startTime: "2023-11-22T09:15:00",
    endTime: "2023-11-22T12:30:00",
    startLocation: "LAX - Los Angeles",
    endLocation: "JFK - New York",
    timeZone: "PST/EST",
  },
};

export default function FlightSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Flight | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    // Simulate API delay
    setTimeout(() => {
      const flight = MOCK_FLIGHTS[query.toUpperCase()];
      if (flight) {
        setResult(flight);
      } else {
        setError("Flight not found. Try AA123, BA456, or DL789.");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Flight Lookup</h2>
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label htmlFor="flightNumber" className="block text-sm font-medium text-gray-200 mb-1">
            Flight Number
          </label>
          <input
            type="text"
            id="flightNumber"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., AA123"
            className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !query}
          className="w-full py-3 px-4 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg transform transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Searching..." : "Find Flight"}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200 text-center animate-fade-in">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 p-6 bg-black/30 rounded-xl border border-white/10 animate-fade-in">
          <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
            <span className="text-2xl font-bold text-sky-400">{result.flightNumber}</span>
            <span className="text-xs font-mono text-gray-400 bg-white/5 px-2 py-1 rounded">{result.timeZone}</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Departure</p>
                <p className="text-lg font-semibold text-white">{new Date(result.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                <p className="text-sm text-gray-300">{result.startLocation}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Arrival</p>
                <p className="text-lg font-semibold text-white">{new Date(result.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                <p className="text-sm text-gray-300">{result.endLocation}</p>
              </div>
            </div>
            
            <div className="pt-2 flex items-center justify-center text-gray-500 text-xs">
              <div className="h-px bg-gray-600 w-full mr-2"></div>
              <span>✈</span>
              <div className="h-px bg-gray-600 w-full ml-2"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
