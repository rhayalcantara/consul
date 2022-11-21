import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuscarFechaComponent } from './form-buscar-fecha.component';

describe('FormBuscarFechaComponent', () => {
  let component: FormBuscarFechaComponent;
  let fixture: ComponentFixture<FormBuscarFechaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBuscarFechaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuscarFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
