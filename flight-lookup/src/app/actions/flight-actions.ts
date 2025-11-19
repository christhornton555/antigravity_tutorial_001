"use server";

import { AviationStackResponse, FlightData } from "../types/aviation-stack";

const API_KEY = "7b1651e583775dc13cfc2e1cd85b6710";
const API_URL = "http://api.aviationstack.com/v1/flights";

export async function searchFlights(flightIata: string): Promise<{ success: boolean; data?: FlightData; error?: string }> {
    if (!flightIata) {
        return { success: false, error: "Please enter a flight number." };
    }

    try {
        const response = await fetch(`${API_URL}?access_key=${API_KEY}&flight_iata=${flightIata}&limit=1`, {
            next: { revalidate: 60 }, // Cache for 60 seconds
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const result: AviationStackResponse = await response.json();

        if (!result.data || result.data.length === 0) {
            return { success: false, error: "Flight not found." };
        }

        // Return the most recent/relevant flight
        return { success: true, data: result.data[0] };

    } catch (error) {
        console.error("Flight search error:", error);
        return { success: false, error: "Failed to fetch flight data. Please try again." };
    }
}
