/**
 * @fileOverview Regional pricing data for electrical services in the top 50 US cities.
 * Multipliers are based on cost of labor, living, and local market demand indices.
 */

export interface CityPricing {
  city: string;
  state: string;
  multiplier: number;
}

export const TOP_50_CITIES_PRICING: CityPricing[] = [
  { city: "New York", state: "NY", multiplier: 1.35 },
  { city: "Los Angeles", state: "CA", multiplier: 1.28 },
  { city: "Chicago", state: "IL", multiplier: 1.12 },
  { city: "Houston", state: "TX", multiplier: 0.92 },
  { city: "Phoenix", state: "AZ", multiplier: 0.95 },
  { city: "Philadelphia", state: "PA", multiplier: 1.08 },
  { city: "San Antonio", state: "TX", multiplier: 0.88 },
  { city: "San Diego", state: "CA", multiplier: 1.22 },
  { city: "Dallas", state: "TX", multiplier: 0.94 },
  { city: "San Jose", state: "CA", multiplier: 1.45 },
  { city: "Austin", state: "TX", multiplier: 1.15 },
  { city: "Jacksonville", state: "FL", multiplier: 0.90 },
  { city: "Fort Worth", state: "TX", multiplier: 0.92 },
  { city: "Columbus", state: "OH", multiplier: 0.98 },
  { city: "Indianapolis", state: "IN", multiplier: 0.94 },
  { city: "Charlotte", state: "NC", multiplier: 1.02 },
  { city: "San Francisco", state: "CA", multiplier: 1.55 },
  { city: "Seattle", state: "WA", multiplier: 1.32 },
  { city: "Denver", state: "CO", multiplier: 1.18 },
  { city: "Washington", state: "DC", multiplier: 1.30 },
  { city: "Boston", state: "MA", multiplier: 1.38 },
  { city: "El Paso", state: "TX", multiplier: 0.82 },
  { city: "Nashville", state: "TN", multiplier: 1.08 },
  { city: "Detroit", state: "MI", multiplier: 0.96 },
  { city: "Oklahoma City", state: "OK", multiplier: 0.88 },
  { city: "Portland", state: "OR", multiplier: 1.20 },
  { city: "Las Vegas", state: "NV", multiplier: 1.05 },
  { city: "Memphis", state: "TN", multiplier: 0.86 },
  { city: "Louisville", state: "KY", multiplier: 0.92 },
  { city: "Baltimore", state: "MD", multiplier: 1.12 },
  { city: "Milwaukee", state: "WI", multiplier: 0.98 },
  { city: "Albuquerque", state: "NM", multiplier: 0.90 },
  { city: "Tucson", state: "AZ", multiplier: 0.92 },
  { city: "Fresno", state: "CA", multiplier: 1.05 },
  { city: "Sacramento", state: "CA", multiplier: 1.18 },
  { city: "Kansas City", state: "MO", multiplier: 1.02 },
  { city: "Mesa", state: "AZ", multiplier: 0.94 },
  { city: "Atlanta", state: "GA", multiplier: 1.15 },
  { city: "Omaha", state: "NE", multiplier: 0.94 },
  { city: "Colorado Springs", state: "CO", multiplier: 1.08 },
  { city: "Raleigh", state: "NC", multiplier: 1.08 },
  { city: "Virginia Beach", state: "VA", multiplier: 1.02 },
  { city: "Long Beach", state: "CA", multiplier: 1.22 },
  { city: "Miami", state: "FL", multiplier: 1.15 },
  { city: "Oakland", state: "CA", multiplier: 1.28 },
  { city: "Minneapolis", state: "MN", multiplier: 1.12 },
  { city: "Tulsa", state: "OK", multiplier: 0.88 },
  { city: "Bakersfield", state: "CA", multiplier: 0.98 },
  { city: "Tampa", state: "FL", multiplier: 1.05 },
  { city: "Wichita", state: "KS", multiplier: 0.88 }
];
