import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly TOKEN_KEY = 'token';

  constructor(private cookieService: CookieService) {}

  public setToken(token: string): void {
    const tokenUser = JSON.stringify(token);
    const parsedObject = JSON.parse(tokenUser);
    this.cookieService.set(this.TOKEN_KEY, parsedObject);
  }

  public getToken(): string | null {
    return this.cookieService.get(this.TOKEN_KEY);
  }

  public removeToken(): void {
    this.cookieService.delete(this.TOKEN_KEY);
  }

  public isExpired(): boolean{
    const token: string | null = this.getToken();
    if(token !== null) {
      const tokenData: { exp: number } = jwt_decode(token);
      const expirationDate = new Date(tokenData.exp * 1000); // Multiplica por 1000 para convertir a milisegundos
      return expirationDate.getTime() <= Date.now();
    }
    return true;
  }

  public getNameUser(): any {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    let name_user: any;
    name_user = jwt_decode(token);
    return name_user.id || 'User';
  }
}

