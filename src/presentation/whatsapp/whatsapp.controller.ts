// src/presentation/whatsapp/whatsapp.controller.ts
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { WhatsAppService } from '../../application/services/whatsapp/whatsapp.service';
import { Response } from 'express';

@Controller('whatsapp')
export class WhatsAppController {
  private readonly logger = new Logger(WhatsAppController.name);

  constructor(private readonly whatsappService: WhatsAppService) {}

  @Get('webhook')
  async validateWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
  ) {
    if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
      this.logger.log('Webhook verified');
      return challenge;
    }
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Post('webhook')
  async handleWebhook(@Body() whatsappData: any, @Res() res: Response) {
    try {
      if (!whatsappData) {
        return res.status(HttpStatus.BAD_REQUEST).send('Invalid data');
      }

      const messageType = whatsappData.entry[0].changes[0].value.messages[0]?.type;
      const messageContent = whatsappData.entry[0].changes[0].value.messages[0];

      switch (messageType) {
        case 'text':
          const textMessage = messageContent.text?.body;
          if (textMessage) {
            await this.whatsappService.sendMessage(messageContent.from, [{ text: textMessage }]);
            this.logger.log('Text message processed and response sent');
          }
          break;
        case 'audio':
          const audioUrl = messageContent.audio?.url;
          if (audioUrl) {
            // Procesar mensaje de audio
            await this.whatsappService.sendMessage(messageContent.from, [{ audio: audioUrl }]);
            this.logger.log('Audio message processed');
          }
          break;
      }
      res.sendStatus(HttpStatus.OK);
    } catch (error) {
      this.logger.error('Error processing webhook:', error);
      res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
