export interface AiModelAudio {
  createAudioFileFromText: (text: string) => Promise<string>
}
