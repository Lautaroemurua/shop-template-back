import { openAi } from "../../setup/openAi.js";
import { ChatCompletionMessage, ChatCompletionSystemMessageParam, ChatCompletionMessageToolCall, ChatCompletionTool, ChatCompletionUserMessageParam } from "openai/resources";
import fs from "fs";
import { AiModel } from "../../../interfaces/AiModel.js";
import { Logger, logger } from "../logger/Logs.js";
//////////////////////
import { ElevenLabsClient } from "elevenlabs";
import { createWriteStream } from "fs";

import { v4 as uuid } from 'uuid';
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
//////////////////////

const client = new ElevenLabsClient({
  apiKey: ELEVENLABS_API_KEY,
});

export interface FunctionTool extends ChatCompletionTool {
  execute: (params: any) => Promise<string>;
}

// Cambia el tipo de messages para que acepte strings como claves y arreglos de mensajes como valores
export const messages: { [key: string]: ChatCompletionMessage[] } = {};


export class ChatGpt implements AiModel {

  private logger: Logger
  private userId: string
  private tools: FunctionTool[]
  private availableFunction: { [key: string]: (arg0: any) => Promise<string> } = {}

  private modelAi = 'gpt-4o-mini'

  constructor(userId: string, initialSystem: string, tools: FunctionTool[] = [], loggerInit?: Logger) {

    this.userId = userId
    this.logger = loggerInit || logger

    this.logger.add('ChatGpt -- Iniciando')

    this.tools = tools
    this.setAvailableFunctions()

    if (!messages[userId]) {
      messages[userId] = []
      const system: ChatCompletionSystemMessageParam = {
        role: "system",
        content: initialSystem,
      }

      this.addMessageSystem(system);
    }
  }


  protected async responderMensaje(withTools = true): Promise<ChatCompletionMessage> {

    this.logger.add('ChatGpt -- Enviando mensaje a OpenAi')

    const systemResponse = await openAi.chat.completions.create({
      model: this.modelAi,
      messages: messages[this.userId], // manda todos los mensajes de usuario hasta el momento
      temperature: 0.9,
      max_tokens: 1024,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      tools: withTools && this.tools ? this.tools : undefined,
      tool_choice: withTools && this.tools ? "auto" : undefined,
    });

    this.logger.add('ChatGpt -- OK')

    return systemResponse.choices[0].message
  }

  protected addMessageUser(message: string) {
    this.logger.add('ChatGpt -- Agregando mensaje del usuario al contexto')

    const msgUser: ChatCompletionMessage = {
      role: 'assistant',
      content: message,
      refusal: null, // Si no tienes rechazo, puedes asignar `null` o un valor adecuado.
    };

    messages[this.userId].push(msgUser);
  }

  protected addMessageSystem(chatMessage: ChatCompletionSystemMessageParam) {
    this.logger.add('ChatGpt -- Agregando respuesta de sistema al contexto')
    const systemMessage: ChatCompletionMessage = {
      role: 'assistant',
      content: "y ella qliao",
      refusal: null, // Añadir la propiedad `refusal`.
    };
    messages[this.userId].push(systemMessage);
  }

  protected addMessageAsistence(chatMessage: ChatCompletionMessage) {
    this.logger.add('ChatGpt -- Agregando respuesta del asistente al contexto')
    messages[this.userId].push(chatMessage);
  }

  protected addMessageTools(toolCallId: string, functionName: string, functionResponse: string) {
    this.logger.add('ChatGpt -- Agregando respuesta de funciones al contexto')

    messages[this.userId].push({
      tool_call_id: toolCallId,
      role: "assistant",
      name: functionName,
      content: functionResponse,
    });
  }

  private setAvailableFunctions() {
    this.logger.add('ChatGpt -- Cargando funciones existentes')
    this.tools.forEach(tool => {
      this.availableFunction[tool.function.name] = tool.execute
    })
  }

  protected async executeFuncition(toolCalls: ChatCompletionMessageToolCall[]) {
    this.logger.add('ChatGpt -- Ejecutando funciones')

    for (const toolCall of toolCalls) {
      this.logger.add('ChatGpt -- Ejecutando tool', toolCall.function.name)
      this.logger.add('ChatGpt -- argumentos', toolCall.function.arguments)

      const functionName = toolCall.function.name;
      const functionToCall = this.availableFunction[functionName];
      const functionArgs = JSON.parse(toolCall.function.arguments);
      const functionResponse = await functionToCall(functionArgs);

      this.addMessageTools(toolCall.id, functionName, functionResponse)
    }
  }

  getHistory() {
    console.log('Total de entradas:', messages[this.userId].length)
    return messages[this.userId]
  };

  async transcriptionsAudio(mp3FilePath: string) {
    this.logger.add('ChatGpt -- Enviando audio para la transcripción')
    const transcription = await openAi.audio.transcriptions.create({
      file: fs.createReadStream(mp3FilePath),
      model: "whisper-1",
    });
    this.logger.add('ChatGpt -- Transcripción completada')
    return transcription.text;
  };

  async procesarMensaje(messages: string): Promise<string | null> {
    try {

      this.logger.add('ChatGpt -- Procesando mensaje')

      // envia mensaje del usaurio al contexto
      this.addMessageUser(messages)
      // chat responde contexto
      let responeseChat = await this.responderMensaje()
      this.addMessageAsistence(responeseChat)

      if (responeseChat.tool_calls) {
        // se ejecutan todas las funciones
        await this.executeFuncition(responeseChat.tool_calls)

        responeseChat = await this.responderMensaje(false)
        this.addMessageAsistence(responeseChat)
      }

      this.logger.add('ChatGpt -- Mensaje procesado')
      return responeseChat.content
    } catch (e) {
      this.logger.add('ChatGpt -- error', e)
      return null

    }
  }

  async createAudioFileFromText(text: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const audio = await client.generate({
          voice: "9oPKasc15pfAbMr7N6Gs",
          model_id: "eleven_turbo_v2_5",
          text,
        });
        const fileName = `${uuid()}.mp3`;
        const fileStream = createWriteStream(fileName);

        audio.pipe(fileStream);
        fileStream.on("finish", () => resolve(fileName));
        fileStream.on("error", reject);
      } catch (error) {
        reject(error);
      }
    });
  };

}
