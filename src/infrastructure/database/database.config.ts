import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Conversation } from 'src/domain/entities/conversation.entity';
import { Mesages } from 'src/domain/entities/messages.entity';
import { Users } from 'src/domain/entities/users.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mssql',
  host: 'localhost',        // Cambia esto si usas otro host
  port: 1433,               // Puerto predeterminado de MSSQL
  username: 'tu_usuario',   // Cambia esto a tu usuario
  password: 'tu_contraseña', // Cambia esto a tu contraseña
  database: 'tu_base_de_datos', // Cambia esto al nombre de tu base de datos
  entities: [Conversation, Mesages, Users],
  synchronize: true,        // Solo en desarrollo; elimina en producción
  options: {
    encrypt: false, // Puedes cambiar esto si es necesario
    enableArithAbort: true,
  },
};
