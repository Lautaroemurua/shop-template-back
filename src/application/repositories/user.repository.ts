// src/application/repositories/user.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>, // Nombre más claro
    ) {}

    // Buscar usuario por número de teléfono
    async findByPhone(phone: string): Promise<UserEntity | undefined> {
        return this.repository.findOne({ where: { phone } });
    }

    // Crear un nuevo usuario
    async createUser(phone: string): Promise<UserEntity> {
        const user = this.repository.create({ phone });
        return this.repository.save(user);
    }
}
