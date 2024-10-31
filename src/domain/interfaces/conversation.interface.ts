import { ChannelsEnum } from "../enums/channels.enum";

export interface ConversationInterface {
    id?: string;
    user_id?: string;
    conversacion_id?: string;
    created_at?: Date;
    summary: string;
    suggestion: string;
    interests: string;
    channel: ChannelsEnum | null;
  }