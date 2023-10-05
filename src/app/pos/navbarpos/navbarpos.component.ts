import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { AuthService } from 'src/app/login/services/auth.service';

@Component({
  selector: 'app-navbarpos',
  templateUrl: './navbarpos.component.html',
  styleUrls: ['./navbarpos.component.css']
})
export class NavbarposComponent implements OnInit {

  constructor(private navbarService:NavbarService, private authService: AuthService) {}

  ngOnInit(): void {

  }

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
