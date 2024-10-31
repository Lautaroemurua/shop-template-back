import { IaSchema } from "../../infrastructure/implementations/ia-schema.interface";

export interface ChatResponseModelInterface {
    texto: IaSchema[];
    token: number;
  }