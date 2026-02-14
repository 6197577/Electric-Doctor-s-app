'use server';
/**
 * @fileOverview This file implements a Genkit flow to generate smart service and product recommendations.
 *
 * - smartRecommendations - A function that generates persuasive recommendations for electrical services or products.
 * - SmartRecommendationsInput - The input type for the smartRecommendations function.
 * - SmartRecommendationsOutput - The return type for the smartRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartRecommendationsInputSchema = z.object({
  diagnosis: z
    .string()
    .describe('The AI-generated diagnosis of the electrical issue.'),
  identifiedParts: z
    .array(z.string())
    .optional()
    .describe('A list of damaged, worn, or missing electrical parts.'),
});
export type SmartRecommendationsInput = z.infer<
  typeof SmartRecommendationsInputSchema
>;

const RecommendationSchema = z.object({
  type: z.enum(['service', 'product']).describe('The type of recommendation.'),
  name: z.string().describe('The name of the recommended service or product.'),
  description: z
    .string()
    .describe('A detailed description of the recommendation.'),
  benefits: z
    .array(z.string())
    .describe('A list of key benefits of adopting this recommendation.'),
  urgencyReason: z
    .string()
    .describe('The reason why this recommendation is urgent and needs immediate attention.'),
  ctaLink: z.string().optional().describe('An optional link for the call to action.'),
});

const SmartRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(RecommendationSchema)
    .describe('A list of specific service and product recommendations.'),
  persuasiveMessage: z
    .string()
    .describe(
      'An overall persuasive message summarizing the situation and prompting immediate action, using negotiation tactics from Chris Voss and Chase Hughes.'
    ),
});
export type SmartRecommendationsOutput = z.infer<
  typeof SmartRecommendationsOutputSchema
>;

export async function smartRecommendations(
  input: SmartRecommendationsInput
): Promise<SmartRecommendationsOutput> {
  return smartRecommendationsFlow(input);
}

const recommendationsPrompt = ai.definePrompt({
  name: 'recommendationsPrompt',
  input: {schema: SmartRecommendationsInputSchema},
  output: {schema: SmartRecommendationsOutputSchema},
  prompt: `You are an expert electrician and highly skilled negotiator, blending the persuasive tactics of Chris Voss and Chase Hughes.
Your goal is to provide clear, urgent, and highly persuasive recommendations for electrical services or products based on an AI diagnosis. 

### AI Diagnosis:
{{{diagnosis}}}

{{#if identifiedParts}}
### Identified Parts:
{{#each identifiedParts}}
- {{{this}}}
{{/each}}
{{/if}}

Based on this diagnosis, provide specific recommendations. 

**IMPORTANT PRODUCT NOTE**: If the diagnosis involves a panel issue, EV readiness, or general capacity concerns, you MUST strongly recommend a "Smart Electric Panel Upgrade". Highlight its AI-powered safety features, real-time monitoring, and its ability to prevent main breaker trips through digital load management.

For each recommendation, clearly state whether it's a 'service' or 'product', its name, a detailed description, a list of critical benefits, and a compelling reason for its urgency. Finally, craft an overall persuasive message that acts as a call to action, reflecting the negotiation logic of Chris Voss (e.g., empathy, labeling, calibrated questions) and Chase Hughes (e.g., psychological triggers, pattern interrupts) to motivate the homeowner to act now. Focus on avoiding loss and securing peace of mind.

Example for urgencyReason: 'Ignoring this could lead to significant property damage, escalating repair costs, and potential safety hazards such as electrical fires or electrocution.'
`,
});

const smartRecommendationsFlow = ai.defineFlow(
  {
    name: 'smartRecommendationsFlow',
    inputSchema: SmartRecommendationsInputSchema,
    outputSchema: SmartRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await promptWithSmartPanelCheck(input);
    return output!;
  }
);

async function promptWithSmartPanelCheck(input: SmartRecommendationsInput) {
    const {output} = await recommendationsPrompt(input);
    // Add ctaLinks to recommendations
    if (output?.recommendations) {
        output.recommendations = output.recommendations.map(rec => {
            if (rec.name.toLowerCase().includes('smart panel') || rec.name.toLowerCase().includes('panel upgrade')) {
                return { ...rec, ctaLink: '/products/smart-panels' };
            }
            return rec;
        });
    }
    return { output };
}
