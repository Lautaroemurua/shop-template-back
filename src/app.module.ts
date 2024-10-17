import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LlamaService } from './infrastructure/llama/llama.service';
import { WhatsAppService } from './infrastructure/whatsapp/whatsapp.service';
import { MessagesController } from './presentation/messages/messages.controller';
import { ProcessMessageUseCase } from './application/use-cases/process-message.use-case';
import { OpenAiService } from './infrastructure/openai/openai.service';
import { ConversationRepository } from './infrastructure/repositories/conversation.repository';
import { typeOrmModuleConfig } from './infrastructure/database/database.config';
import { ConversationsEntity } from './domain/entities/conversations.entity';
import { ConversationService } from './application/services/conversation/conversation.service';
import { MessagesEntity } from './domain/entities/messages.entity';
import { MessagesRepository } from './infrastructure/repositories/messages.repository';
import { WhatsAppController } from './presentation/whatsapp/whatsapp.controller';
import { SpeechToTextService } from './application/services/speech-to-text/speech-to-text.service';
import { MessagesService } from './application/services/messages/messages.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmModuleConfig),
    TypeOrmModule.forFeature([ConversationsEntity, MessagesEntity]) // Asegúrate de importar aquí también
  ],
  controllers: [MessagesController, WhatsAppController],
  providers: [
    LlamaService, 
    WhatsAppService, 
    ProcessMessageUseCase, 
    OpenAiService, 
    ConversationRepository, 
    MessagesRepository,
    ConversationService,
    SpeechToTextService,
    MessagesService
  ],
  exports: [ConversationService]
})
export class AppModule {}
