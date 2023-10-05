export interface ITablasResp {
  status: number;
  message: string;
  data: Data;
}

export interface Data {
  ls_Cia:    LsCia[];
  ls_Cupdes: LsCupde[];
  ls_Cat:    LsCat[];
  ls_Art:    LsArt[];
  ls_Fopa:   LsFopa[];
  ls_Tax:    LsTax[];
  exotd:     ExoneracionTipoDocumento[];
}

export interface LsCia {
  Cia_Id:     number;
  Cia_Suc:    number;
  Cia_Nom:    string;
  Cia_RaSo:   string;
  Cia_Dir1:   string;
  Cia_Dir2:   string;
  Cia_Dir3:   string;
  Cia_Pcia:   number;
  Cia_Cton:   number;
  Cia_Dtto:   number;
  Cia_Barr:   number;
  Cia_Tel:    string;
  Cia_EMa:    string;
  Cia_RFC:    string;
  Cia_RegPat: string;
  Cia_Tablet: number;
  Cia_PIN:    number;
  id_fiscal: number;
  estado: number;
}

export interface LsCupde {
  CupDes_Id:  number;
  CupDes_Nom: string;
  CupDes_Por: string;
  CupDes_Tip: number;
  CupDes_Sta: number;
}

export interface LsCat {
  Cat_Cia: number;
  Cat_Id:  number;
  Cat_Nom: string;
}

export interface LsArt {
  Art_Cia:     number;
  Art_Id:      number;
  Art_Nom:     string;
  Art_UMe:     number;
  Art_Tip:     string;
  Art_Cos:     string;
  Art_Pre1:    string;
  Art_Pre2:    string;
  Art_Pre3:    string;
  Art_Pre4:    string;
  Art_Cat:     number;
  Art_Mca:     number;
  Art_Sab:     number;
  Art_Tam:     number;
  Art_Tax:     number;
  Art_CodBar:  string;
  Art_Fot:     string;
  Art_Rec:     number;
  Art_ToppAso: number;
  Art_IsTopp:  number;
  Art_IsTR:    number;
  Art_Acre:    number;
  Art_CodHda:  string;
  Art_Act:     number;
}

export interface LsFopa {
  FoPa_Id:    number;
  FoPa_Nom:   string;
  FoPa_IdHda: number;
  FoPa_Act:   number;
}

export interface LsTax {
  Tax_Id : number;
  Tax_Nom : string;
  Tax_Por : number;
  Tax_Def : number;
  Tax_OC : number;
}

export interface ExoneracionTipoDocumento {
  id : number;
	nombre : string;
	codigo_hacienda	: number;
	estado: number;
}
