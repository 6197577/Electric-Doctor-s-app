
/**
 * @fileOverview Regional pricing data for electrical services.
 * Multipliers are based on cost of labor, living, and local market demand indices.
 */

export interface CityPricing {
  city: string;
  state: string;
  multiplier: number;
}

export const TOP_50_CITIES_PRICING: CityPricing[] = [
  { city: "Albuquerque", state: "NM", multiplier: 0.90 },
  { city: "Atlanta", state: "GA", multiplier: 1.15 },
  { city: "Austin", state: "TX", multiplier: 1.15 },
  { city: "Bakersfield", state: "CA", multiplier: 0.98 },
  { city: "Baltimore", state: "MD", multiplier: 1.12 },
  { city: "Beckley", state: "WV", multiplier: 0.80 },
  { city: "Boston", state: "MA", multiplier: 1.38 },
  { city: "Charleston", state: "WV", multiplier: 0.84 },
  { city: "Charlotte", state: "NC", multiplier: 1.02 },
  { city: "Chicago", state: "IL", multiplier: 1.12 },
  { city: "Clarksburg", state: "WV", multiplier: 0.82 },
  { city: "Colorado Springs", state: "CO", multiplier: 1.08 },
  { city: "Columbus", state: "OH", multiplier: 0.98 },
  { city: "Dallas", state: "TX", multiplier: 0.94 },
  { city: "Denver", state: "CO", multiplier: 1.18 },
  { city: "Detroit", state: "MI", multiplier: 0.96 },
  { city: "El Paso", state: "TX", multiplier: 0.82 },
  { city: "Fairmont", state: "WV", multiplier: 0.82 },
  { city: "Fort Worth", state: "TX", multiplier: 0.92 },
  { city: "Fresno", state: "CA", multiplier: 1.05 },
  { city: "Houston", state: "TX", multiplier: 0.92 },
  { city: "Huntington", state: "WV", multiplier: 0.85 },
  { city: "Indianapolis", state: "IN", multiplier: 0.94 },
  { city: "Jacksonville", state: "FL", multiplier: 0.90 },
  { city: "Kansas City", state: "MO", multiplier: 1.02 },
  { city: "Las Vegas", state: "NV", multiplier: 1.05 },
  { city: "Long Beach", state: "CA", multiplier: 1.22 },
  { city: "Los Angeles", state: "CA", multiplier: 1.28 },
  { city: "Louisville", state: "KY", multiplier: 0.92 },
  { city: "Martinsburg", state: "WV", multiplier: 0.95 },
  { city: "Memphis", state: "TN", multiplier: 0.86 },
  { city: "Mesa", state: "AZ", multiplier: 0.94 },
  { city: "Miami", state: "FL", multiplier: 1.15 },
  { city: "Milwaukee", state: "WI", multiplier: 0.98 },
  { city: "Minneapolis", state: "MN", multiplier: 1.12 },
  { city: "Morgantown", state: "WV", multiplier: 0.92 },
  { city: "Nashville", state: "TN", multiplier: 1.08 },
  { city: "New York", state: "NY", multiplier: 1.65 },
  { city: "Oakland", state: "CA", multiplier: 1.28 },
  { city: "Oklahoma City", state: "OK", multiplier: 0.88 },
  { city: "Omaha", state: "NE", multiplier: 0.94 },
  { city: "Parkersburg", state: "WV", multiplier: 0.83 },
  { city: "Philadelphia", state: "PA", multiplier: 1.08 },
  { city: "Phoenix", state: "AZ", multiplier: 0.95 },
  { city: "Portland", state: "OR", multiplier: 1.20 },
  { city: "Raleigh", state: "NC", multiplier: 1.08 },
  { city: "Sacramento", state: "CA", multiplier: 1.18 },
  { city: "San Antonio", state: "TX", multiplier: 0.88 },
  { city: "San Diego", state: "CA", multiplier: 1.22 },
  { city: "San Francisco", state: "CA", multiplier: 1.55 },
  { city: "San Jose", state: "CA", multiplier: 1.45 },
  { city: "Seattle", state: "WA", multiplier: 1.32 },
  { city: "South Charleston", state: "WV", multiplier: 0.84 },
  { city: "Tampa", state: "FL", multiplier: 1.05 },
  { city: "Tucson", state: "AZ", multiplier: 0.92 },
  { city: "Tulsa", state: "OK", multiplier: 0.88 },
  { city: "Virginia Beach", state: "VA", multiplier: 1.02 },
  { city: "Washington", state: "DC", multiplier: 1.30 },
  { city: "Weirton", state: "WV", multiplier: 0.82 },
  { city: "Wheeling", state: "WV", multiplier: 0.85 },
  { city: "Wichita", state: "KS", multiplier: 0.88 }
];
