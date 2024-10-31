import dotenv from 'dotenv'
import path from 'path';
dotenv.config()

export const ASSETS_FOLDER = path.join(process.cwd(), "media");