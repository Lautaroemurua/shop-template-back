import { RoleEnum } from '../enums/role.enum';

export interface MessageInterface {
  id?: string;
  user_id?: string;
  conversacion_id?: string;
  created_at?: Date;
  message: string;
  role: RoleEnum | null;
  tokens: number | undefined;
}
