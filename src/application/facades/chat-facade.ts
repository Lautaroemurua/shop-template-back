import { Injectable } from '@nestjs/common';
import { WhatsAppService } from '../services/whatsapp/whatsapp.service'; // Ajusta la ruta según sea necesario

@Injectable()
export class ChatFacade {
    constructor(private readonly whatsappService: WhatsAppService) {}

  async procesarMensajeTexto(messageId: string, messageText: string, personality: string) {
    // Procesa el mensaje de texto con la personalidad
    console.log('Procesando mensaje de texto:', messageText, 'con personalidad:', personality);
    // Lógica de procesamiento aquí
    return `Mensaje procesado con personalidad: ${personality}`;
  }

  async procesarMensajeAudio(messageId: string, audioId: string, personality: string) {
    // Procesa el mensaje de audio con la personalidad
    console.log('Procesando mensaje de audio:', audioId, 'con personalidad:', personality);
    // Lógica de procesamiento aquí
    return `Audio procesado con personalidad: ${personality}`;
  }

  getHistory() {
    // Devuelve el historial de mensajes, si es necesario
    return [];
  }
}
