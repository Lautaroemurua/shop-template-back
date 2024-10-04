import { ServiceChat } from "../../../interfaces/ServiceChat";
import axios, { config } from "../../setup/axios.js";
import { Logger } from "../logger/Logs.js";

const sleep = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));
const WZ_ID = process.env.WZ_ID ?? ''

export class Whatsapp implements ServiceChat {
  private logger: Logger

  public userId: string

  constructor(userId: string, logger: Logger) {
    this.userId = userId
    this.logger = logger
    this.logger.add('Whatsapp -- Iniciando')
  }
    sendAudiots!: (fileName: string) => Promise<void>;

  async marcarLeido(id: string) {
    this.logger.add(`Whatsapp: Enviando marca de mensaje: ${WZ_ID}`)
    try {
      const { data } = await axios.post(
        `v19.0/${WZ_ID}/messages`,
        {
          messaging_product: "whatsapp",
          status: "read",
          message_id: id,
        },
        config
      );
      this.logger.add('Whatsapp -- mensaje marcado:', data.success)

    } catch (e) {
      this.logger.add(e)

    }
  }

  async enviarMensaje(message: string) {
    this.logger.add('Whatsapp -- Enviando mensaje a', this.userId)
    console.log(message)
    console.log(typeof message)
    try {
      const datos = JSON.parse(message) as { text?: string, link?: string, caption?: string }[]
      console.log(datos)

      for (const dato of datos) {
        let datoJson = {}

        if (dato.text) {
          datoJson = {
            type: "text",
            text: {
              preview_url: false,
              body: dato.text,
            },
          }
        }
        else if (dato.link) {
          datoJson = {
            type: "image",
            image: {
              link: `https://ms-admin.stellantistv.com/assets/${dato.link}?height=800`,
              caption: dato.caption,
            },
          }
        }
        await axios.post(
          `https://graph.facebook.com/v19.0/${WZ_ID}/messages`,
          {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: this.userId,
            ...datoJson
          },
          config
        );
        await sleep(250)
        this.logger.add('Whatsapp -- Respuesta enviada')

      }
    } catch (e: any) {
      this.logger.add('Whatsapp -- ERROR:', e.response.data.error.message)
    }
  }

  async enviarImagen(url: string, caption: string) {
    this.logger.add('Whatsapp -- Enviando imagen')

    const { data } = await axios.post(
      `https://graph.facebook.com/v19.0/${WZ_ID}/messages`,
      {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: this.userId,
        type: "image",
        image: {
          link: url,
          caption: caption,
        },
      },
      config
    );

    this.logger.add('Whatsapp -- Respuesta:', data)
  };

  async downloadMedia(mediaId: string) {
    this.logger.add('Whatsapp -- Descargando imagen')

    const audioData = await this.getMedia(mediaId)
    const audioDownload = await this.download(audioData.url)

    this.logger.add('Whatsapp -- Respuesta')

    return audioDownload
  }

  protected async getMedia(mediaId: string) {
    this.logger.add('Whatsapp -- Obteniendo recurso')

    const { data } = await axios.get<{ url: string }>(
      "https://graph.facebook.com/v20.0/" + mediaId,
      config
    );

    this.logger.add('Whatsapp -- recuros', data)

    return data
  }

  protected async download(urlMedia: string): Promise<ArrayBufferView> {

    const { data: audioDownload } = await axios.get<ArrayBufferView>(urlMedia, {
      ...config,
      responseType: "arraybuffer",
    });

    return audioDownload
  }

  async sendAudio(fileName: string) {
    console.log("Pidiendo Audio de:");
    const data = await axios.post(
      "https://graph.facebook.com/v20.0/112235421503848/messages",
      {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: "54111534192104",
        type: "audio",
        audio: {
          link: "https://quixotic-aerial-bacon.glitch.me/mp3/" + fileName,
        },
      },
      config
    );
  }


}
