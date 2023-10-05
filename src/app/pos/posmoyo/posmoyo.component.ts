import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { PosService } from '../services/pos.service';
import { ITablasResp, LsArt, LsCat, LsCia, LsCupde, LsFopa, LsTax } from '../interface/ITablasResp';
import { DBlocalService } from '../services/dblocal.service';
import { ToastrService } from 'ngx-toastr';
import { KEY_LOCALSTORAGE } from 'src/app/config/ConstantesConfig';
import { AuthService } from 'src/app/login/services/auth.service';
import { IFoliosResp } from '../interface/IFoliosResp';
import { ITablaArticulos } from '../interface/IArticulos';
import { ICupones } from '../interface/ICupones';
import { ILs, ILs_fol, ILs_vcup, ILs_vde, ILs_vfopa, ILs_vma, IVenta_exoneracion } from '../interface/ILs_db';
import { IVentaExoneracion } from '../interface/IventaExoneracion';
import { IExoneracion } from '../interface/IExoneracion';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { format } from 'date-fns';
import { Tickets } from '../interface/IHistorialTickets';
import { ICorte_Descuentos, ICorte_FondoCaja, ICorte_Fopa, ICorte_TotalCaja, ICorte_TotalVendido } from '../interface/ICorteCaja';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-posmoyo',
  templateUrl: './posmoyo.component.html',
  styleUrls: ['./posmoyo.component.css']
})
export class PosmoyoComponent implements OnInit {

  //TODO: VAR GLOBAL
  public seccionActual: string = 'tienda';

  //TODO: VAR OTROS
  public aFormasPago: { [key: number]: number } = {};
  public cantidad_articulo: { [key: number]: number } = {};
  public fechaActual: string = new Date().toISOString().split('T')[0];

  //TODO: LISTAS DE OBJETOS
  public sucursales : LsCia[] = [];
  public metodos: LsFopa[] = [];
  public categorias: LsCat[] = [];
  public articulos: LsArt[] = [];
  public cupones: LsCupde[] = [];
  public filter_articulos: LsArt[] = [];

  //TODO: SECTION SELECCIONAR TIENDA
  public section_tiendas: boolean = true;
  public section_pin:boolean = false;
  public section_liberar: boolean = false;
  public section_configuracion: boolean = false;
  public pin_tienda:number = 0;
  public tienda_folio_tdv:number = 0;
  public tienda_folio_vMos:number = 0;
  public tienda_name:string = '';
  public tienda_caja: number = 0;
  public objSeleccionarTienda = {
    tiendaName: '',
    idCia : 0,
    cajaSuc : 0,
    indexRen : 0
  };

  //TODO: SECTION CAPTURAR
  public aArticulos: ITablaArticulos[] = [];
  public aCupones: ICupones[] = [];
  public subtotal:number = 0;
  public impuestos:number = 0;
  public total:number = 0;
  public pagado: number = 0;
  public cambio: number = 0;
  public isCambio: boolean = false;
  public denominacion_pagada: number = 0;
  public btnFinalizar: boolean = true;

  private vde_TaxId: LsTax[] = [];
  public ls_vde: ILs_vde[] = [];
  public ls_vcup:ILs_vcup[] = [];
  public ls_vfopa: ILs_vfopa[] = [];
  public ls_vma: ILs_vma[] = [];
  public ls_vfol: ILs_fol[] = [];
  public ls_vexoneracion: IVenta_exoneracion[] = [];
  public generacionVenta: ILs[] = [];
  public obj_ventaExoneracion: IVenta_exoneracion = {
    negocio: 0,
    caja: 0,
    folio: 0,
    tipo_documento: 0,
    numero_documento: 0,
    nombre_institucion: '',
    fecha_emision: format(new Date, 'yyyy/MM/dd'),
    porcentaje: 0,
  };

  //TODO: SECTION CORTE
  public corte_FechaFilter: string = format(new Date, 'yyyy-MM-dd');
  public corte_HoraImpresion: Date = new Date();
  public corte_TotalVendido: number = 0;
  public corte_FondoCaja: number = 0;
  public corte_TotalCaja: number = 0;
  public corte_Descuentos: number = 0;
  public corte_FoPa: ICorte_Fopa[] = [];

  //TODO: SECTION MODAL TICKET IMPRESION
  public fecha_ImpresionTicket: Date = new Date();

  //TODO: SECTION EXONERACION
  public td_exoneracion_local: IExoneracion[] = [];
  public ventaExoneracion : IVentaExoneracion[] = [];
  public contadorArticulos:number = 1;

  public historial_ticket: Tickets[] = [];

  public fechaTicketVenta: string = format(new Date, 'dd/MM/yyyy');

  constructor(private navbarService:NavbarService, private posService: PosService, private dblocalService:DBlocalService,
    private toastr: ToastrService, private authService:AuthService, private indexedDB: NgxIndexedDBService,
    private datePipe: DatePipe) {}

  ngOnInit() {
    this.navbarService.sectionSelected$.subscribe(seccion => {
      this.seccionActual = seccion;
    });
    this.obtenerDatosMoyo();
  }

  private obtenerDatosMoyo() {
    this.obtenerDatosPos();
    this.get_TDExoneracion();
    this.get_ProductosTienda();
  }

  private obtenerDatosPos() {
    const isDataObject = this.dblocalService.getObject(KEY_LOCALSTORAGE);
    if(isDataObject === null || isDataObject.tienda_idCia === null) {
      console.info("Nuevo inicio de sesion");
      this.dblocalService.localstorageObject();
      this.posService.get_TablasDB({idUsuario: this.authService.get_NameUser()}).subscribe({
        next : (response : ITablasResp) => {
          this.dblocalService.set_DataDB('ls_Cia', response.data.ls_Cia);
          this.dblocalService.set_DataDB('ls_Cupdes', response.data.ls_Cupdes);
          this.dblocalService.set_DataDB('ls_Cat', response.data.ls_Cat);
          this.dblocalService.set_DataDB('ls_Art', response.data.ls_Art);
          this.dblocalService.set_DataDB('ls_Fopa', response.data.ls_Fopa);
          this.dblocalService.set_DataDB('ls_tax', response.data.ls_Tax);
          this.dblocalService.set_DataDB('exoneracion_td', response.data.exotd);
        }
      });
      this.obtenerSucursales();
    } else {
      console.info("El usuario refresco la pagina");
      this.obtenerDatosLocales();
      this.obtenerSucursales();
    }
  }

  private obtenerSucursales() {
    this.dblocalService.get_DataTablaDB('ls_Cia').subscribe({
      next : (response) => {
        this.sucursales = response as LsCia[];
      },
      error: (err) => this.toastr.error('Ocurrio un error al obtener las Tiendas (DB-local)')
    });
  }

  private obtenerFoliosSucursal(idTienda: {}) {
    this.posService.get_Folios(idTienda).subscribe({
      next: (response: IFoliosResp) => {
        this.dblocalService.updateObjectField(KEY_LOCALSTORAGE, 'cia_vMOS', response.data.vMOS);
        this.dblocalService.updateObjectField(KEY_LOCALSTORAGE, 'cia_TDV', response.data.TDV);
        this.obtenerDatosLocales();
      },
      error: (err) => {
        console.log("Error: ",  err.error.message);
        this.toastr.error(err.error.message);
        this.inicializarVariables();
      }
    });
  }

  private obtenerDatosLocales() {
    const data = this.dblocalService.getObject(KEY_LOCALSTORAGE);
    this.tienda_folio_tdv = data.cia_TDV;
    this.tienda_folio_vMos = data.cia_vMOS;
    this.tienda_name = data.tienda_name;
    //this.section_tiendas = data.section_tiendas;
    console.log("SectionTiendas: ", data.section_tiendas);
    this.section_pin = data.section_pin;
    this.section_liberar = data.section_liberar;
    this.section_configuracion = data.section_configuracion;
  }

  public validarPinTienda() {
    this.dblocalService.find_ById(this.objSeleccionarTienda.idCia).subscribe({
      next : (response) => {
        if (response === undefined) {
          this.toastr.warning('No se encontraron datos almacenados de la Sucursal Seleccionada');
          return;
        }

        if (response.Cia_PIN !== this.pin_tienda) {
          this.toastr.error('PIN incorrecto. Inténtalo de nuevo.');
          return;
        }
        this.dblocalService.updateObjectField(KEY_LOCALSTORAGE, 'tienda_name', this.objSeleccionarTienda.tiendaName);
        this.dblocalService.updateObjectField(KEY_LOCALSTORAGE, 'tienda_idCia', this.objSeleccionarTienda.idCia);
        this.dblocalService.updateObjectField(KEY_LOCALSTORAGE, 'tienda_cajaSuc', this.objSeleccionarTienda.cajaSuc);
        this.dblocalService.updateObjectField(KEY_LOCALSTORAGE, 'tienda_indexRen', this.objSeleccionarTienda.indexRen);
        this.dblocalService.updateObjectField(KEY_LOCALSTORAGE, 'cia_usuarioId', this.authService.get_NameUser());
        this.dblocalService.updateObjectField(KEY_LOCALSTORAGE, 'section_pin', false);
        this.dblocalService.updateObjectField(KEY_LOCALSTORAGE, 'section_liberar', true);
        this.dblocalService.updateObjectField(KEY_LOCALSTORAGE, 'section_tiendas', false);
        this.dblocalService.updateObjectField(KEY_LOCALSTORAGE, 'section_configuracion', true);
        this.dblocalService.updateObjectField(KEY_LOCALSTORAGE, 'isData', true);
        this.pin_tienda = 0;
        this.section_pin = false;
        this.section_tiendas = false;
        this.section_liberar = true;
        this.section_configuracion = true;
        this.obtenerFoliosSucursal({
          idSucursal : this.objSeleccionarTienda.idCia,
          idCaja: this.objSeleccionarTienda.cajaSuc
        });
      }
    })
  }

  public liberarTienda() {
    this.dblocalService.deleteObject(KEY_LOCALSTORAGE);
    this.dblocalService.localstorageObject();
    this.inicializarVariables();
  }

  public seleccionarSucursal(tiendaName:string, idCia: number, cajaSuc:number, indexRen:number) {
    this.section_pin = true;
    this.objSeleccionarTienda = {
      tiendaName: tiendaName,
      idCia : idCia,
      cajaSuc : cajaSuc,
      indexRen : indexRen
    };
    console.info("Tienda: ", this.objSeleccionarTienda);
  }

  public seleccionarSectionNavbar(section:string) {
    this.navbarService.selectSection(section);
  }

  private inicializarVariables(): void {
    this.section_tiendas = true;
    this.section_pin = false;
    this.section_liberar = false;
    this.section_configuracion = false;
    this.pin_tienda = 0;
    this.tienda_folio_tdv = 0;
    this.tienda_folio_vMos = 0;
    this.subtotal = 0;
    this.impuestos = 0;
    this.total = 0;
    this.pagado = 0;
    this.cambio = 0;
    this.isCambio = false;
    this.denominacion_pagada = 0;
    this.btnFinalizar = true;
    this.contadorArticulos = 1;
    this.objSeleccionarTienda = {
      tiendaName: '',
      idCia : 0,
      cajaSuc : 0,
      indexRen : 0
    };
    this.tienda_caja;
    this.resetearVarFinalizar();
  }

  public resetearVarFinalizar(): void {
    this.ls_vde = [];
    this.ls_vcup = [];
    this.ls_vfopa = [];
    this.ls_vma = [];
    this.ls_vfol = [];
    this.ls_vexoneracion = [];
    this.ventaExoneracion = [];
    this.aArticulos = [];
    this.subtotal = 0;
    this.impuestos = 0;
    this.total = 0;
    this.pagado = 0;
    this.cambio = 0;
    this.isCambio = false;
    this.denominacion_pagada = 0;
    this.btnFinalizar = true;
    this.contadorArticulos = 1;
    this.aFormasPago = {};
    this.cantidad_articulo = {};
  }


  //TODO: METODOS SECTION CAPTURAR
  public delete_Articulo(index:number) {
    this.aArticulos.splice(index, 1);
    this.aArticulos.forEach((articulo, index) => {
      articulo.renglonTabla = index + 1;
      this.contadorArticulos = articulo.renglonTabla + 1;
    });
    console.log('Delete: ', this.aArticulos);
    this.calculos();
  }

  public delete_Cupon(index:number) {
    this.aCupones.splice(index, 1);
    this.calculos();
  }

  public calculos() {
    let cupon_aplicado = 0;
    const IVA_1 = 1.13;
    const IVA_2 = 0.13;
    this.subtotal = 0;
    this.impuestos = 0;
    this.total = 0;
    // Si hay un cupon aplicado
    if (this.aCupones.length > 0) {
      cupon_aplicado = parseInt(this.aCupones[0].descuento);
    }

    if (this.aArticulos.length > 0) {
      this.aArticulos.forEach((articulo) => {
        // Descuento1 = PU / IVA_1
        let descuento1 = parseInt(articulo.pu) / IVA_1;
        // D.Total = Descuento1 * CANTIDAD
        let descuento_total = descuento1 * articulo.cantidad;
        // DescuentoArticulo = D.Total * CUPON
        let descuento_articulo = descuento_total * (cupon_aplicado / 100);
        articulo.descuento = descuento_articulo;
        // Subtotal = D.Total - DescuentoArticulo
        let subtotal = descuento_total - descuento_articulo;
        // Impuesto = Subtotal * IVA_2
        let impuesto = subtotal * IVA_2;
        // TotalArticulo = Subtotal + Impuesto
        let total_articulo = subtotal + impuesto;
        articulo.importe = total_articulo;
        // Totales Generales
            // Subtotal
            this.subtotal += subtotal;
            // Impuestos
            this.impuestos += impuesto;
            // Total
            this.total += total_articulo;
      });
    }
  }

  public calcularMontos() {
    let dpBandera: boolean = true;
    this.cambio = 0;
    this.isCambio = false;
    this.btnFinalizar = true;
    this.pagado = Object.keys(this.aFormasPago).reduce((suma, clave) => {
      const valor = this.aFormasPago[Number(clave)];
      if (Number(clave) === 1 && valor !== null) {
        if(this.denominacion_pagada < valor) {
          dpBandera = false;
        }
        if(dpBandera) {
          this.cambio = this.denominacion_pagada - valor;
          this.isCambio = true;
        }
      } else {
        this.denominacion_pagada = 0;
      }
      return suma + valor;
    }, 0);

    if(this.pagado === 0) {
      this.toastr.warning('Ingresa montos a pagar.');
      return;
    }

    if(!dpBandera) {
      this.toastr.warning('Verifica la denominación pagada.');
      this.pagado = 0;
      this.cambio = 0;
      this.isCambio = false;
      return;
    }

    if (Math.round(this.total) > 0) {
      if (this.pagado > Math.round(this.total) || this.pagado < Math.round(this.total)) {
        this.toastr.warning("Las cantidades de pago no coinciden. Verificalas.");
        this.btnFinalizar = true;
        return;
      }
      this.btnFinalizar = false;
    } else {
      this.toastr.warning("Ingresa algun articulo para continuar con la venta");
    }
  }
  public finalizarVenta() {
    this.save_ls_vde();
    this.save_ls_vcup();
    this.save_ls_vfopa();
    this.save_ls_vma();
    this.save_ls_vfol();
    this.save_ventaExoneracion();
    const enviarInfoVenta: ILs = {
      ls_vde : this.ls_vde,
      ls_vcup : this.ls_vcup,
      ls_vfopa : this.ls_vfopa,
      ls_vfol : this.ls_vfol,
      ls_vma : this.ls_vma,
      venta_exoneracion : this.ls_vexoneracion
    }
    this.generacionVenta.push(enviarInfoVenta);

    if (navigator.onLine) {
      this.posService.generar_venta(this.generacionVenta).subscribe({
        next : (response) => {
          console.log("Respuesta: ", response);
          //Actualizar folios
          const infoObj = this.dblocalService.getObject(KEY_LOCALSTORAGE);
          this.dblocalService.updateObjectField(KEY_LOCALSTORAGE,'cia_vMOS',infoObj.cia_vMOS + 1);
        },
        error : (err) => console.log("Erro send data: ", err)
      });
    } else {
      this.toastr.error('No tienes conexion a internet. Conectate e intentalo de nuevo');
    }

  }
  private save_ls_vde() {
    const infoObj = this.dblocalService.getObject(KEY_LOCALSTORAGE);
    this.tienda_caja = infoObj.tienda_cajaSuc;
    this.aArticulos.forEach((valores) => {
      this.get_IdTax(valores.idTax);
      const nuevoDato: ILs_vde = {
        VDe_Cia: infoObj.tienda_idCia,
        VDe_Suc: infoObj.tienda_cajaSuc,
        VDe_Mov: 1,
        VDe_Fol: infoObj.cia_vMOS + 1,
        VDe_Ren: valores.renglonTabla,
        VDe_Art: valores.idArticulo,
        VDe_Can: valores.cantidad,
        VDe_Pre: Number(valores.pu),
        VDe_TaxId: valores.idTax,
        VDe_TaxPor: 1,
        VDe_Des: valores.descuento,
        VDe_Sub: (valores.importe / 1.13) - valores.descuento,
        VDe_TaxIni: ((valores.importe / 1.13) - valores.descuento) * 0.13,
        VDe_TaxExon: ((valores.importe / 1.13) - valores.descuento) * (this.obj_ventaExoneracion.porcentaje / 100),
        VDe_Tax: (((valores.importe / 1.13) - valores.descuento) * 0.13) - (((valores.importe / 1.13) - valores.descuento) * (this.obj_ventaExoneracion.porcentaje / 100)),
        VDe_Net: ((valores.importe / 1.13) - valores.descuento) + ((((valores.importe / 1.13) - valores.descuento) * 0.13) - (((valores.importe / 1.13) - valores.descuento) * (this.obj_ventaExoneracion.porcentaje / 100)))
      };
      this.ls_vde.push(nuevoDato);
    });
  }
  private save_ls_vcup() {
    const infoObj = this.dblocalService.getObject(KEY_LOCALSTORAGE);
    const saveData = {
      VCup_Cia : infoObj.tienda_idCia,
      vcup_suc : infoObj.tienda_cajaSuc,
      vcup_id : this.aCupones.length > 0 ? this.aCupones[0].id || 0 : 0,
      vcup_fol : 0,
      vcup_tick : infoObj.cia_vMOS + 1,
      vcup_por: Number(this.aCupones.length > 0 ? this.aCupones[0].descuento || 0 : 0),
    }
    this.ls_vcup.push(saveData);
  }
  private save_ls_vfopa() {
    const infoObj = this.dblocalService.getObject(KEY_LOCALSTORAGE);
    for (const key in this.aFormasPago) {
      if (this.aFormasPago.hasOwnProperty(key) && this.aFormasPago[key] !== null) {
        const registro: ILs_vfopa = {
          VFoPa_Cia: infoObj.tienda_idCia,
          VFoPa_Suc: infoObj.tienda_cajaSuc,
          VFoPa_Fol: infoObj.cia_vMOS + 1,
          VFoPa_Id: Number(key),
          VFoPa_Imp: Number(this.aFormasPago[key].toString())
        };
        this.ls_vfopa.push(registro);
      }
    }
  }
  private save_ls_vma() {
    const sumaTaxIni = this.ls_vde.reduce((acumulador, registro) => {
      const subtotal = Number(registro.VDe_TaxIni);
      if (!isNaN(subtotal)) {
        return acumulador + subtotal;
      } else {
        return acumulador;
      }
    }, 0);
    const sumaTaxExon = this.ls_vde.reduce((acumulador, registro) => {
      const subtotal = Number(registro.VDe_TaxExon);
      if (!isNaN(subtotal)) {
        return acumulador + subtotal;
      } else {
        return acumulador;
      }
    }, 0);
    const sumaTax = this.ls_vde.reduce((acumulador, registro) => {
      const subtotal = Number(registro.VDe_Tax);
      if (!isNaN(subtotal)) {
        return acumulador + subtotal;
      } else {
        return acumulador;
      }
    }, 0);
    const sumaTotal = this.ls_vde.reduce((acumulador, registro) => {
      const subtotal = Number(registro.VDe_Net);
      if (!isNaN(subtotal)) {
        return acumulador + subtotal;
      } else {
        return acumulador;
      }
    }, 0);
    const infoObj = this.dblocalService.getObject(KEY_LOCALSTORAGE);
    const vma = {
      VMa_Cia : infoObj.tienda_idCia,
      VMa_Suc: infoObj.tienda_cajaSuc,
      VMa_Mov : 1,
      VMa_Fol : infoObj.cia_vMOS + 1,
      VMa_Fec	: format(new Date, 'yyyy/MM/dd HH:mm:ss'),
      VMa_Cte	: 0,
      VMa_Sub	: this.subtotal,
      VMa_TaxIni	: sumaTaxIni,
      VMa_TaxExon	: sumaTaxExon,
      VMa_Tax	: sumaTax,
      VMa_Tot	: sumaTotal,
      VMa_Efe	: this.denominacion_pagada,
      VMa_Camb	: this.cambio,
      VMa_Sta	: 1,
      VMa_Usu	: this.authService.get_NameUser(),
      VMa_TipPed	: 1,
      VMa_Sinc : 0
    }
    this.ls_vma.push(vma);
  }
  private save_ls_vfol() {
    const infoObj = this.dblocalService.getObject(KEY_LOCALSTORAGE);
    const vfol = {
      Fol_Cia : infoObj.tienda_idCia,
      Fol_Suc : infoObj.tienda_cajaSuc,
      Fol_Id : 'vMOS',
      Fol_Val : infoObj.cia_vMOS + 1,
    }
    this.ls_vfol.push(vfol);
  }
  private save_ventaExoneracion() {
    const infoObj = this.dblocalService.getObject(KEY_LOCALSTORAGE);
    this.obj_ventaExoneracion.negocio = infoObj.tienda_idCia;
    this.obj_ventaExoneracion.caja = infoObj.tienda_cajaSuc;
    this.obj_ventaExoneracion.folio = Number(infoObj.cia_vMOS + 1);
    this.ls_vexoneracion.push(this.obj_ventaExoneracion);
  }



  private get_IdTax(id: number) {
    this.dblocalService.find_ByIdTabla('ls_tax', 'Tax_Id', id).subscribe({
      next: (response) => {
        this.vde_TaxId = response as LsTax[];
      },
      error: (error) => this.toastr.error('Error al obtener el ID TAX')
    });

  }

  public add_Cupon(cuponId:number, cuponDesc:string, cuponPorc:string) {
    if (this.aCupones.length > 0) {
      this.toastr.warning("Ya se ha aplicado un cupón. Debe eliminarlo primero antes de aplicar otro.");
      return;
    }
    const nuevoCupon: ICupones = {
      id: cuponId,
      descripcion: cuponDesc,
      descuento: cuponPorc
    };
    this.aCupones.push(nuevoCupon);
    this.calculos();
  }

  public select_Categoria(idCategoria:number) {
    this.filter_articulos = this.articulos.filter(articulo => articulo.Art_Cat === idCategoria);
  }

  public incre_Articulo(id: number) {
    if (this.cantidad_articulo[id] > 0) {
      this.cantidad_articulo[id]--;
    }
  }

  public decre_Articulo(id: number) {
    if (!this.cantidad_articulo[id]) {
      this.cantidad_articulo[id] = 0;
    }
    this.cantidad_articulo[id]++;
  }

  public add_Articulo(idArticulo:number, cantidad:number, concepto:string, precioUnitario:string,idTax:number) {
    if (cantidad === 0 || cantidad === undefined) return;
    let importe = cantidad * parseInt(precioUnitario);
    if (!this.exist_Articulo(idArticulo,cantidad,importe)) {
      const nuevoArticulo: ITablaArticulos = {
        idArticulo: idArticulo,
        cantidad: cantidad,
        concepto: concepto,
        pu: precioUnitario,
        descuento: 0,
        importe: importe,
        renglonTabla: this.contadorArticulos++,
        idTax: idTax
      }
      this.aArticulos.push(nuevoArticulo);
    }
    this.calculos();
  }

  public exist_Articulo(idBuscado: number, cantidad:number, importe:number): boolean {
    let isExist: boolean = false;
    const articuloEncontrado = this.aArticulos.find(articulo => articulo.idArticulo === idBuscado);
    if (articuloEncontrado) {
      articuloEncontrado.cantidad = cantidad;
      articuloEncontrado.importe = importe;
      isExist = true;
    }
    return isExist;
  }

  private get_TDExoneracion() {
    this.dblocalService.get_DataTablaDB('exoneracion_td').subscribe({
      next: (result) => {
        this.td_exoneracion_local = result as IExoneracion[];
      },
      error: (err) => this.toastr.error('Error al obtener documento exoneracion (Local)')
    });
  }

  public save_venta_exoneracion() {
    this.ventaExoneracion.push(this.obj_ventaExoneracion);
  }


  private get_ProductosTienda() {
    this.get_Cupones();
    this.get_Categoria_Articulos();
    this.get_Articulos();
    this.get_Formas_Pago();
  }

  private get_Cupones() {
    this.indexedDB.getAll('ls_Cupdes').subscribe({
      next: (result) => {
        this.cupones = result as LsCupde[];
      },
      error: (err) => console.log('Error al obtener cupones de descuentos: ', err)
    });
  }

  private get_Categoria_Articulos() {
    this.indexedDB.getAll('ls_Cat').subscribe({
      next: (result) => {
        this.categorias = result as LsCat[];
      },
      error: (err) => console.log('Error al obtener categorias: ', err)
    });
  }

  private get_Articulos() {
    this.indexedDB.getAll('ls_Art').subscribe({
      next: (result) => {
        this.articulos = result as LsArt[];
      },
      error: (err) => console.log('Error al obtener articulos: ', err)
    });
  }

  private get_Formas_Pago() {
    this.indexedDB.getAll('ls_Fopa').subscribe({
      next: (result) => {
        this.metodos = result as LsFopa[];
      },
      error: (err) => console.log('Error al obtener cupones de descuentos: ', err)
    });
  }

  public get_HistorialTickets() {
    this.posService.get_HistorialTickets({fecha:this.fechaTicketVenta}).subscribe({
      next : (response) => {
        this.historial_ticket = response.data.listTickets;
        if(this.historial_ticket.length === 0) {
          this.toastr.warning('No se econtraron tickets de venta para la fecha seleccionada');
        }
      },
      error : (err) => this.toastr.error('Ocurrio un error al obtener el historial de ticket de venta')
    })
  }

  public filtrarCorte() {
    const infoObj = this.dblocalService.getObject(KEY_LOCALSTORAGE);
    const data = {
      idTienda: infoObj.tienda_idCia,
      idCaja: infoObj.tienda_cajaSuc,
      fecha: this.datePipe.transform(this.corte_FechaFilter, 'dd/MM/yyyy')
    }
    this.posService.get_CorteCaja(data).subscribe({
      next : (response) => {
        this.corte_FoPa = response.data.corte_fopa;
        this.corte_HoraImpresion = new Date();
        this.corte_TotalVendido = Number(response.data.corte_totalvendido);
        this.corte_FondoCaja = Number(response.data.corte_fondocaja);
        this.corte_TotalCaja = response.data.corte_totalencaja;
        this.corte_Descuentos = Number(response.data.corte_descuentos);
      },
      error : (err) => this.toastr.error('Ha ocurrido un error al obtener el corte de la caja: ', err)
    });
  }

  public imprimirTicketCorte() {
    console.log("Imprimiendo");
  }


}
