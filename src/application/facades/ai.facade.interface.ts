export interface AiFacade {
  generateResponse(input: string): Promise<string>;
}
