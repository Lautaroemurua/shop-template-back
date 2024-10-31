import { Rol } from "../enums/rol.enum";

export interface MessageInterface {
    id?: string;
    user_id?: string;
    conversacion_id?: string;
    created_at?: Date;
    message: string;
    rol: Rol | null;
    tokens: number | undefined;
  }