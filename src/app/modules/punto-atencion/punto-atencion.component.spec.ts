import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoAtencionComponent } from './punto-atencion.component';

describe('PuntoAtencionComponent', () => {
  let component: PuntoAtencionComponent;
  let fixture: ComponentFixture<PuntoAtencionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PuntoAtencionComponent]
    });
    fixture = TestBed.createComponent(PuntoAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
