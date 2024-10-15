import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('messages') // Asegúrate de que el nombre de la tabla sea correcto
export class Messages {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  conversation_id: string;

  @Column()
  message: string;

  @Column()
  role: string;

  @Column()
  tokens: number;

  // Puedes añadir más columnas según sea necesario
}
