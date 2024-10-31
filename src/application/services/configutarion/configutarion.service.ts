// src/application/services/configuration.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { ConfigurationEntity } from '../../../domain/entities/configuration.entity'

@Injectable()
export class ConfigurationService {
  constructor(
    @InjectRepository(ConfigurationEntity)
    private readonly configRepository: Repository<ConfigurationEntity>,
  ) {}

  async getPersonality(): Promise<string> {
    const options: FindOneOptions<ConfigurationEntity> = {};
    const config = await this.configRepository.findOne(options); // Pasa el objeto de opciones
    return config?.personality ?? 'default';
  }
}
