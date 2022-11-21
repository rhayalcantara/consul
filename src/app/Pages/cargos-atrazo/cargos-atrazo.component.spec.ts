import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargosAtrazoComponent } from './cargos-atrazo.component';

describe('CargosAtrazoComponent', () => {
  let component: CargosAtrazoComponent;
  let fixture: ComponentFixture<CargosAtrazoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargosAtrazoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargosAtrazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
