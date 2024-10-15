import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SpeechToTextService {
  async convertAudioToText(audioUrl: string): Promise<string> {
    // Configura la llamada a la API de Llama o cualquier otra API de Speech-to-Text
    const response = await axios.post('API_URL', {
      audio_url: audioUrl,
      // Otros parámetros si es necesario
    });
    return response.data.transcript; // Asume que la respuesta tiene un campo 'transcript' con el texto
  }
}
