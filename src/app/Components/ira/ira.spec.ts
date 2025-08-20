import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ira } from './ira';

describe('Ira', () => {
  let component: Ira;
  let fixture: ComponentFixture<Ira>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ira]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ira);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
