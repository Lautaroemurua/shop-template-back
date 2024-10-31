import { Rol } from "../enums/rol.enum";

export interface ChatResponseInterface {
  mensaje: string;
  rol: Rol | null;
  tokens: number | undefined;
}
