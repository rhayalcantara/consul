import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LTurnosComponent } from './lturnos.component';

describe('LTurnosComponent', () => {
  let component: LTurnosComponent;
  let fixture: ComponentFixture<LTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LTurnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
