import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatServiceImplementation {
    getId: () => string
    markMessageAsRead: (id: string) => Promise<void>
    sendMessage: (messages: { audio?: string, text?: string, link?: string, caption?: string }[]) => Promise<void>
    sendImage: (url: string, version: string) => Promise<void>
    downloadMedia: (mediaId: string) => Promise<ArrayBufferView>
    sendAudio: (fileName: string) => Promise<void>
  }
  