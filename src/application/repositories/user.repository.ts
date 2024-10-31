import { Repository } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
    async findByPhone(phone: string): Promise<UserEntity | undefined> {
        return this.findOne({ where: { phone } });
    }

    async createUser(phone: string): Promise<UserEntity> {
        const user = this.create({ phone });
        return this.save(user);
    }
}
