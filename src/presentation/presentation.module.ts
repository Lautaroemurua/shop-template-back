// src/presentation/presentation.module.ts
import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { WhatsAppController } from './whatsapp/whatsapp.controller';

@Module({
    imports: [ApplicationModule],
    controllers: [WhatsAppController],
})
export class PresentationModule {}
