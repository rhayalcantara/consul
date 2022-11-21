import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProcedimientosComponent } from './list-procedimientos.component';

describe('ListProcedimientosComponent', () => {
  let component: ListProcedimientosComponent;
  let fixture: ComponentFixture<ListProcedimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProcedimientosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProcedimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
