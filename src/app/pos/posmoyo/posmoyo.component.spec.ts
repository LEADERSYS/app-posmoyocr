import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosmoyoComponent } from './posmoyo.component';

describe('PosmoyoComponent', () => {
  let component: PosmoyoComponent;
  let fixture: ComponentFixture<PosmoyoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosmoyoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosmoyoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
