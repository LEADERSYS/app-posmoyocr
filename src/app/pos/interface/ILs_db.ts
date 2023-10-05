export interface ILs {
  ls_vde : ILs_vde[];
  ls_vcup : ILs_vcup[];
  ls_vfopa : ILs_vfopa[];
  ls_vfol : ILs_fol[];
  ls_vma : ILs_vma[];
  venta_exoneracion : IVenta_exoneracion[];
}

//TODO: TABLA ARTICULOS : ls_vde
export interface ILs_vde {
  VDe_Cia: number;
	VDe_Suc: number;
	VDe_Mov: number;
	VDe_Fol: number;
	VDe_Ren: number;
	VDe_Art: number;
	VDe_Can: number;
	VDe_Pre: number;
	VDe_TaxId: number;
	VDe_TaxPor: number;
	VDe_Des: number;
  VDe_Sub: number;
  VDe_TaxIni: number;
	VDe_TaxExon: number;
	VDe_Tax: number;
	VDe_Net: number;
}

//TODO: TABLA CUPONES : ls_vcup
export interface ILs_vcup {
  VCup_Cia : number;
	vcup_suc : number;
	vcup_id : number;
	vcup_fol	: number;
	vcup_tick : number;
  vcup_por: number;
}

//TODO: TABLA FORMAS DE PAGO : ls_vfopa
export interface ILs_vfopa {
  VFoPa_Cia : number;
	VFoPa_Suc : number;
	VFoPa_Fol : number;
	VFoPa_Id : number;
	VFoPa_Imp : number;
}

//TODO: TABLA FOLIOS : ls_fol
export interface ILs_fol {
  Fol_Cia : number;
	Fol_Suc : number;
	Fol_Id : string;
	Fol_Val : number;
}

//TODO: TABLA MESTRA : ls_vma
export interface ILs_vma {
  VMa_Cia : number;
	VMa_Suc: number;
	VMa_Mov : number;
	VMa_Fol : number;
	VMa_Fec	: string;
	VMa_Cte	: number;
	VMa_Sub	: number;
	VMa_TaxIni	: number;
	VMa_TaxExon	: number;
	VMa_Tax	: number;
	VMa_Tot	: number;
	VMa_Efe	: number;
	VMa_Camb	: number;
	VMa_Sta	: number;
	VMa_Usu	: string;
	VMa_TipPed	: number;
	VMa_Sinc : number;
}

//TODO: TABLA VENTA EXONERACION : venta_exoneracion
export interface IVenta_exoneracion {
  negocio: number;
	caja: number;
	folio: number;
	tipo_documento: number;
	numero_documento: number;
	nombre_institucion: string;
	fecha_emision: string;
	porcentaje: number;
}
