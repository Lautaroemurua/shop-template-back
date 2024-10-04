
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import path from "path";
import fs from "fs";
import { ASSETS_FOLDER } from "../setup/start.js";

ffmpeg.setFfmpegPath(ffmpegPath.path);

export const convertirOggToMp3 = async (oggFilePath, fileName) => {
  return new Promise<string>((resolve, reject) => {
    const downloadDir = path.join(ASSETS_FOLDER, "mp3"); // Ajusta la ruta según tu estructura de directorios
    const mp3FilePath = path.join(downloadDir, fileName + '.mp3');

    console.log(`Guardando archivo en ${downloadDir}`);

    if (!fs.existsSync(downloadDir)) {
      console.log(`Creando carpeta ${downloadDir}`);
      fs.mkdirSync(downloadDir);
    }

    console.log("convirtiendo...");

    ffmpeg()
      .input(oggFilePath)
      .output(mp3FilePath)
      .format("mp3")
      .on("end", () => {
        console.log("Conversión completada con éxito");
        resolve(mp3FilePath);
      })
      .on("error", (err, stdout, stderr) => {
        console.error("Error al convertir el archivo:", err.message);
        console.error("stdout:", stdout);
        console.error("stderr:", stderr);
        reject(err);
      })
      .run();
  });
};