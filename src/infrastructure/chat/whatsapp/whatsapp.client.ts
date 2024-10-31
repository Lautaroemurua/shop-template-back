// src/infrastructure/whatsapp/whatsapp.client.ts
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { SpeechToTextService } from '../../../application/services/speech-to-text/speech-to-text.service';

@Injectable()
export class WhatsAppClient {
  private readonly logger = new Logger(WhatsAppClient.name);

  constructor(private readonly speechToTextService: SpeechToTextService) {}

  async processAudioMessage(audioUrl: string): Promise<string> {
    try {
      const text = await this.speechToTextService.convertAudioToText(audioUrl);
      this.logger.log(`Audio converted to text: ${text}`);
      return text;
    } catch (error) {
      this.logger.error('Error processing audio message:', error);
      throw error;
    }
  }
}
