import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PructosComponent } from './pructos.component';

describe('PructosComponent', () => {
  let component: PructosComponent;
  let fixture: ComponentFixture<PructosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PructosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PructosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
