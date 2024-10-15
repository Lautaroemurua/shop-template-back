// src/whatsapp/whatsapp.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { SpeechToTextService } from 'src/application/services/speech-to-text/speech-to-text.service';

@Injectable()
export class WhatsAppService {
  constructor(private readonly speechToTextService: SpeechToTextService){}
  async getNLPResponse(message: string): Promise<string> {
    const apiUrl = 'https://api.nlpcloud.io/v1/endpoint'; // Ajusta con la URL real
    const response = await axios.post(apiUrl, {
      text: message,
      apiKey: process.env.NLP_CLOUD_API_KEY,
    });
    return response.data.result;
  }

  async processMessage(body: any) {
    // Aquí se espera que el cuerpo contenga información sobre el mensaje
    const message = body.messages[0];
    if (message.type === 'audio') {
      const audioUrl = message.audio_url; // Suponiendo que el URL del audio está en este campo
      const text = await this.speechToTextService.convertAudioToText(audioUrl);
      console.log('Converted text:', text);
      // Aquí puedes enviar el texto de vuelta a WhatsApp o procesarlo de otra manera
    }
  }
}
