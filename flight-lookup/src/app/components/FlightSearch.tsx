"use client";

import { useState } from "react";
import { searchFlights } from "../actions/flight-actions";
import { FlightData } from "../types/aviation-stack";

export default function FlightSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<FlightData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await searchFlights(query);
      if (response.success && response.data) {
        setResult(response.data);
      } else {
        setError(response.error || "Flight not found.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Flight Lookup</h2>
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label htmlFor="flightNumber" className="block text-sm font-medium text-gray-200 mb-1">
            Flight Number (IATA)
          </label>
          <input
            type="text"
            id="flightNumber"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., AA100"
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
            <div>
              <span className="text-2xl font-bold text-sky-400 block">{result.flight.iata}</span>
              <span className="text-xs text-gray-400">{result.airline.name}</span>
            </div>
            <span className={`text-xs font-mono px-2 py-1 rounded ${result.flight_status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-400'}`}>
              {result.flight_status.toUpperCase()}
            </span>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Departure</p>
                <p className="text-3xl font-bold text-white my-1">{result.departure.iata}</p>
                <p className="text-sm text-gray-300 truncate max-w-[120px]">{result.departure.airport}</p>
                <p className="text-xs text-sky-300 mt-1">
                  {new Date(result.departure.scheduled).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              <div className="flex flex-col items-center justify-center px-4 mt-2">
                <span className="text-2xl">✈</span>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent w-16 mt-1"></div>
              </div>

              <div className="flex-1 text-right">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Arrival</p>
                <p className="text-3xl font-bold text-white my-1">{result.arrival.iata}</p>
                <p className="text-sm text-gray-300 truncate max-w-[120px] ml-auto">{result.arrival.airport}</p>
                <p className="text-xs text-sky-300 mt-1">
                  {new Date(result.arrival.scheduled).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div>
                <p className="text-xs text-gray-500">Date</p>
                <p className="text-sm text-gray-300">{result.flight_date}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Terminal / Gate</p>
                <p className="text-sm text-gray-300">
                  {result.departure.terminal || '-'} / {result.departure.gate || '-'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
