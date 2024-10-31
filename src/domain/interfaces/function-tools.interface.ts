import { ChatCompletionTool } from "openai/resources";

export interface FunctionTool extends ChatCompletionTool {
    execute: (any?) => Promise<string>
  }