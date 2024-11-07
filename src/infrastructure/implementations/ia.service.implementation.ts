import { Injectable } from '@nestjs/common';
import { UserInterface } from 'src/domain/interfaces';
import { ChatResponseInterface } from 'src/domain/interfaces/chat-response.interface';
import { ContextInterface } from 'src/domain/interfaces/context.interface';

@Injectable()
export class IaServiceImplementation {
  setContext(context: ContextInterface[]): void {
    // Implementación de la función
  }

  async generateConversationSummary(messages: string[]): Promise<UserInterface> {
    // Implementación de la función
    return { /* objeto que cumple con UserInterface */ };
  }

  async processMessage(): Promise<ChatResponseInterface | null> {
    // Implementación de la función
    return null;
  }

  async transcriptionsAudio(mp3FilePath: string): Promise<string> {
    // Implementación de la función
    return '';
  }

  getHistory(): object {
    // Implementación de la función
    return {};
  }

  async createAudioFileFromText(text: string): Promise<string> {
    // Implementación de la función
    return '';
  }

  setInitialSystemPrompt(initialPrompt: string): void {
    // Implementación de la función
  }

  totalTokens(message: string): number {
    // Implementación de la función
    return 0;
  }

  async remapResponseForAudio(message: string): Promise<string> {
    // Implementación de la función
    return '';
  }
}
