import { Injectable } from '@nestjs/common';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import path from 'path';
import fs from 'fs';

ffmpeg.setFfmpegPath(ffmpegPath.path);

@Injectable()
export class AudioService {
  async convertirOggToMp3(oggFilePath: string, fileName: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const downloadDir = path.join(__dirname, '..', 'assets', 'mp3');
      const mp3FilePath = path.join(downloadDir, `${fileName}.mp3`);

      if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir);
      }

      ffmpeg()
        .input(oggFilePath)
        .output(mp3FilePath)
        .format('mp3')
        .on('end', () => resolve(mp3FilePath))
        .on('error', (err) => reject(err))
        .run();
    });
  }
}
