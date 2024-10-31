import OpenAI from "openai";

const { OPEN_AI } = process.env;

export const openAi = new OpenAI({
  organization: "org-TYHAEK3BADHIhk9p2i8zWkbQ",
  apiKey: OPEN_AI,
});