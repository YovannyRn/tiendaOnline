import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicCuartaCajaComponent } from './graphic-cuarta-caja.component';

describe('GraphicCuartaCajaComponent', () => {
  let component: GraphicCuartaCajaComponent;
  let fixture: ComponentFixture<GraphicCuartaCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphicCuartaCajaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicCuartaCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
