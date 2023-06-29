import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnfermeriaPageComponent } from './enfermeria-page.component';

describe('EnfermeriaPageComponent', () => {
  let component: EnfermeriaPageComponent;
  let fixture: ComponentFixture<EnfermeriaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnfermeriaPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnfermeriaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
