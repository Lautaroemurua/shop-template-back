// src/presentation/presentation.module.ts
import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';

@Module({
  imports: [ApplicationModule],
})
export class PresentationModule {}