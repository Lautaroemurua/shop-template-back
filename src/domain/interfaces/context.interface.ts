import { RoleEnum } from '../enums/role.enum';

export interface ContextInterface {
  id: string; // Debe estar presente
  message: string; // Debe estar presente
  role?: RoleEnum; // Opcional
}
