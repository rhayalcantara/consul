import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaExpedientePacienteComponent } from './lista-expediente-paciente.component';

describe('ListaExpedientePacienteComponent', () => {
  let component: ListaExpedientePacienteComponent;
  let fixture: ComponentFixture<ListaExpedientePacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaExpedientePacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaExpedientePacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
