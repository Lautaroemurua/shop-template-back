// src/application/use-cases/handle-message.usecase.ts

import { Message } from "../../domain/entities/message";
import { ChatGPTService } from "../../infrastructure/services/chatgpt/chatgpt.service";
import { WhatsAppService } from "../../infrastructure/services/whatsapp/whatsapp.service";

export class HandleMessageUseCase {
    constructor(
        private chatgptService: ChatGPTService,
        private whatsappService: WhatsAppService
    ) {}

    async execute(message: Message): Promise<void> {
        const gptResponse = await this.chatgptService.sendMessageToChatGPT(message.content);
        await this.whatsappService.sendMessageToWhatsApp(message.from, gptResponse);
    }
}
