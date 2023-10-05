import { NgModule } from '@angular/core';
import { NavigationStart, Router, RouterModule, Routes } from '@angular/router';
import { PosmoyoComponent } from './posmoyo/posmoyo.component';
import { AuthGuard } from '../login/guard/auth.guard';
import { AuthService } from '../login/services/auth.service';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'pos', component: PosmoyoComponent, canActivate: [AuthGuard()] },
      { path: '**', redirectTo: 'pos' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosRoutingModule {
  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const currentRoute = event.url;
        const isLoggedIn = this.authService.get_UserLogged();
        if (currentRoute === '/auth/login' && isLoggedIn) {
          this.router.navigateByUrl('/app/pos');
        }
      }
    });
  }
}
