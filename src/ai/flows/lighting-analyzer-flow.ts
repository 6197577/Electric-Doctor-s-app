'use server';
/**
 * @fileOverview An AI flow to analyze lighting conditions from an image.
 *
 * - analyzeLighting - A function that estimates lumens and color temperature.
 * - AnalyzeLightingInput - The input type for the analyzeLighting function.
 * - AnalyzeLightingOutput - The return type for the analyzeLighting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeLightingInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a light source or an illuminated room, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  roomType: z.string().optional().describe('The type of room (e.g., "Kitchen", "Office") for context.'),
});
export type AnalyzeLightingInput = z.infer<typeof AnalyzeLightingInputSchema>;

const AnalyzeLightingOutputSchema = z.object({
  estimatedLumens: z.number().describe('The estimated brightness in lumens.'),
  colorTemperatureK: z.number().describe('The estimated color temperature in Kelvin (e.g., 2700, 5000).'),
  colorCategory: z.string().describe('The descriptive category of the light color (e.g., "Warm White", "Daylight").'),
  description: z.string().describe('A brief description of the lighting quality.'),
  isAdequate: z.boolean().describe('Whether the lighting is considered adequate for the specified room type.'),
  recommendations: z.array(z.string()).describe('Recommendations for improving the lighting.'),
});
export type AnalyzeLightingOutput = z.infer<typeof AnalyzeLightingOutputSchema>;

export async function analyzeLighting(input: AnalyzeLightingInput): Promise<AnalyzeLightingOutput> {
  return analyzeLightingFlow(input);
}

const lightingPrompt = ai.definePrompt({
  name: 'lightingAnalyzerPrompt',
  input: {schema: AnalyzeLightingInputSchema},
  output: {schema: AnalyzeLightingOutputSchema},
  prompt: `You are an expert lighting consultant. Analyze the provided image to estimate the technical properties of the lighting.

1. **Estimate Lumens**: Based on the brightness of the light source and how it illuminates the space, provide an estimate in lumens.
2. **Determine Color Temperature**: Estimate the Kelvin value (e.g., 2700K for warm, 5000K for daylight).
3. **Categorize Color**: Provide a common name for this light color.
4. **Evaluate Adequacy**: Based on the room type ({{{roomType}}}) or visual context, decide if this lighting is sufficient.
5. **Recommendations**: Suggest improvements (e.g., higher CRI bulbs, different placement, or specific color temps for the task).

Photo: {{media url=photoDataUri}}`,
});

const analyzeLightingFlow = ai.defineFlow(
  {
    name: 'analyzeLightingFlow',
    inputSchema: AnalyzeLightingInputSchema,
    outputSchema: AnalyzeLightingOutputSchema,
  },
  async input => {
    const {output} = await lightingPrompt(input);
    return output!;
  }
);
