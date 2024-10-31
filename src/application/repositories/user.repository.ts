// src/application/repositories/user.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async findByPhone(phone: string): Promise<UserEntity | undefined> {
        return this.userRepository.findOne({ where: { phone } });
    }

    async createUser(phone: string): Promise<UserEntity> {
        const user = this.userRepository.create({ phone });
        return this.userRepository.save(user);
    }
}
