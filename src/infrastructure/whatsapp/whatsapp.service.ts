// src/whatsapp/whatsapp.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WhatsAppService {
  async getNLPResponse(message: string): Promise<string> {
    const apiUrl = 'https://api.nlpcloud.io/v1/endpoint'; // Ajusta con la URL real
    const response = await axios.post(apiUrl, {
      text: message,
      apiKey: process.env.NLP_CLOUD_API_KEY,
    });
    return response.data.result;
  }
}
