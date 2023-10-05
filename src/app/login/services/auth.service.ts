import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from './token.service';
import { ICredenciales } from '../interface/ICredenciales';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //URL ENDPOINT - DVELOPMENT
  private uri = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient, private router: Router,
    private tokenService: TokenService, private toastService: ToastrService) { }

  validar_credenciales(userData: ICredenciales): Observable<any> {
    return this.http.post(this.uri + '/verification/user', userData);
  }

  get_UserLogged() {
    const token = this.tokenService.getToken();
    return token;
  }

  logout_Session() {
    this.tokenService.removeToken();
    this.router.navigate(['/auth/login']);
  }

  get_NameUser() {
    return this.tokenService.getNameUser();
  }

  get_ExpiredToken() {
    return this.tokenService.isExpired();
  }

  public redirect_Login(): void {
    this.toastService.error('Tu sesión ha expirado, redirigiendo al inicio de sesión en 5 segundos');
    setTimeout(() => {
      this.tokenService.removeToken();
      this.router.navigateByUrl('/auth/login');
    }, 5000);
  }

}
