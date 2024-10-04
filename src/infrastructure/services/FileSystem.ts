import path from "path";
import fs from "fs";
import { ASSETS_FOLDER } from "../setup/start.js";


export const guardarArchivoOgg = async (file, fileName) => {
  const downloadDir = path.join(ASSETS_FOLDER, "ogg"); // Ajusta la ruta según tu estructura de directorios

  console.log(`Guardando archivo en ${downloadDir}`);

  if (!fs.existsSync(downloadDir)) {
    console.log(`Creando carpeta ${downloadDir}`);
    fs.mkdirSync(downloadDir);
  }

  const oggFilePath = path.join(downloadDir, fileName);
  fs.writeFileSync(oggFilePath, file);

  console.log(`Archivo de audio descargado y guardado en ${oggFilePath}`);
  return oggFilePath
};