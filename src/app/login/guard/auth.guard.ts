import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export function AuthGuard() : CanActivateFn {
  return () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    if(!authService.get_UserLogged()){
      router.navigateByUrl('/auth/login');
    }

    return true;
  };

}
