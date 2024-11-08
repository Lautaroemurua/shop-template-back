import { Injectable } from '@nestjs/common';
import { ChatServiceImplementation } from 'src/infrastructure/implementations/chat.service.implementation';
import { RoleEnum } from 'src/domain/enums/role.enum';
import { IaServiceImplementation } from 'src/infrastructure/implementations/ia.service.implementation';
import { ContextInterface } from 'src/domain/interfaces/context.interface';
import { ConversationInterface, UserInterface } from 'src/domain/interfaces';
import { DatabaseImplementationService } from 'src/infrastructure/implementations/database.implementation.service';

@Injectable()
export class ChatFacade {
  constructor(
    private readonly chatServiceImplementation: ChatServiceImplementation,
    private readonly iaServiceImplementation: IaServiceImplementation,
    private readonly databaseImplementationService: DatabaseImplementationService,
  ) {}

  async resolveConversation() {
    let conversation: ConversationInterface;
    const user_id = this.chatServiceImplementation.getId();
    const user =
      await this.databaseImplementationService.findOrCreateUser(user_id);

    // If user was successfully found or created, proceed with conversation
    const lastUserConversation =
      await this.databaseImplementationService.findLastConversation(user.id);

    if (lastUserConversation?.id) {
      if (!lastUserConversation?.summary) {
        conversation = lastUserConversation;
      } else {
        // Si la última conversacion tiene resumen, iniciamos una nueva conversacion e incorporamos el resumen como primer mensaje
        const newConversation =
          await this.databaseImplementationService.createConversation(
            lastUserConversation.user_id,
          );
          conversation = newConversation;

          // Agregamos el primer mensaje que es el resumen realizado por el asistente
        const initialSummaryMessage = 'Resumen de conversación anterior: ' + lastUserConversation.summary;
        await this.databaseImplementationService.addMessageToConversation(
          conversation.id,
          conversation.messages.length,
          initialSummaryMessage,
          RoleEnum.SYSTEM,
          this.iaServiceImplementation.totalTokens(initialSummaryMessage)
        );
        conversation = newConversation;
      }
    } else {
      // Si NO existe una conversacion, iniciamos una nueva conversacion vacio
      const newConversation =
        await this.databaseImplementationService.createConversation(
          user.id, // Cambiado para utilizar el user_id correcto
        );
      conversation.id = newConversation.id;
    }
    return conversation;
  }

  async processTextMessage(
    messageId?: string,
    message?: string,
    userData?: UserInterface
  ): Promise<void> {
    try {
      const conversation = await this. resolveConversation()

      await this.databaseImplementationService.addMessageToConversation(
        conversation.id,
        conversation.messages.length,
        message,
        RoleEnum.USER,
        this.iaServiceImplementation.totalTokens(message)
      )

      const messages =
        await this.databaseImplementationService.getConversationMessages(
          conversation.id,
        );

      // Modificar la creación de context para que sea un array de ContextInterface
      const context: ContextInterface[] = messages.map((message) => ({
        id: message.id, // Asumiendo que cada message tiene un ID
        message: message.message, // Asegúrate de que esto esté en el objeto
        role: message.role, // Este es opcional
      }));

      this.iaServiceImplementation.setContext(context);
    } catch (error) {
      // Handle errors gracefully and log them if needed
      console.error('Error processing text message:', error);
    }
    await this.chatServiceImplementation.markMessageAsRead(messageId);
  }
}

// async processAudioMessage(messageId: string, audioId: string): Promise<void> {
//   // Download audio from WhatsApp
//   const audioData = await this.chatServiceImplementation.downloadMedia(audioId);

//   // Save the audio in the media folder as .ogg
//   const oggFilePath = await guardarArchivoOgg(audioData, `${audioId}.ogg`);

//   // Convert the .ogg file to .mp3
//   const mp3FilePath = await convertirOggToMp3(oggFilePath, audioId);

//   // Transcribe the audio file to get text
//   const transcription = await this.iaAudioModel.transcribeAudio(mp3FilePath);

//   // Mark the message as read
//   await this.chatServiceImplementation.markAsRead(messageId);

//   // Calculate tokens for the transcribed message
//   this.iaServiceImplementation.calculateTokens(transcription);

//   // Log the transcription
//   console.log('Transcription:', transcription);

//   // Process the transcribed text and get a response
//   const responseMessage = await this.iaServiceImplementation.processMessage(transcription);

//   if (responseMessage) {
//     // Filter and reformat text response for audio output
//     const textContent = responseMessage.text.filter(item => !item.link).map(item => item.text).join(', ');
//     const audioReadyText = await this.iaServiceImplementation.remapResponseForAudio(textContent);

//     // Create audio file from response text
//     const audioFilePath = await this.iaAudioModel.createAudioFileFromText(audioReadyText);

//     // Prepare message to send, including audio file and links if present
//     const messageToSend = [
//       { audio: audioFilePath },
//       ...responseMessage.text.filter(item => item.link),
//     ];

//     // Send the audio response and any additional text/links
//     await this.chatServiceImplementation.sendMessage(messageToSend);
//   }
// }