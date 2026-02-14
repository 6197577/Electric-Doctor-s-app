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
  photoDataUri: z
    .string()
    .describe(
      "A photo or video frame of an electrical issue, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z
    .string()
    .optional()
    .describe('An optional detailed description of the observed electrical issue, including sounds, smells, or symptoms.'),
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
  prompt: `You are an expert electrical diagnostic assistant. Your task is to analyze an electrical issue based on an image and an optional description provided by a homeowner. Your response must be in JSON format, strictly adhering to the provided schema.

Perform the following steps:
1.  **Diagnose the problem**: Provide an overall diagnosis of the electrical issue.
2.  **Identify damaged parts**: List any damaged, worn, or missing electrical parts visible in the image or described by the user.
3.  **Explain the nature of the problem**: Provide a detailed explanation of what is happening, why it might be happening, and its potential consequences.
4.  **Assess urgency**: Determine the urgency level of the issue (low, medium, high, critical).
5.  **Provide safety recommendations**: Offer immediate safety advice or warnings.

Use the following as the primary sources of information:

Description: {{{description}}}
Photo/Video Frame: {{media url=photoDataUri}}`,
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
