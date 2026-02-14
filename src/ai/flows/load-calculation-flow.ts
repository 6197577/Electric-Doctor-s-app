'use server';
/**
 * @fileOverview AI flow to calculate electrical load capacity and EV readiness.
 *
 * - calculateLoadCapacity - Analyzes panel photos and appliance lists to estimate load.
 * - LoadCalculationInput - The input type.
 * - LoadCalculationOutput - The return type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LoadCalculationInputSchema = z.object({
  panelPhotoDataUri: z
    .string()
    .describe(
      "A photo of the main electrical panel (breakers visible), as a data URI."
    ),
  appliances: z.array(z.string()).describe('A list of major existing appliances (e.g., AC, Electric Oven, Dryer).'),
  targetUpgrade: z.string().optional().describe('What the user wants to add (e.g., "Level 2 EV Charger", "Heat Pump").'),
});
export type LoadCalculationInput = z.infer<typeof LoadCalculationInputSchema>;

const LoadCalculationOutputSchema = z.object({
  estimatedPanelSize: z.number().describe('Estimated main breaker size in Amps (e.g., 100, 200).'),
  currentLoadEstimate: z.number().describe('Estimated current peak load in Amps.'),
  remainingCapacity: z.number().describe('Estimated remaining capacity in Amps.'),
  isReadyForUpgrade: z.boolean().describe('Whether the panel can likely support the target upgrade without a service upgrade.'),
  technicalBreakdown: z.string().describe('Detailed explanation of the load calculation based on NEC demand factors.'),
  recommendations: z.array(z.string()).describe('Specific steps (e.g., "Install Load Management Device", "Panel Upgrade Required").'),
  safetyScore: z.number().describe('Score from 1-10 on the current panel health/organization.'),
});
export type LoadCalculationOutput = z.infer<typeof LoadCalculationOutputSchema>;

export async function calculateLoadCapacity(input: LoadCalculationInput): Promise<LoadCalculationOutput> {
  return loadCalculationFlow(input);
}

const loadPrompt = ai.definePrompt({
  name: 'loadCalculationPrompt',
  input: {schema: LoadCalculationInputSchema},
  output: {schema: LoadCalculationOutputSchema},
  prompt: `You are a professional Electrical Engineer specializing in load calculations (NEC Article 220).
Analyze the provided panel photo and appliance list to estimate the home's electrical capacity.

1. **Estimate Panel Size**: Identify the main breaker (usually at the top).
2. **Peak Load Calculation**: Use standard demand factors for the listed appliances ({{{#each appliances}}}{{{this}}}, {{{/each}}}).
3. **Upgrade Feasibility**: Determine if adding a "{{{targetUpgrade}}}" is safe.
4. **Technical Explanation**: Provide a clear breakdown of how you reached the numbers.

Panel Photo: {{media url=panelPhotoDataUri}}`,
});

const loadCalculationFlow = ai.defineFlow(
  {
    name: 'loadCalculationFlow',
    inputSchema: LoadCalculationInputSchema,
    outputSchema: LoadCalculationOutputSchema,
  },
  async input => {
    const {output} = await loadPrompt(input);
    return output!;
  }
);
