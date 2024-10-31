import { ChatResponseModelInterface } from '../../domain/interfaces/chat-response-model.interface';
import { ProfilingInterface } from '../../domain/interfaces/Profiling.interface';

export interface IaSchema {
  generarResumenConversacion(mensajes: string[]): Promise<ProfilingInterface>;
  procesarMensaje(id: string): Promise<ChatResponseModelInterface | null>;
  procesarMensaje(id: string): Promise<ChatResponseModelInterface | null>;
  transcriptionsAudio(mp3FilePath: string): Promise<string>;
  getHistory(): object;
  createAudioFileFromText(text: string): Promise<string>;
  setPromtInicialSistema(promptInicial: string): void;
  calculateTokens(mensaje: string): number;
  remapearRespuestaParaAudio(mensaje: string): Promise<string>;
}
