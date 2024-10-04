
export interface ServiceChat {
  marcarLeido: (id: string) => Promise<void>
  enviarMensaje: (message: string) => Promise<void>
  enviarImagen: (url: string, version: string) => Promise<void>
  downloadMedia: (mediaId: string) => Promise<ArrayBufferView>
  sendAudiots: (fileName: string) => Promise<void>
}
