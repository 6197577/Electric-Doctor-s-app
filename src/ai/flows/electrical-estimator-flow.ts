'use server';
/**
 * @fileOverview AI flow for Professional Electrical Estimating and Plan Verification.
 * Assists electricians in verifying blueprints and creating accurate material/labor estimates.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ElectricalEstimatorInputSchema = z.object({
  jobDescription: z.string().describe('Detailed description of the electrical work to be performed.'),
  city: z.string().describe('The city where the work will be performed, used for local labor rate adjustments.'),
  includeMaterials: z.boolean().default(true).describe('Whether to generate a detailed materials list.'),
  plansPhotoDataUri: z
    .string()
    .optional()
    .describe(
      "A photo or PDF-to-image conversion of electrical plans/blueprints, as a data URI that must include a MIME type and use Base64 encoding."
    ),
});
export type ElectricalEstimatorInput = z.infer<typeof ElectricalEstimatorInputSchema>;

const EstimateLineItemSchema = z.object({
  item: z.string().describe('Name of the material or labor task.'),
  quantity: z.number().describe('Quantity required.'),
  unit: z.string().describe('Unit of measurement (e.g., ft, hours, each).'),
  estimatedPrice: z.number().describe('Estimated price for this line item.'),
});

const ElectricalEstimatorOutputSchema = z.object({
  totalEstimate: z.number().describe('Total estimated cost for the project.'),
  laborBreakdown: z.object({
    hours: z.number().describe('Estimated total labor hours.'),
    rate: z.number().describe('Calculated local hourly rate.'),
    totalLabor: z.number().describe('Total labor cost.'),
  }),
  materialBreakdown: z.array(EstimateLineItemSchema).describe('Detailed list of materials identified from plans and description.'),
  overheadAndProfit: z.number().describe('Suggested overhead and profit margin (usually 20-30%).'),
  necReferences: z.array(z.string()).describe('Applicable NEC code sections for this type of work.'),
  planVerification: z.object({
    discrepanciesFound: z.array(z.string()).describe('List of potential errors or missing items found in the plans vs the description.'),
    loadVerified: z.boolean().describe('Whether the loads in the plan seem balanced and code-compliant.'),
    safetyNotes: z.string().describe('Critical safety or compliance observations from the blueprints.'),
  }),
  professionalNotes: z.string().describe('AI-generated advice for the electrician regarding technical challenges or safety.'),
});
export type ElectricalEstimatorOutput = z.infer<typeof ElectricalEstimatorOutputSchema>;

export async function generateEstimate(input: ElectricalEstimatorInput): Promise<ElectricalEstimatorOutput> {
  const {output} = await estimatorPrompt(input);
  return output!;
}

const estimatorPrompt = ai.definePrompt({
  name: 'electricalEstimatorPrompt',
  input: {schema: ElectricalEstimatorInputSchema},
  output: {schema: ElectricalEstimatorOutputSchema},
  prompt: `You are a Senior Electrical Estimator and Project Manager. 
Your goal is to assist a field electrician in creating a highly accurate, professional estimate and VERIFYING electrical plans.

### Job Details:
- **Location**: {{city}}
- **Description**: {{{jobDescription}}}

### Tasks:
1. **Plan Analysis**: If a plan is provided, identify symbols, wire gauges, conduit runs, and circuit requirements.
2. **Verification**: Compare the provided description with the visual plans. Flag any discrepancies (e.g., plans show 12AWG but description says 14AWG).
3. **Calculate Costs**: Estimate material costs based on current market averages.
4. **Labor Allocation**: Estimate total man-hours based on standard industry productivity rates.
5. **NEC Compliance**: List the specific NEC 2023 sections that must be followed for this job.
6. **Load Verification**: Verify that the proposed circuits and breakers match the plan's load requirements.

{{#if plansPhotoDataUri}}
Plans Image: {{media url=plansPhotoDataUri}}
{{/if}}

Provide a technical, structured breakdown that an electrician can use to build a formal proposal or verify a client's blueprints.`,
});
