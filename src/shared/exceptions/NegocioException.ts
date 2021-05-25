class NegocioException {
  public readonly messages: Set<string>;

  public readonly statusCode: number;

  public readonly developermessage: string | undefined;

  constructor(messages: Set<string>, statusCode = 400, developermessage?: string) {
    this.messages = messages;
    this.statusCode = statusCode;
    this.developermessage = developermessage || undefined;
  }
}

export default NegocioException;
