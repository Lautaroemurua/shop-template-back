// src/application/services/whatsapp/whatsapp.service.ts
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WhatsAppService {
  private readonly logger = new Logger(WhatsAppService.name);
  private readonly WZ_ID: string;

  constructor() {
    // this.WZ_ID = this.VER ACAAAAAAA.get<string>('WZ_ID') || '';
  }

  async markAsRead(messageId: string) {
    this.logger.log(`Sending read receipt for message ID: ${messageId}`);
    try {
      const { data } = await axios.post(
        `https://graph.facebook.com/v19.0/${this.WZ_ID}/messages`,
        {
          messaging_product: 'whatsapp',
          status: 'read',
          message_id: messageId,
        },
      );
      this.logger.log('Message marked as read:', data.success);
    } catch (error) {
      this.logger.error('Error marking message as read:', error);
    }
  }

  async sendMessage(
    userId: string,
    messages: { text?: string; audio?: string; image?: { link: string; caption?: string } }[],
  ) {
    this.logger.log(`Sending message to user: ${userId}`);
    try {
      for (const message of messages) {
        let payload;

        if (message.text) {
          payload = {
            type: 'text',
            text: { preview_url: false, body: message.text },
          };
        } else if (message.audio) {
          payload = {
            type: 'audio',
            audio: { link: message.audio },
          };
        } else if (message.image) {
          payload = {
            type: 'image',
            image: { link: message.image.link, caption: message.image.caption },
          };
        }

        await axios.post(
          `https://graph.facebook.com/v19.0/${this.WZ_ID}/messages`,
          {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: userId,
            ...payload,
          },
        );
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(250);
      }
      this.logger.log('Messages sent successfully');
    } catch (error) {
      this.logger.error('Error sending message:', error);
    }
  }
}
