import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosRoutingModule } from './pos-routing.module';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { PosmoyoComponent } from './posmoyo/posmoyo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarposComponent } from './navbarpos/navbarpos.component';


@NgModule({
  declarations: [
    PosmoyoComponent,
    NavbarComponent,
    NavbarposComponent,
  ],
  imports: [
    CommonModule,
    PosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PosModule { }
