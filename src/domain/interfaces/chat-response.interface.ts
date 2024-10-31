import { RoleEnum } from "../enums/role.enum";

export interface ChatResponseInterface {
  mensaje: string;
  rol: RoleEnum | null;
  tokens: number | undefined;
}
