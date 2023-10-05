import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ToastrService } from 'ngx-toastr';
import { LsCia } from '../interface/ITablasResp';
import { Observable } from 'rxjs';
import { intlFormat } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class DBlocalService {

  constructor(private indexedDB: NgxIndexedDBService, private toastr: ToastrService) { }

  public set_DataDB(name_table:string, data_table: any) {
    this.indexedDB.bulkAdd(name_table, data_table).subscribe({
      next : (resp) => console.log('Todo bien'),
      error : (err) => console.log('Erro: ', err)
    });
  }

  public delete_DBLocal() {
    this.indexedDB.deleteDatabase();
  }

  public get_DataTablaDB(tabla:string) {
    return this.indexedDB.getAll(tabla);
  }

  public find_ById(idSucursal: number): Observable<LsCia> {
    return this.indexedDB.getByIndex('ls_Cia', 'Cia_Id', idSucursal);
  }

  public find_ByIdTabla(tabla:string, campo:string, key:number) {
    return this.indexedDB.getByIndex(tabla, campo, key);
  }





  //TODO: Crear objeto en localstorage
  localstorageObject() {
    const data = {
      tienda_name: null,
      tienda_idCia: null,
      tienda_cajaSuc: null,
      tienda_indexRen: null,
      cia_vMOS: null,
      cia_TDV: null,
      cia_usuarioId: null,
      section_pin: null,
      section_liberar: null,
      section_tiendas: null,
      section_configuracion: null,
      isData: null
    }
    this.createObject('saico-pos-tablet', data);
  }

  createObject(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getObject(key: string) {
    const data = localStorage.getItem(key);
    if (data === null) {
      return null;
    }
    return JSON.parse(data);
  }

  updateObjectField(key: string, field: string, value: any) {
    const data = this.getObject(key);
    data[field] = value;
    this.createObject(key, data);
  }

  deleteObject(key: string) {
    localStorage.removeItem(key);
  }

  objectExists(key: string) {
    return localStorage.getItem(key) !== null;
  }


}
