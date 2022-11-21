import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAntecedentePersonalesComponent } from './form-antecedente-personales.component';

describe('FormAntecedentePersonalesComponent', () => {
  let component: FormAntecedentePersonalesComponent;
  let fixture: ComponentFixture<FormAntecedentePersonalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAntecedentePersonalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAntecedentePersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
