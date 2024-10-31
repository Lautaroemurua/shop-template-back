import { Injectable } from '@nestjs/common';
import { WhatsAppService } from '../services/whatsapp/whatsapp.service';
import { IaSchema } from 'src/infrastructure/implementations/ia-schema.interface';
import { IaAudioModel } from 'src/infrastructure/implementations/ia-audio-schema';
import { DatabaseSchema } from 'src/infrastructure/implementations/database.schema';

@Injectable()
export class ChatFacade {
  constructor(
    // private readonly whatsappService: WhatsAppService,
    // private readonly iaSchema: IaSchema,
    // private readonly iaAudioModel: IaAudioModel,
    // private readonly databaseSchema: DatabaseSchema,
  ) {}

  async processTextMessage(messageId: string, messageText: string): Promise<void> {
    // // Find or create user in the database based on sender's ID from WhatsApp
    // const user = await this.databaseSchema.findOrCreateUser(this.whatsappService.getId());
  
    // // Find or create conversation for the user
    // const conversation = await this.databaseSchema.findOrCreateConversation(user.id);
  
    // // Mark the message as read
    // await this.whatsappService.markMessageAsRead(messageId);
  
    // // Process the text message and get a response
    // const responseMessage = await this.iaSchema.processMessage(messageText);
  
    // // Send the response if it exists
    // if (responseMessage) {
    //   await this.whatsappService.sendMessage({ text: responseMessage.text });
    // }
  }
  

  // async processAudioMessage(messageId: string, audioId: string): Promise<void> {
  //   // Download audio from WhatsApp
  //   const audioData = await this.whatsappService.downloadMedia(audioId);

  //   // Save the audio in the media folder as .ogg
  //   const oggFilePath = await guardarArchivoOgg(audioData, `${audioId}.ogg`);

  //   // Convert the .ogg file to .mp3
  //   const mp3FilePath = await convertirOggToMp3(oggFilePath, audioId);

  //   // Transcribe the audio file to get text
  //   const transcription = await this.iaAudioModel.transcribeAudio(mp3FilePath);

  //   // Mark the message as read
  //   await this.whatsappService.markAsRead(messageId);

  //   // Calculate tokens for the transcribed message
  //   this.iaSchema.calculateTokens(transcription);

  //   // Log the transcription
  //   console.log('Transcription:', transcription);

  //   // Process the transcribed text and get a response
  //   const responseMessage = await this.iaSchema.processMessage(transcription);

  //   if (responseMessage) {
  //     // Filter and reformat text response for audio output
  //     const textContent = responseMessage.text.filter(item => !item.link).map(item => item.text).join(', ');
  //     const audioReadyText = await this.iaSchema.remapResponseForAudio(textContent);

  //     // Create audio file from response text
  //     const audioFilePath = await this.iaAudioModel.createAudioFileFromText(audioReadyText);

  //     // Prepare message to send, including audio file and links if present
  //     const messageToSend = [
  //       { audio: audioFilePath },
  //       ...responseMessage.text.filter(item => item.link),
  //     ];

  //     // Send the audio response and any additional text/links
  //     await this.whatsappService.sendMessage(messageToSend);
  //   }
  // }
}
