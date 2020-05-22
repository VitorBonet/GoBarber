import IMailProvider from '../models/IMailProvider';
import ISendMailsDTO from '../dtos/ISendMailsDTO';

interface IMessage {
  to: string;
  body: string;
}

export default class FakeMailProvider implements IMailProvider {
  private messages: ISendMailsDTO[] = [];

  public async sendMail(message: ISendMailsDTO): Promise<void> {
    this.messages.push(message);
  }
}
