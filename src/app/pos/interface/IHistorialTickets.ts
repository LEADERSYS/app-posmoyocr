export interface IHistorialInterface {
  status: number;
  message: string;
  data: ITicket;
}

export interface ITicket {
  listTickets : Tickets[];
}

export interface Tickets {
  VMa_Fol : number;
  VMa_Fec : string;
  VMa_Sub : number;
  VMa_Tot : number;
  VMa_Sta : number;
}
