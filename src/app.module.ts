import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from 'src/domain/entities/conversation.entity';
import { LlamaService } from './infrastructure/llama/llama.service';
import { WhatsAppService } from './infrastructure/whatsapp/whatsapp.service';
import { MessageController } from './presentation/message/message.controller';
import { ProcessMessageUseCase } from './application/use-cases/process-message.use-case';
import { OpenAiService } from './infrastructure/openai/openai.service';
import { ConversationRepository } from './infrastructure/database/conversation.repository';
import { typeOrmConfig } from './infrastructure/database/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Conversation]), // Registra la entidad
  ],
  controllers: [MessageController],
  providers: [LlamaService, WhatsAppService, ProcessMessageUseCase, OpenAiService, ConversationRepository],
})
export class AppModule {}