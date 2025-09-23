import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/googleai";

const ai = genkit({
  plugins: [googleAI({
    apiKey: process.env.GOOGLE_API_KEY
  })],
});

export { ai };