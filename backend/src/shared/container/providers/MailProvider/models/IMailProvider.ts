import ISendMailsDTO from '../dtos/ISendMailsDTO';

export default interface IMailProvider {
  sendMail(data: ISendMailsDTO): Promise<void>;
}
