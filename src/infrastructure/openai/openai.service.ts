import { Injectable } from '@nestjs/common';
import { AiFacade } from '../../application/facades/ai-facade.interface';

@Injectable()
export class OpenAiService implements AiFacade {
  async generateResponse(input: string): Promise<string> {
    // Aquí iría tu lógica para interactuar con la API de OpenAI
    return `Response from OpenAI for input: ${input}`;
  }
}
