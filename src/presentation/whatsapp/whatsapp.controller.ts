// src/presentation/whatsapp/whatsapp.controller.ts
import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { ConfigurationService } from '../../application/services/configutation/configutation.service';
import { WhatsAppService } from '../../application/services/whatsapp/whatsapp.service';
import { ChatFacade } from '../../application/facades/chat.facade';
import { Response } from 'express';

@Controller('whatsapp')
export class WhatsAppController {
  conversationService: any;
    constructor(
        private readonly configurationService: ConfigurationService,
        private readonly whatsappService: WhatsAppService,
        private readonly chatFacade: ChatFacade, // Asegúrate de que ChatFacade esté aquí
    ) {}

  @Get('webhook')
  async validateWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
  ) {
    if (mode && token) {
      if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
        console.log('Webhook verified!');
        return challenge;
      } else {
        // Lanza una excepción con estado 403 Forbidden si el token no es correcto
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
    } else {
      // Si faltan parámetros, puedes lanzar otra excepción, por ejemplo, con estado 400 Bad Request
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('webhook')
  async handleWebhook(@Body() whatsappData: any, @Res() res: Response) {
    try {
      if (!whatsappData) {
        return res.status(HttpStatus.BAD_REQUEST).send('Datos no validados');
      }
  
      const personality = await this.configurationService.getPersonality();
      const phone = whatsappData.entry[0].changes[0].value.contacts[0].wa_id // Asumiendo que el número de teléfono está en whatsappData.from
  
      // Iniciar la conversación, creando el usuario si no existe
      const conversation = await this.conversationService.startConversation(phone);
      console.log('Conversación iniciada:', conversation);
  
      switch (whatsappData.messages.type) {
        case 'text':
          const messagesWZ = whatsappData.messages.text?.body;
          if (!messagesWZ) {
            res.sendStatus(HttpStatus.OK);
            return;
          }
          const mensajeProcesadoIA = await this.chatFacade.procesarMensajeTexto(
            whatsappData.messages.id,
            messagesWZ,
            personality,
          );
          console.log('Mensaje procesado:', mensajeProcesadoIA);
          break;
        case 'audio':
          const audioWz = whatsappData.messages.audio;
          if (!audioWz) {
            res.sendStatus(HttpStatus.OK);
            return;
          }
          await this.chatFacade.procesarMensajeAudio(
            whatsappData.messages.id,
            audioWz.id,
            personality,
          );
          break;
      }
  
      res.send(this.chatFacade.getHistory());
    } catch (e) {
      console.error('Error starting conversation:', e);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error starting conversation');
    }
  }
  
}
