import path from "path";
import { ASSETS_FOLDER } from "../../setup/start.js";
import { AiModelAudio } from "../../../interfaces/AiModelAudio.js"
//////////////////////
import { ElevenLabsClient } from "elevenlabs";
import { createWriteStream } from "fs";

import { v4 as uuid } from 'uuid';
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
//////////////////////

const client = new ElevenLabsClient({
  apiKey: ELEVENLABS_API_KEY,
});

export class ElevenLabs implements AiModelAudio {
  async createAudioFileFromText(text: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const audio = await client.generate({
          voice: "w7IU2bIH6xHcyfkUUWi3",
          model_id: "eleven_turbo_v2_5",
          text,
        });

        const fileName = `${uuid()}.mp3`;
        const downloadDir = path.join(ASSETS_FOLDER, "mp3"); // Ajusta la ruta según tu estructura de directorios
        const mp3FilePath = path.join(downloadDir, fileName);
        const fileStream = createWriteStream(mp3FilePath);

        audio.pipe(fileStream);
        fileStream.on("finish", () => resolve(fileName));
        fileStream.on("error", reject);
      } catch (error) {
        reject(error);
      }
    });
  };
}
