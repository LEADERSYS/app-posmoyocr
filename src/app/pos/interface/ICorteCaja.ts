export interface ICorteCaja {
  status: number;
  message: string;
  data: CorteCaja;
}


export interface CorteCaja {
  corte_fopa: ICorte_Fopa[];
  corte_totalvendido: number;
  corte_fondocaja: number;
  corte_totalencaja: number;
  corte_descuentos: number;
}

export interface ICorte_Fopa {
  Cia_Nom: string;
  VFoPa_Id: number;
  FoPa_Nom: string;
  VFoPa_Imp: string;
}

export interface ICorte_TotalVendido {
  Total_VFoPa_Imp : string;
}

export interface ICorte_FondoCaja {
  Par_Val : string;
}

export interface ICorte_TotalCaja {
  total_encaja : number;
}

export interface ICorte_Descuentos {
  VDe_Des : string;
}

