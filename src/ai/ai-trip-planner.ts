// src/ai/ai-trip-planner.ts
'use server';
/**
 * @fileOverview AI-powered trip planner flow.
 *
 * This file defines a Genkit flow that takes user inputs such as budget, travel dates, and interests,
 * and generates a personalized travel plan based on the travel blogs in the database.
 *
 * @interface AiTripPlannerInput - The input type for the aiTripPlanner function.
 * @interface AiTripPlannerOutput - The output type for the aiTripPlanner function.
 * @function aiTripPlanner - The main function to generate a personalized travel plan.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';


const AiTripPlannerInputSchema = z.object({
  budget: z.number().describe('The budget for the trip in USD.'),
  travelDates: z.string().describe('The desired travel dates.'),
  interests: z.string().describe('A comma-separated list of interests e.g., hiking, museums, food.'),
});

export type AiTripPlannerInput = z.infer<typeof AiTripPlannerInputSchema>;

const AiTripPlannerOutputSchema = z.object({
  travelPlan: z.string().describe('A personalized travel plan based on the user inputs.'),
});

export type AiTripPlannerOutput = z.infer<typeof AiTripPlannerOutputSchema>;

export async function aiTripPlanner(input: AiTripPlannerInput): Promise<AiTripPlannerOutput> {
  return aiTripPlannerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiTripPlannerPrompt',
  input: {schema: AiTripPlannerInputSchema},
  output: {schema: AiTripPlannerOutputSchema},
  prompt: `You are a travel expert. Generate a personalized travel plan based on the following user inputs:

Budget: {{{budget}}} USD
Travel Dates: {{{travelDates}}}
Interests: {{{interests}}}

Consider the travel blogs in the database to create the travel plan. Be specific with dates and times of possible activities.
`,
});

const aiTripPlannerFlow = ai.defineFlow(
  {
    name: 'aiTripPlannerFlow',
    inputSchema: AiTripPlannerInputSchema,
    outputSchema: AiTripPlannerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
