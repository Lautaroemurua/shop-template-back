import { Injectable } from '@nestjs/common';
import { AiFacade } from './ai-facade.interface';
import { LlamaService } from '../../infrastructure/llama/llama.service';
// import { OpenAiService } from '../../openai/openai.service'; // Crearás este servicio luego

@Injectable()
export class AiFacadeService implements AiFacade {
  constructor(
    private readonly llamaService: LlamaService,
    // private readonly openAiService: OpenAiService // Asegúrate de crearlo e importarlo
  ) {}

  async generateResponse(input: string): Promise<string> {
    const useLlama = true; // Puedes hacer que esto sea configurable desde una variable de entorno

    if (useLlama) {
      return //this.llamaService.generateResponse(input);
    } else {
    //   return this.openAiService.generateResponse(input);
    }
  }
}
