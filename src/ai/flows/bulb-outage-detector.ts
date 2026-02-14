'use server';
/**
 * @fileOverview An AI flow to detect and count bulb outages in a lighting fixture.
 *
 * - detectOutages - A function that identifies working and non-working bulbs.
 * - DetectOutagesInput - The input type for the detectOutages function.
 * - DetectOutagesOutput - The return type for the detectOutages function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectOutagesInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a lighting fixture or multiple lamps, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type DetectOutagesInput = z.infer<typeof DetectOutagesInputSchema>;

const DetectOutagesOutputSchema = z.object({
  totalBulbsFound: z.number().describe('The total number of bulbs or light points identified.'),
  workingBulbs: z.number().describe('The number of bulbs that appear to be functioning correctly.'),
  outageCount: z.number().describe('The number of bulbs that are burned out or not functioning.'),
  outageLocations: z.array(z.string()).describe('Descriptions of where the outages are located in the image.'),
  severity: z.enum(['none', 'minor', 'significant', 'hazardous']).describe('The severity of the outages found.'),
  recommendations: z.array(z.string()).describe('Specific maintenance or safety advice based on the findings.'),
});
export type DetectOutagesOutput = z.infer<typeof DetectOutagesOutputSchema>;

export async function detectOutages(input: DetectOutagesInput): Promise<DetectOutagesOutput> {
  return detectOutagesFlow(input);
}

const outagePrompt = ai.definePrompt({
  name: 'bulbOutageDetectorPrompt',
  input: {schema: DetectOutagesInputSchema},
  output: {schema: DetectOutagesOutputSchema},
  prompt: `You are an expert electrical and lighting maintenance assistant. Your task is to analyze the provided image to identify all light bulbs or points of light and determine which ones are functioning and which are burned out.

1. **Count Total Bulbs**: Identify all possible bulb sockets or light sources in the fixture.
2. **Identify Working Bulbs**: Count how many are currently emitting light.
3. **Calculate Outages**: Determine the number of non-functioning bulbs.
4. **Locate Outages**: Describe where the dead bulbs are (e.g., "top left socket", "middle bulb in the chandelier").
5. **Assess Severity**: Decide if the outages represent a significant loss of light or a potential electrical hazard (like multiple failures in one circuit).
6. **Recommendations**: Provide advice on replacement types, safety steps (e.g., turning off power), or if an electrician is needed.

Photo: {{media url=photoDataUri}}`,
});

const detectOutagesFlow = ai.defineFlow(
  {
    name: 'detectOutagesFlow',
    inputSchema: DetectOutagesInputSchema,
    outputSchema: DetectOutagesOutputSchema,
  },
  async input => {
    const {output} = await outagePrompt(input);
    return output!;
  }
);
