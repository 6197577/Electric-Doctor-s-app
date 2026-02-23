import { describe, it, expect } from 'vitest'
import { calculateDynamicRate } from '@/lib/pricing-engine'

describe('Dynamic Pricing Engine', () => {
  it('calculates the correct rate for New York with 1.65 multiplier', () => {
    const baseRate = 100
    const city = 'New York'
    const result = calculateDynamicRate(baseRate, city)
    expect(result).toBe(165)
  })

  it('applies demand factor correctly', () => {
    const baseRate = 100
    const city = 'New York'
    const demandFactor = 1.2
    const result = calculateDynamicRate(baseRate, city, demandFactor)
    // 100 * 1.65 * 1.2 = 198
    expect(result).toBe(198)
  })

  it('falls back to multiplier of 1.0 for unknown cities', () => {
    const baseRate = 100
    const city = 'Unknown City'
    const result = calculateDynamicRate(baseRate, city)
    expect(result).toBe(100)
  })
})
