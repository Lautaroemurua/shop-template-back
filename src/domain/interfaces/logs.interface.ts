

export interface LoggerInterface {
    add: (...log) => void
  }
  
  export const logger: LoggerInterface = {
    add: (...log: any) => {
      console.log(log)
    }
  }