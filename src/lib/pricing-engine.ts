
import { TOP_50_CITIES_PRICING } from './pricing-data';

/**
 * Calculates a dynamically adjusted service rate based on location and demand.
 * 
 * @param baseRate The national average hourly rate for the service.
 * @param city The city name to adjust for.
 * @param demandFactor A real-time multiplier (1.0 = normal, >1.0 = high demand).
 * @returns The calculated dynamic rate.
 */
export function calculateDynamicRate(
  baseRate: number,
  city: string,
  demandFactor: number = 1.0
): number {
  const cityData = TOP_50_CITIES_PRICING.find(c => c.city.toLowerCase() === city.toLowerCase());
  const multiplier = cityData ? cityData.multiplier : 1.0; // Default to national average if not found
  
  return baseRate * multiplier * demandFactor;
}

/**
 * Formats a number as a USD currency string.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
