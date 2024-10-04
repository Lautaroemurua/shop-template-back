

export interface Logger {
  add: (...log) => void
}

export const logger: Logger = {
  add: (...log: any) => {
    console.log(log)
  }
}