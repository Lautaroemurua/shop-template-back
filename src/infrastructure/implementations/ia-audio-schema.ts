export interface IaAudioModel {
    createAudioFileFromText: (text: string) => Promise<string>,
    transcribeAudio: (mp3FilePath: string) => Promise<string>;
  }
  