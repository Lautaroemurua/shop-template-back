// src/infrastructure/filesystem/filesystem.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { ASSETS_FOLDER } from 'src/setup/start';


@Injectable()
export class FileSystemService {
  private readonly logger = new Logger(FileSystemService.name);

  async saveOggFile(file: Buffer, fileName: string): Promise<string> {
    const downloadDir = path.join(ASSETS_FOLDER, 'ogg');

    this.logger.log(`Guardando archivo en ${downloadDir}`);

    if (!fs.existsSync(downloadDir)) {
      this.logger.log(`Creando carpeta ${downloadDir}`);
      fs.mkdirSync(downloadDir, { recursive: true });
    }

    const oggFilePath = path.join(downloadDir, fileName);
    fs.writeFileSync(oggFilePath, file);

    this.logger.log(`Archivo de audio descargado y guardado en ${oggFilePath}`);
    return oggFilePath;
  }

  getMp3FilePath(fileName: string): string {
    const downloadDir = path.join(ASSETS_FOLDER, 'mp3');
    const mp3FilePath = path.join(downloadDir, `${fileName}.mp3`);
    
    this.logger.log(`Obteniendo la ruta del archivo MP3: ${mp3FilePath}`);
    return mp3FilePath;
  }
}
