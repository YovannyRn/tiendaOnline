import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicQuintaCajaComponent } from './graphic-quinta-caja.component';

describe('GraphicQuintaCajaComponent', () => {
  let component: GraphicQuintaCajaComponent;
  let fixture: ComponentFixture<GraphicQuintaCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphicQuintaCajaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicQuintaCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
