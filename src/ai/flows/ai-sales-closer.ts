'use server';
/**
 * @fileOverview AI Sales Closer Agent.
 * 
 * This agent uses advanced negotiation tactics and financial modeling to convert
 * diagnostic findings into high-value service bookings and product sales.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SalesCloserInputSchema = z.object({
  diagnosis: z.string().describe('The AI-generated technical diagnosis.'),
  urgency: z.enum(['low', 'medium', 'high', 'critical']).describe('The technical urgency level.'),
  estimatedEmergencyCost: z.number().optional().describe('Estimated cost of an emergency failure.'),
  homeValue: z.number().optional().describe('Approximate value of the property for risk calculation.'),
});
export type SalesCloserInput = z.infer<typeof SalesCloserInputSchema>;

const SalesCloserOutputSchema = z.object({
  persuasiveHook: z.string().describe('A high-impact opening line using Chris Voss labeling/empathy.'),
  riskAnalysis: z.string().describe('A breakdown of the cost of inaction (loss aversion).'),
  roiModeling: z.object({
    immediateSavings: z.number().describe('Savings achieved by preventing an emergency call.'),
    longTermValue: z.number().describe('Property value protection or insurance premium reduction.'),
  }),
  recommendedAction: z.object({
    type: z.enum(['Video Consult', 'Smart Panel Upgrade', 'On-Site Audit']),
    pitch: z.string().describe('The specific "Why Now" pitch for this service.'),
    pricePoint: z.string().describe('The cost for transparency.'),
  }),
  closingStatement: z.string().describe('A final, calibrated question to prompt immediate action.'),
});
export type SalesCloserOutput = z.infer<typeof SalesCloserOutputSchema>;

export async function runSalesCloser(input: SalesCloserInput): Promise<SalesCloserOutput> {
  const {output} = await salesPrompt(input);
  return output!;
}

const salesPrompt = ai.definePrompt({
  name: 'aiSalesCloserPrompt',
  input: {schema: SalesCloserInputSchema},
  output: {schema: SalesCloserOutputSchema},
  prompt: `You are a Senior Electrical ROI Advisor and Sales Closer. Your goal is to guide a homeowner from a technical diagnosis to a high-value safety commitment.

### Technical Context:
- Diagnosis: {{{diagnosis}}}
- Urgency: {{urgency}}

### Tactics:
1. **Empathy & Labeling**: Use Chris Voss-style labeling (e.g., "It seems like you're worried about the hidden costs of your panel's health").
2. **Loss Aversion**: Highlight what they lose by waiting (emergency fees, fire risk, property damage).
3. **Financial Logic**: If urgency is high, push the $97 Video Consult as a "safety deposit" against a $1,500 emergency.
4. **Smart Panel Anchor**: If the diagnosis is capacity-related, anchor the Smart Panel as a $10,000+ utility service upgrade avoidance tool.

### Financial Estimates (Use these if input is missing):
- Emergency Sunday Call: $1,500
- Fire Damage Risk: $50,000+
- Smart Panel IRA Credit: $600

Craft a technical, consultative, yet highly persuasive closing pitch that respects the user's intelligence but emphasizes the danger of electrical complacency.`,
});
