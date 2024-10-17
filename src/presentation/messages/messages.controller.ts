import { Controller, Post, Body } from '@nestjs/common';
import { ConversationService } from '../../application/services/conversation/conversation.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post('start')
  async startConversation(@Body('userId') userId: string, @Body('summary') summary: string) {
    return await this.conversationService.startConversation(userId, summary);
  }

  @Post('user')
  async saveUserMessage(
    @Body('conversationId') conversationId: string,
    @Body('message') message: string,
    @Body('tokens') tokens: number,
  ) {
    return await this.conversationService.saveUserMessage(conversationId, message, tokens);
  }

  @Post('assistant')
  async saveAssistantMessage(
    @Body('conversationId') conversationId: string,
    @Body('message') message: string,
    @Body('tokens') tokens: number,
  ) {
    return await this.conversationService.saveAssistantMessage(conversationId, message, tokens);
  }
}
