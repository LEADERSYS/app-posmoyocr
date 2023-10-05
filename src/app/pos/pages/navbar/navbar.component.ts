import { Component } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { AuthService } from 'src/app/login/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private navbarService:NavbarService, private authService: AuthService) {}

  public navbarSection(section:string) {
    this.navbarService.selectSection(section);
  }

  public logout() {
    try {
      this.authService.logout_Session();
    } catch (error) {
      console.error("Error al cerrar sesion");
    }
  }

}
