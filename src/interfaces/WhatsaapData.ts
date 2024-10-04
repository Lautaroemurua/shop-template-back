
interface Contacts {
  profile: {
    name: string
  }
  wa_id: string
}

enum TypeMessages {
  AUDIO = 'audio',
  BUTTON = 'button',
  DOCUMENT = 'document',
  TEXT = 'text',
  IMAGE = 'image',
  INTERACTIVE = 'interactive',
  ORDER = 'order',
  STICKER = 'sticker',
  SYSTEM = 'system',
  UNKNOWN = 'unknown',
  VIDEO = 'video'
}

export interface Messages {
  from: string
  id: string
  timestamp: string
  text?: {
    body: string
  }
  audio?: {
    id: string
    mime_type: string
  },
  button?: {
    payload: string
    text: string
  },
  context?: {
    forwarded: boolean
    frequently_forwarded: boolean
    from: string
    id: string
    referred_product: {
      catalog_id: string
      product_retailer_id: string
    }
  },
  document: {
    caption: string
    filename: string
    sha256: string
    mime_type: string
    id: string
  }
  identity?: {
    acknowledged: string
    created_timestamp: string
    hash: string
  },
  image?: {
    caption: string
    sha256: string
    id: string
    mime_type: string
  }
  errors?: Errors[]
  type: TypeMessages
}



interface Entry {
  id: string
  changes: Change[]
}
interface Change {
  value: ValueMessages
  field: string
}
interface Errors {
  code: string
  title: string
  message: string
  error_data: {
    details: string
  }[]
}

enum Status {
  delivered,
  read,
  sent
}
interface Value {
  messaging_product: string
  metadata: MetaData
  contacts?: Contacts[]
  messages?: Messages[]
  errors?: Errors[]
  statuses?: {
    biz_opaque_callback_data: string
    conversation: {
      id: string
    }
    errors?: Errors[]
    id: string
    pricing: any
    recipient_id: string
    status: Status
    timestamp: string
  }[]

}

interface ValueMessages extends Value {
}

interface MetaData {
  display_phone_number: string
  phone_number_id: string
}

export interface WhatsappData {
  object: string
  entry: Entry[]
}


export interface WebhooksWhatsaap {
  object: string
  entry: Entry[]
}