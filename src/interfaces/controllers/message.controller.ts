import { Request, Response } from "express";
import { HandleMessageUseCase } from "../../app/usescase/handle-message.usecase";

export class MessageController {
    constructor(private handleMessageUseCase: HandleMessageUseCase) {}

    async receiveMessage(req: Request, res: Response): Promise<Response> {
        const message = req.body;  // WhatsApp enviará el mensaje en el cuerpo

        if (message.object && message.entry && message.entry[0].changes[0].value.messages) {
            const receivedMessage = message.entry[0].changes[0].value.messages[0];
            const from = receivedMessage.from;
            const text = receivedMessage.text.body;

            console.log(`Mensaje recibido de ${from}: ${text}`);

            // Ejecutar el caso de uso para manejar el mensaje
            await this.handleMessageUseCase.execute({
                from,
                content: text,
            });

            return res.status(200).send('EVENT_RECEIVED');
        }

        return res.status(404).send('NO_MESSAGE');
    }
}
