import { Controller, Post, Body, Query } from '@nestjs/common';
import { WhatsAppService } from 'src/infrastructure/whatsapp/whatsapp.service';


@Controller('whatsapp')
export class WhatsAppController {
  constructor(private readonly whatsappService: WhatsAppService) {}

  @Post('webhook')
  async receiveMessage(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
  ) {
    if (mode && token) {
      if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
        console.log('Webhook verified!');
        return challenge;
      } else {
        throw new Error('Verification failed');
      }
    }
  }
  
}
