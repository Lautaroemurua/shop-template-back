import express, { NextFunction, Request, RequestHandler, Response } from "express";
const router = express.Router()
import { Whatsapp } from '../../infrastructure/services/whatsapp/whatsapp.service';
import { ChatGpt } from "../../infrastructure/services/chatgpt/chatgpt.service"
import { ElevenLabs } from "../services/elevenlabs/eleven-labs.js";
import { ChatFacade } from "../services/ChatFacade.js";
import { Messages, WhatsappData } from "../../interfaces/WhatsaapData";
import { logger } from "../services/logger/Logs.js";
import { traerPersonalidad, tools } from "../../infrastructure/services/chatgpt/tools";

const app = express();
app.use(express.json());

const { WEBHOOK_VERIFY_TOKEN } = process.env;

interface WhatsappRequest extends Request<any, any, WhatsappData | undefined> {
  whatsappData?: {
    wa_id: string
    messages: Messages
  }
}

const validarEntradaWhatsapp: RequestHandler = (req: WhatsappRequest, res: Response, next) => {

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

  // await directus.request(createItem('webhook', { data: body }))

  // 5491134192104
  // 54111534192104
  // 5411154192104  
  req.whatsappData = {
    wa_id: values.contacts[0].wa_id.replace("54911", "541115"),
    messages: values.messages[0]
  }

  next();
};


router.post("/webhook", validarEntradaWhatsapp, async (req: WhatsappRequest, res) => {
  try {
    const whatsappData = req.whatsappData;

    if (!whatsappData) {
      return res.status(400).send('Datos no validados');
    }

    const personalidad = await traerPersonalidad()
    const userId = whatsappData.wa_id
    const whatsapp = new Whatsapp(userId, logger)
    const chatGpt = new ChatGpt(userId, personalidad, tools, logger)
    const elevenLabs = new ElevenLabs()

    const chat = new ChatFacade(whatsapp, chatGpt, elevenLabs)


    switch (whatsappData.messages.type) {
      case "text":
        logger.add("Recibiendo mensaje tipo texto");
        const messagesWZ = whatsappData.messages.text?.body;
        if (!messagesWZ) {
          res.sendStatus(200);
          return;
        }
        await chat.procesarMensajeTexto(whatsappData.messages.id, messagesWZ)
        break;
      case "audio":
        logger.add("Recibiendo mensaje tipo AUDIO");
        const audioWz = whatsappData.messages.audio;

        if (!audioWz) {
          console.log("!userId || !audioWz");
          res.sendStatus(200);
          return;
        }

        await chat.procesarMensajeAudio(whatsappData.messages.id, audioWz.id)
        break;
    }

    res.send(chatGpt.getHistory());
  } catch (e: any) {
    res.send(e.response);
  }
});

router.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // check the mode and token sent are correct
  if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN) {
    // respond with 200 OK and challenge token from the request
    res.status(200).send(challenge);
  } else {
    // respond with '403 Forbidden' if verify tokens do not match
    res.sendStatus(403);
  }
});



router.post("/test", async (req, res) => {
  res.status(200).send('asdas');
})

export default router
