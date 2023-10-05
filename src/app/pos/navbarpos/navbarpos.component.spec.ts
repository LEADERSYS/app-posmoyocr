import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarposComponent } from './navbarpos.component';

describe('NavbarposComponent', () => {
  let component: NavbarposComponent;
  let fixture: ComponentFixture<NavbarposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarposComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
