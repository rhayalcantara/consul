import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormprocedimientosComponent } from './formprocedimientos.component';

describe('FormprocedimientosComponent', () => {
  let component: FormprocedimientosComponent;
  let fixture: ComponentFixture<FormprocedimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormprocedimientosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormprocedimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
