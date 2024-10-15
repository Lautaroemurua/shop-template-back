import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LlamaService } from './infrastructure/llama/llama.service';
import { WhatsAppService } from './infrastructure/whatsapp/whatsapp.service';
import { MessageController } from './presentation/message/message.controller';
import { ProcessMessageUseCase } from './application/use-cases/process-message.use-case';
import { OpenAiService } from './infrastructure/openai/openai.service';
import { ConversationRepository } from './infrastructure/database/conversation.repository';
import { typeOrmModuleConfig } from './infrastructure/database/database.config';
import { ConversationEntity } from './domain/entities/conversation.entity';
import { ConversationService } from './application/services/conversation/conversation.service';
import { Messages } from './domain/entities/messages.entity';
import { MessagesRepository } from './application/repositories/messages.repository';
import { WhatsAppController } from './presentation/whatsapp/whatsapp.controller';
import { SpeechToTextService } from './application/services/speech-to-text/speech-to-text.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmModuleConfig),
    TypeOrmModule.forFeature([ConversationEntity, Messages]) // Asegúrate de importar aquí también
  ],
  controllers: [MessageController, WhatsAppController],
  providers: [
    LlamaService, 
    WhatsAppService, 
    ProcessMessageUseCase, 
    OpenAiService, 
    ConversationRepository, 
    MessagesRepository,
    ConversationService,
    SpeechToTextService
  ],
  exports: [ConversationService]
})
export class AppModule {}
