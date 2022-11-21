import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocpacComponent } from './docpac.component';

describe('DocpacComponent', () => {
  let component: DocpacComponent;
  let fixture: ComponentFixture<DocpacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocpacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocpacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
