/**
 * @fileOverview SEO utilities for dynamic content generation.
 */

export const SERVICES = [
  { id: 'video-consult', name: 'Emergency Video Doctor', description: 'Instant video consultation with a Master Electrician for safety and troubleshooting.' },
  { id: 'diagnose', name: 'AI Electrical Diagnosis', description: 'Instant AI-powered electrical fault detection and safety analysis.' },
  { id: 'audit', name: '100-Point Safety Audit', description: 'Comprehensive NEC-compliant electrical safety inspections for homes.' },
  { id: 'commercial-audit', name: 'AI Commercial Compliance Audit', description: 'Professional-grade electrical safety and OSHA compliance auditing for businesses.' },
  { id: 'lighting-tool', name: 'Lighting & Lumens Analysis', description: 'Expert analysis of room brightness and color temperature quality.' },
  { id: 'generator-logs', name: 'Generator Maintenance Tracking', description: 'Digital logbook for reliable backup power system maintenance.' },
  { id: 'marketplace', name: 'Professional Electrician Marketplace', description: 'Direct access to verified local electricians with dynamic pricing.' },
  { id: 'ev-readiness', name: 'EV & Capacity Load Calculation', description: 'AI-powered NEC load calculations for EV chargers and electrification.' },
  { id: 'smart-panels', name: 'Smart Electric Panel Upgrade', description: 'High-performance AI-powered electrical panel upgrades with remote control and load management.' },
];

export function generateServiceCityTitle(serviceName: string, city: string, state: string) {
  return `${serviceName} in ${city}, ${state} | Emergency Electric Repair`;
}

export function generateServiceCityDescription(serviceName: string, city: string, state: string) {
  return `Need ${serviceName.toLowerCase()} in ${city}? Get professional-grade AI insights and NEC safety audits tailored for ${city}, ${state}. Secure your home today.`;
}

export function getServiceById(id: string) {
  return SERVICES.find(s => s.id === id);
}
