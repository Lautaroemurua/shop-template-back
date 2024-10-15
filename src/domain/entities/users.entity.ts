import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users') // Puedes especificar el nombre de la tabla si es necesario
export class Users {
  @PrimaryGeneratedColumn('uuid')  // Genera UUID automáticamente
  id: string;

  @Column()
  number: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })  // Usa CURRENT_TIMESTAMP para PostgreSQL
  createdAt: Date;
}
