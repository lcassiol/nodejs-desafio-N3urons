import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface ISendMail {
  sendMail(data: ISendMailDTO): Promise<void>;
}
