export default interface ICreateOrderDTO {
  subsidiary_id: number;
  subtotal: number;
  user_id: string;
  client_id: string;
  discount: number;
  total: number;
  status_id: number;
}
