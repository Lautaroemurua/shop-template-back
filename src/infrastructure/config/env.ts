// src/infrastructure/config/env.ts

import dotenv from 'dotenv';
import path from 'path';

// Configurar dotenv para cargar el archivo .env
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const config = {
    port: process.env.PORT || 3000,
    openAiApiKey: process.env.OPENAI_API_KEY || '',
    whatsappAccessToken: process.env.WHATSAPP_ACCESS_TOKEN || '',
    whatsappPhoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
    whatsappVerifyToken: process.env.WHATSAPP_VERIFY_TOKEN || ''
};
