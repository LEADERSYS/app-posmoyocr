import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITablasResp } from '../interface/ITablasResp';
import { IFoliosResp } from '../interface/IFoliosResp';
import { ILs } from '../interface/ILs_db';
import { IHistorialInterface } from '../interface/IHistorialTickets';
import { ICorteCaja } from '../interface/ICorteCaja';

@Injectable({
  providedIn: 'root'
})
export class PosService {

  private uri = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) { }

  public get_TablasDB(idUsuario: {}): Observable<ITablasResp> {
    return this.http.post<ITablasResp>(this.uri + '/data/info', idUsuario);
  }

  public get_HistorialTickets(fecha: {}) : Observable<IHistorialInterface> {
    return this.http.post<IHistorialInterface>(this.uri + '/data/tickets', fecha);
  }

  public get_Folios(idTienda: {}): Observable<IFoliosResp> {
    return this.http.post<IFoliosResp>(this.uri + '/data/folio', idTienda);
  }

  public generar_venta(venta: ILs[]): Observable<any> {
    return this.http.post(this.uri + '/data/generarventa', venta);
  }

  public get_CorteCaja(filtrosCorte : {}) : Observable<ICorteCaja> {
    return this.http.post<ICorteCaja>(this.uri + '/data/corte', filtrosCorte);
  }

}
