import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainModule } from '../domain/domain.module';
import { LlamaService } from './ia/llama/llama.service';
import { WhatsAppClient } from './chat/whatsapp/whatsapp.client';
import { OpenAiClient } from './ia/openai/openai.client';
import { typeOrmModuleConfig } from './database/database.config';
import { SpeechToTextService } from '../application/services/speech-to-text/speech-to-text.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmModuleConfig),
    DomainModule,
  ],
  providers: [
    LlamaService,
    WhatsAppClient,
    OpenAiClient,
    SpeechToTextService,
  ],
  exports: [
    TypeOrmModule,
    LlamaService,
    WhatsAppClient,
    OpenAiClient,
    DomainModule,
  ]
})
export class InfrastructureModule {}
