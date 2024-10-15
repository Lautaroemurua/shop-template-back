import { Controller, Post, Body } from '@nestjs/common';
import { WhatsAppService } from 'src/infrastructure/whatsapp/whatsapp.service';


@Controller('whatsapp')
export class WhatsAppController {
  constructor(private readonly whatsappService: WhatsAppService) {}

  @Post('webhook')
  async receiveMessage(@Body() body: any) {
    console.log('Received WhatsApp message:', body);
    // Procesa el mensaje
    await this.whatsappService
  }
}
