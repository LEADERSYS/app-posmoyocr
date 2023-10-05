export interface IFoliosResp {
  status: number;
  message: string;
  data: Folios;
}

export interface Folios {
  TDV: number;
  vMOS: number;
}
