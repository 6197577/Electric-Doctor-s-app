'use server';
/**
 * @fileOverview AI flow for Professional Electrical Estimating.
 * Assists electricians in creating accurate material and labor estimates.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ElectricalEstimatorInputSchema = z.object({
  jobDescription: z.string().describe('Detailed description of the electrical work to be performed.'),
  city: z.string().describe('The city where the work will be performed, used for local labor rate adjustments.'),
  includeMaterials: z.boolean().default(true).describe('Whether to generate a detailed materials list.'),
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
  materialBreakdown: z.array(EstimateLineItemSchema).describe('Detailed list of materials needed.'),
  overheadAndProfit: z.number().describe('Suggested overhead and profit margin (usually 20-30%).'),
  necReferences: z.array(z.string()).describe('Applicable NEC code sections for this type of work.'),
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
Your goal is to assist a field electrician in creating a highly accurate, professional estimate for a client.

### Job Details:
- **Location**: {{city}}
- **Description**: {{{jobDescription}}}

### Tasks:
1. **Analyze Requirements**: Determine all necessary materials (wire gauge, conduit, boxes, devices) and labor steps.
2. **Calculate Costs**: Estimate material costs based on current market averages.
3. **Labor Allocation**: Estimate total man-hours based on standard industry productivity rates for "{{{jobDescription}}}".
4. **NEC Compliance**: List the specific NEC 2023 sections that must be followed for this job.
5. **Profitability**: Suggest a fair overhead and profit margin.

Provide a technical, structured breakdown that an electrician can use to build a formal proposal.`,
});
