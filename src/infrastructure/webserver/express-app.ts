import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import { MessageController } from "../../interfaces/controllers/message.controller";
import { HandleMessageUseCase } from "../../app/usescase/handle-message.usecase";
import { ChatGpt } from "../services/chatgpt/chatgpt.service";
import { Whatsapp } from "../services/whatsapp/whatsapp.service";
import { ElevenLabs } from "../services/elevenlabs/eleven-labs.js";
import { ChatFacade } from "../services/ChatFacade";
import { config } from "../config/env";
import { Messages, WhatsappData } from "../../interfaces/WhatsaapData";
import { logger } from "../services/logger/Logs";
// Inicializa los servicios y casos de uso
const chatGpt = new ChatGpt(process.env.OPENAI_API_KEY || '');
const whatsAppService = new Whatsapp(process.env.WHATSAPP_TOKEN || '',);
const handleMessageUseCase = new HandleMessageUseCase(chatGpt, whatsAppService);

// Configura el controlador
const messageController = new MessageController(handleMessageUseCase);

// Inicializa Express
const app = express();
app.use(bodyParser.json());

// Ruta para verificar el webhook
app.get("/webhook", (req, res) => {
    const verifyToken = config.whatsappVerifyToken || '';
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token && mode === "subscribe" && token === verifyToken) {
        console.log("Webhook verificado correctamente.");
        res.status(200).send(challenge);
    } else {
        res.status(403).send("Error de verificación.");
    }
});

interface WhatsappRequest extends Request<any, any, WhatsappData | undefined> {
    whatsappData?: {
      wa_id: string
      messages: Messages
    }
  }

const validarEntradaWhatsapp = async (req: WhatsappRequest, res: Response, next: NextFunction): Promise<void> => {

    const { body } = req;
  
  
    if (!body || !body.entry || !body.entry[0].changes || !body.entry[0].changes[0].value) {
      res.sendStatus(400);
      return;
    }
  
    const values = body.entry[0].changes[0].value;
  
    if (!values.contacts) {
      // console.log("!values.contacts");
      res.sendStatus(400);
      return;
    }
  
    if (!values.messages) {
      // console.log("!values.messages[0]");
      res.sendStatus(400);
      return;
    }
  
    if (!values.contacts[0].wa_id) {
      // console.log("!userId");
      res.sendStatus(400);
      return;
    }
  
  
    // 5491134192104
    // 54111534192104
    // 5411154192104  
    req.whatsappData = {
      wa_id: values.contacts[0].wa_id.replace("54911", "541115"),
      messages: values.messages[0]
    }
  
    next();
  };

  app.post("/webhook", validarEntradaWhatsapp, async (req: WhatsappRequest, res: Response): Promise<void> => {
    try {
        const whatsappData = req.whatsappData;

        if (!whatsappData) {
            res.status(400).send('Datos no validados');
            return;
        }

        const personalidad = await traerPersonalidad()
        const userId = whatsappData.wa_id
        const whatsapp = new Whatsapp(userId, logger)
        const chatGpt = new ChatGpt(userId, personalidad, tools, logger)
        const elevenLabs = new ElevenLabs()

        const chat = new ChatFacade(whatsapp, chatGpt, elevenLabs);

        switch (whatsappData.messages.type) {
            case "text":
                console.log("Recibiendo mensaje tipo texto");
                const messagesWZ = whatsappData.messages.text?.body;
                if (!messagesWZ) {
                    res.sendStatus(200);
                    return;
                }
                await chat.procesarMensajeTexto(whatsappData.messages.id, messagesWZ);
                break;
            case "audio":
                console.log("Recibiendo mensaje tipo AUDIO");
                const audioWz = whatsappData.messages.audio;

                if (!audioWz) {
                    console.log("No se encontró el audio.");
                    res.sendStatus(200);
                    return;
                }

                await chat.procesarMensajeAudio(whatsappData.messages.id, audioWz.id);
                break;
        }

        res.send(chatGpt.getHistory());
    } catch (e: any) {
        res.send(e.response || 'Ocurrió un error');
    }
});


// Escucha en el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;