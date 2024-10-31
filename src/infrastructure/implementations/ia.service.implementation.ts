import { ChatResponseInterface } from 'src/domain/interfaces/chat-response.interface';
import { ProfilingInterface } from '../../domain/interfaces/Profiling.interface';
import { ContextInterface } from 'src/domain/interfaces/context.interface';

export interface IaServiceImplementation {
  setContext: (context: ContextInterface[]) => void;
  generateConversationSummary(messages: string[]): Promise<ProfilingInterface>;
  processMessage: () => Promise<ChatResponseInterface | null>;
  transcriptionsAudio: (mp3FilePath: string) => Promise<string>;
  getHistory: () => object;
  createAudioFileFromText: (text: string) => Promise<string>;
  setPromtInicialSistema(initialPrompt: string): void;
  totalTokens: (message: string) => number;
  remapResponseForAudio: (message: string) => Promise<string>;
}
