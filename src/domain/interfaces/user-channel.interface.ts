import { CustomerCategory } from "../enums/customer-category.enum"

export interface UserChannelInterface {
    id: string
    number: string
    created: Date
    category: CustomerCategory | null
  }