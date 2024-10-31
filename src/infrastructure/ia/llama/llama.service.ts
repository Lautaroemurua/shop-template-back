// src/infrastructure/llama/llama.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LlamaService {
  async getLlamaResponse(message: string): Promise<string> {
    // Lógica para realizar la petición a LLaMA API
    const response = await axios.post('URL_LLAMMA_API', { message });
    return response.data.reply;
  }
}
