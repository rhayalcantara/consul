import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAntecedentePersonalesComponent } from './list-antecedente-personales.component';

describe('ListAntecedentePersonalesComponent', () => {
  let component: ListAntecedentePersonalesComponent;
  let fixture: ComponentFixture<ListAntecedentePersonalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAntecedentePersonalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAntecedentePersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
