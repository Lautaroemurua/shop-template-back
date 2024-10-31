// src/infrastructure/infrastructure.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainModule } from '../domain/domain.module'; // Asegúrate de importar DomainModule
import { LlamaService } from './llama/llama.service';
import { WhatsAppService } from './whatsapp/whatsapp.service';
import { OpenAiService } from './openai/openai.service';
import { typeOrmModuleConfig } from './database/database.config';
import { SpeechToTextService } from '../application/services/speech-to-text/speech-to-text.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmModuleConfig),
    DomainModule,
  ],
  providers: [
    LlamaService,
    WhatsAppService,
    OpenAiService,
    SpeechToTextService,
  ],
  exports: [
    TypeOrmModule,
    LlamaService,
    WhatsAppService,
    OpenAiService,
    DomainModule, // Asegúrate de exportar DomainModule
  ]
})
export class InfrastructureModule {}
