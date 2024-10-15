// src/llama/llama.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LlamaService {
  async getLlamaResponse(message: string): Promise<string> {
    const apiUrl = 'https://api.llama.example.com/v1/process'; // Ajusta con la URL real
    const response = await axios.post(apiUrl, {
      prompt: message,
      apiKey: process.env.LLAMA_API_KEY,
    });
    return response.data.result;
  }
}
