export interface AiModel {
  procesarMensaje: (id: string) => Promise<string | null>
  transcriptionsAudio: (mp3FilePath: string) => Promise<string>
  getHistory: () => object
  createAudioFileFromText: (text: string) => Promise<string>
}
