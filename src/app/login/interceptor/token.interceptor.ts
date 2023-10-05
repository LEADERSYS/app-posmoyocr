import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.tokenService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization : `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    return next.handle(request);
  }

}
