import { ChannelsEnum } from "../enums/channels.enum";
import { MessageInterface } from "./message.interface";

export interface ConversationInterface {
    id?: string;
    user_id?: string;
    created_at?: Date;
    messages: MessageInterface[]
    summary: string;
    suggestion: string;
    interests: string;
    tokens: number;
    channel: ChannelsEnum | null;
  }