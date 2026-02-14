'use server';
/**
 * @fileOverview AI flow for Predictive Electrical Maintenance.
 * Analyzes historical data to predict potential failure points.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictiveMaintenanceInputSchema = z.object({
  auditHistory: z.array(z.string()).describe('Summary of past electrical audit findings.'),
  generatorLogs: z.array(z.string()).describe('Summary of generator run hours and maintenance history.'),
  ageOfHome: z.number().describe('The age of the electrical system in years.'),
  observedAnomalies: z.string().optional().describe('Flickering lights, buzzing sounds, etc.'),
});
export type PredictiveMaintenanceInput = z.infer<typeof PredictiveMaintenanceInputSchema>;

const PredictiveMaintenanceOutputSchema = z.object({
  healthScore: z.number().describe('Overall system health score from 1-100.'),
  predictedFailurePoints: z.array(z.object({
    component: z.string().describe('The component at risk (e.g., "Main Breaker", "Generator Battery").'),
    probability: z.number().describe('Failure probability percentage.'),
    timeframe: z.string().describe('Estimated timeframe for failure (e.g., "3-6 months").'),
    riskLevel: z.enum(['Low', 'Medium', 'High', 'Critical']),
  })).describe('List of potential failure points identified by AI.'),
  annualSavingsEstimate: z.number().describe('Estimated annual savings by preventing emergency repairs.'),
  preventionPlan: z.array(z.string()).describe('Specific proactive steps to take.'),
});
export type PredictiveMaintenanceOutput = z.infer<typeof PredictiveMaintenanceOutputSchema>;

export async function predictMaintenanceNeeds(input: PredictiveMaintenanceInput): Promise<PredictiveMaintenanceOutput> {
  const {output} = await maintenancePrompt(input);
  return output!;
}

const maintenancePrompt = ai.definePrompt({
  name: 'predictiveMaintenancePrompt',
  input: {schema: PredictiveMaintenanceInputSchema},
  output: {schema: PredictiveMaintenanceOutputSchema},
  prompt: `You are a Senior Electrical Asset Manager and AI Safety Specialist.
Analyze the following system data to predict maintenance needs and potential failures.

### System Data:
- Home/System Age: {{ageOfHome}} years
- Audit History: {{#each auditHistory}}- {{this}} {{/each}}
- Generator Logs: {{#each generatorLogs}}- {{this}} {{/each}}
- User Observations: {{observedAnomalies}}

1. **Calculate Health Score**: Based on age and maintenance history.
2. **Predict Failures**: Identify parts likely to fail based on statistical degradation of electrical components.
3. **Estimate Savings**: Calculate how much they save by avoiding a $1,500 emergency Sunday service call.
4. **Action Plan**: Provide technical, proactive recommendations.`,
});
