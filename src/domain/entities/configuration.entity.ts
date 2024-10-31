import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('configuration')
export class ConfigurationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'personalidad' }) // Aquí puedes usar el nombre original
  personality: string;

  @Column({ name: 'formatorespuesta' }) // Aquí también
  responseFormat: string;
}