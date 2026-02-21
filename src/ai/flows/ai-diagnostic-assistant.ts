
'use server';
/**
 * @fileOverview An AI diagnostic assistant for electrical issues.
 *
 * - aiDiagnosticAssistant - A function that handles the electrical issue diagnosis process.
 * - AiDiagnosticAssistantInput - The input type for the aiDiagnosticAssistant function.
 * - AiDiagnosticAssistantOutput - The return type for the aiDiagnosticAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiDiagnosticAssistantInputSchema = z.object({
  photoDataUris: z
    .array(z.string())
    .describe(
      "A list of photos or video frames of an electrical issue, as data URIs that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z
    .string()
    .optional()
    .describe('An optional detailed description of the observed electrical issue, including sounds (buzzing, arcing, popping), smells, or symptoms.'),
});
export type AiDiagnosticAssistantInput = z.infer<typeof AiDiagnosticAssistantInputSchema>;

const AiDiagnosticAssistantOutputSchema = z.object({
  overallDiagnosis: z.string().describe('A concise overall diagnosis of the electrical issue.'),
  identifiedParts: z.array(z.object({
    partName: z.string().describe('The name of the identified part (e.g., "circuit breaker", "electrical outlet", "wiring insulation").'),
    condition: z.string().describe('The condition of the part (e.g., "damaged", "worn", "missing", "scorched", "loose", "overheated").'),
    location: z.string().optional().describe('Specific location or context of the part if identifiable (e.g., "near the fuse box", "under the sink").'),
  })).describe('A list of parts identified as damaged, worn, or missing based on the visual and textual input.'),
  explanation: z.string().describe('A detailed explanation of the nature of the problem, its potential causes, and implications for safety or functionality.'),
  urgencyLevel: z.enum(['low', 'medium', 'high', 'critical']).describe('The recommended urgency for addressing the issue, from low (non-critical) to critical (immediate hazard).'),
  safetyRecommendations: z.array(z.string()).describe('A list of immediate safety recommendations or warnings for the user to follow.'),
});
export type AiDiagnosticAssistantOutput = z.infer<typeof AiDiagnosticAssistantOutputSchema>;

export async function aiDiagnosticAssistant(input: AiDiagnosticAssistantInput): Promise<AiDiagnosticAssistantOutput> {
  return aiDiagnosticAssistantFlow(input);
}

const diagnosticPrompt = ai.definePrompt({
  name: 'electricalDiagnosticPrompt',
  input: {schema: AiDiagnosticAssistantInputSchema},
  output: {schema: AiDiagnosticAssistantOutputSchema},
  prompt: `You are an expert electrical diagnostic assistant. Your task is to analyze an electrical issue based on multiple images and a description of audio-visual symptoms provided by a homeowner. 

**CRITICAL INSTRUCTION**: Pay close attention to descriptions of sounds such as "buzzing", "crackling", "popping", or "hissing". These are often signs of active arcing or high-resistance connections which lead to immediate fire hazards.

Perform the following steps:
1.  **Diagnose the problem**: Provide an overall diagnosis based on all provided images and reported sounds.
2.  **Identify damaged parts**: List any damaged, worn, or missing electrical parts visible.
3.  **Explain the nature of the problem**: Provide a detailed explanation, mentioning if the reported sounds correlate with visual evidence of overheating or arcing.
4.  **Assess urgency**: Determine the urgency level (low, medium, high, critical). Audible arcing is always HIGH or CRITICAL.
5.  **Provide safety recommendations**: Offer immediate safety advice.

Use the following as the primary sources of information:

Description: {{{description}}}
{{#each photoDataUris}}
Photo/Video Frame {{ @index }}: {{media url=this}}
{{/each}}`,
});

const aiDiagnosticAssistantFlow = ai.defineFlow(
  {
    name: 'aiDiagnosticAssistantFlow',
    inputSchema: AiDiagnosticAssistantInputSchema,
    outputSchema: AiDiagnosticAssistantOutputSchema,
  },
  async input => {
    const {output} = await diagnosticPrompt(input);
    return output!;
  }
);
