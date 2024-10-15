import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions, DataSource } from 'typeorm';
import { join } from 'path';
import { config } from 'dotenv';

config();

// Configuración para TypeORM dentro de los módulos de NestJS
export const typeOrmModuleConfig: TypeOrmModuleOptions = {
  type: 'postgres',  // Tipo de base de datos
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'mydatabase',
  entities: [join(__dirname, '../../domain/entities/*.entity{.ts,.js}')],
  synchronize: true,  // Solo para desarrollo
  retryAttempts: 3,
  retryDelay: 3000,
  autoLoadEntities: true,
  keepConnectionAlive: true,
};

// Configuración de `DataSource` para inicializar la conexión a la base de datos
export const typeOrmDataSourceConfig: DataSourceOptions = {
  type: 'postgres',  // Tipo de base de datos
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'mydatabase',
  entities: [join(__dirname, '../../domain/entities/*.entity{.ts,.js}')],
  synchronize: true,  // Solo para desarrollo
};

// Crear instancia de `DataSource` para ejecutar consultas directas
export const AppDataSource = new DataSource(typeOrmDataSourceConfig);


//por que esta configuracion?

// Diferencias entre las configuraciones:
// typeOrmModuleConfig: Es utilizado por el módulo de TypeORM en NestJS y contiene propiedades como retryAttempts, autoLoadEntities,
//  etc., que son propias de la integración de TypeORM con NestJS.
// typeOrmDataSourceConfig: Esta configuración es utilizada por TypeORM en su versión pura (sin NestJS) para crear una instancia de DataSource,
//  que no admite algunas propiedades que son específicas de NestJS.