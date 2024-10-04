import { ServiceChat } from "../../interfaces/ServiceChat.js";
import { AiModel } from "../../interfaces/AiModel.js";
import { AiModelAudio } from "../../interfaces/AiModelAudio.js";
import { guardarArchivoOgg } from "./FileSystem.js";
import { convertirOggToMp3 } from "./AudioDecode.js";

export class ChatFacade {

  private serviceChat: ServiceChat
  private serviceAi: AiModel
  private serviceAiAudio: AiModelAudio

  constructor(serviceChat: ServiceChat, serviceAi: AiModel, serviceAIAudio: AiModelAudio) {
    this.serviceChat = serviceChat
    this.serviceAi = serviceAi
    this.serviceAiAudio = serviceAIAudio
  }

  async procesarMensajeTexto(menssageId: string, messages: string) {
    await this.serviceChat.marcarLeido(menssageId);
    const responseMessage = await this.serviceAi.procesarMensaje(messages)
    if (responseMessage) {
      await this.serviceChat.enviarMensaje(responseMessage)
    }
  }

  async procesarMensajeAudio(menssageId: string, audioId: string) {

    const audioDownload = await this.serviceChat.downloadMedia(audioId)
    const oggFilePath = await guardarArchivoOgg(audioDownload, audioId + ".ogg");
    const mp3FilePath = await convertirOggToMp3(oggFilePath, audioId);
    const messagesTranscriptions = await this.serviceAi.transcriptionsAudio(mp3FilePath);
    await this.serviceChat.marcarLeido(menssageId);
    const responseMessage = await this.serviceAi.procesarMensaje(messagesTranscriptions)
    const fileName = await this.serviceAiAudio.createAudioFileFromText(messagesTranscriptions);

    // if (responseMessage) {
    //   await this.serviceChat.enviarMensaje(responseMessage)
    // }

    // const fileName = await this.serviceAiAudio.createAudioFileFromText(messagesTranscriptions);

    // await this.procesarMensajeTexto(menssageId, messagesTranscriptions)
  }
}
