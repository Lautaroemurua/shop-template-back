import { Injectable, Logger } from '@nestjs/common';
import { encode } from 'gpt-3-encoder';
import { chatGptSchema } from 'src/domain/schema/chatGpt.schema';
import { openAi } from 'src/setup/openAi';
import {
  ChatCompletion,
  ChatCompletionAssistantMessageParam,
  ChatCompletionMessage,
  ChatCompletionMessageParam,
  ChatCompletionMessageToolCall,
  ChatCompletionSystemMessageParam,
  ChatCompletionToolMessageParam,
  ChatCompletionUserMessageParam,
} from 'openai/resources';
import { RoleEnum } from 'src/domain/enums/role.enum';
import fs, { createWriteStream } from 'fs';
import { ChatResponseInterface } from 'src/domain/interfaces/chat-response.interface';
import { IaInterface } from 'src/domain/interfaces/ia.interface';
import { ElevenLabsClient } from 'elevenlabs';
import { v4 as uuid } from 'uuid';
import { FunctionTool } from 'src/domain/interfaces/function-tools.interface';
import { ProfilingInterface } from 'src/domain/interfaces/Profiling.interface';
import { chatGptSchemaProfiling } from 'src/domain/schema/chatGptProfiling.schema';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

const client = new ElevenLabsClient({
  apiKey: ELEVENLABS_API_KEY,
});

@Injectable()
export class ChatGptService {
  private logger: Logger = new Logger('ChatGpt');
  private tools: FunctionTool[] = [];
  private availableFunctions: {
    [key: string]: (args: any) => Promise<string>;
  } = {};

  private modelAi = 'gpt-4o-mini'; // Reemplaza con el nombre real del modelo
  private context: ChatCompletionMessageParam[] = [];

  constructor(
    initialPrompt?: string,
    tools: FunctionTool[] = [],
    loggerInit?: Logger,
  ) {
    this.logger = loggerInit || new Logger('ChatGpt'); // Use the provided logger or create a new one
    this.logger.log('ChatGpt -- Iniciando');
    this.tools = tools;

    if (initialPrompt) {
      this.setInitialSystemPrompt(initialPrompt);
    }

    if (this.tools) {
      this.setAvailableFunctions();
    }
  }

  setInitialSystemPrompt(initialPrompt: string) {
    this.addSystemMessage(initialPrompt);
  }

  async setContext(context: ChatCompletionMessage[]): Promise<void> {
    this.context = [
      ...this.context,
      ...(context as ChatCompletionMessageParam[]),
    ];
  }

  protected async replyMessage(withTools = true): Promise<ChatCompletion> {
    this.logger.log('Sending message to OpenAI');

    const systemResponse = await openAi.chat.completions.create({
      model: this.modelAi,
      messages: this.context,
      temperature: 0.2,
      max_tokens: 1024,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      tools: withTools && this.tools.length ? this.tools : undefined,
      tool_choice: withTools && this.tools.length ? 'auto' : undefined,
      response_format: {
        type: 'json_schema',
        json_schema: chatGptSchema,
      },
    });

    this.logger.log('OpenAI response received');
    return systemResponse;
  }

  protected addMessageUser(message: string) {
    this.logger.log('Adding user message to context');

    const msgUser: ChatCompletionUserMessageParam = {
      role: RoleEnum.USER,
      content: message,
    };

    this.context.push(msgUser);
  }

  protected addSystemMessage(message: string) {
    this.logger.log('Adding system response to context');

    const messageParsed: ChatCompletionSystemMessageParam = {
      role: RoleEnum.SYSTEM,
      content: message,
    };

    this.context.push(messageParsed);
  }

  protected addAssistantMessage(
    message: string | null,
    tool?: ChatCompletionMessageToolCall[],
  ) {
    this.logger.log('Adding assistant response to context');
    const msg: ChatCompletionAssistantMessageParam = {
      role: RoleEnum.ASSISTANT,
      content: message,
      tool_calls: tool,
    };
    this.context.push(msg);
  }

  protected addMessageTools(toolCallId: string, functionResponse: string) {
    this.logger.log('Adding function response to context');

    const msg: ChatCompletionToolMessageParam = {
      tool_call_id: toolCallId,
      role: 'tool',
      content: functionResponse,
    };

    this.context.push(msg);
  }

  private setAvailableFunctions() {
    this.logger.log('Loading available functions');
    this.tools.forEach((tool) => {
      this.availableFunctions[tool.function.name] = tool.execute;
    });
  }

  protected async executeFunctions(
    toolCalls: ChatCompletionMessageToolCall[],
  ): Promise<void> {
    this.logger.log('Executing functions');

    for (const toolCall of toolCalls) {
      this.logger.log('Executing tool:', toolCall.function.name);
      this.logger.log('Arguments:', toolCall.function.arguments);

      const functionName = toolCall.function.name;
      const functionToCall = this.availableFunctions[functionName];
      const functionArgs = JSON.parse(toolCall.function.arguments);

      if (!functionToCall) {
        this.logger.warn(`Function "${functionName}" not found`);
        continue;
      }

      try {
        const functionResponse = await functionToCall(functionArgs);
        this.addMessageTools(toolCall.id, functionResponse);
      } catch (error) {
        this.logger.error(`Error executing function "${functionName}":`, error);
      }
    }
  }

  getHistory() {
    this.logger.log('Total messages in context:', this.context.length);
    return this.context;
  }

  async transcriptionsAudio(mp3FilePath: string) {
    this.logger.log('Sending audio for transcription');
    const transcription = await openAi.audio.transcriptions.create({
      file: fs.createReadStream(mp3FilePath),
      model: 'whisper-1',
    });
    this.logger.log('Transcription completed');
    return transcription.text;
  }

  async processMessage(): Promise<ChatResponseInterface | null> {
    try {
      this.logger.log('ChatGpt -- Procesando mensaje');

      // chat responde contexto
      let responeseChat = await this.replyMessage();

      this.addAssistantMessage(
        responeseChat.choices[0].message.content,
        responeseChat.choices[0].message.tool_calls,
      );

      if (responeseChat.choices[0].message.tool_calls) {
        // se ejecutan todas las funciones
        await this.executeFunctions(
          responeseChat.choices[0].message.tool_calls,
        );

        responeseChat = await this.replyMessage(false);
        this.addAssistantMessage(responeseChat.choices[0].message.content);
      }

      if (responeseChat.choices[0].message.content) {
        const response: ChatResponseInterface = {
          mensaje: responeseChat.choices[0].message.content,
          rol: RoleEnum.ASSISTANT,
          tokens: responeseChat.usage?.completion_tokens ?? 0,
        };

        this.logger.log('ChatGpt -- Mensaje procesado');
        return response;
      }
    } catch (e) {
      this.logger.log('ChatGpt -- error', e);
    }
    return null;
  }

  protected normalizeOutput(message: string | null): any[] {
    if (!message) return [];

    this.logger.log(`Normalizing output: ${message}`);
    try {
      const parsedMessage = JSON.parse(message) as { response: IaInterface[] };
      const response = parsedMessage.response;

      const texts = response
        .filter((item) => item.text)
        .map((item) => ({ text: item.text }));
      const images = response
        .filter((item) => item.link)
        .map((item) => ({ link: item.link, caption: item.caption }));

      return [...texts, ...images];
    } catch (error) {
      this.logger.error('Error normalizing message output:', error);
      return [];
    }
  }

  async createAudioFileFromText(text: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const audio = await client.generate({
          voice: '9oPKasc15pfAbMr7N6Gs',
          model_id: 'eleven_turbo_v2_5',
          text,
        });
        const fileName = `${uuid()}.mp3`;
        const fileStream = createWriteStream(fileName);

        audio.pipe(fileStream);
        fileStream.on('finish', () => resolve(fileName));
        fileStream.on('error', (error) => {
          this.logger.error('Error writing audio file:', error);
          reject(error);
        });
      } catch (error) {
        this.logger.error('Error generating audio:', error);
        reject(error);
      }
    });
  }

  totalTokens(message: string) {
    const enc = encode(message);
    this.logger.log('ChatGpt tokens:', enc.length);
    return enc.length;
  }

  async remapResponseForAudio(message: string) {
    const systemResponse = await openAi.chat.completions.create({
      model: this.modelAi,
      messages: [
        {
          role: 'system',
          content:
            'Resume un mensaje en una sola línea de texto simplificado para facilitar su interpretación por un sistema TTS. Evita el uso de números solo en los precios,  nomenclaturas técnicas, y escribe marcas o nombres complejos según su pronunciación fonética. Si tienes muchos precios, informa los rangos de precios y el motivo de la variación',
        },
        {
          role: 'user',
          content: message,
        },
      ], // manda todos los messages de usuario hasta el momento
      temperature: 0.2,
      max_tokens: 1024,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    this.logger.log('ChatGpt -- OK');

    return systemResponse.choices[0].message.content ?? '';
  }

  async generateConversationSummary(
    messages: string[],
  ): Promise<ProfilingInterface> {
    // Existen messages por resumir
    if (messages.length === 0) {
      return { suggestion: '', summary: 'No se pudo generar un resumen.' };
    }

    try {
      const userMessages = messages.join(' | ');

      const resumen = await openAi.chat.completions.create({
        model: this.modelAi,
        messages: [
          {
            role: 'system',
            content:
              'Eres un asistente avanzado que genera perfiles de usaurios en un objeto JSON para el post-procesado de datos',
          },
          { role: 'user', content: userMessages },
        ],
        seed: 42,
        max_tokens: 1024,
        response_format: {
          type: 'json_schema',
          json_schema: chatGptSchemaProfiling,
        },
      });

      return JSON.parse(resumen.choices?.[0]?.message?.content || '');
    } catch (error) {
      console.error('Error al generar resumen:', error);
      return { suggestion: '', summary: 'Error al generar resumen' };
    }
  }
}
