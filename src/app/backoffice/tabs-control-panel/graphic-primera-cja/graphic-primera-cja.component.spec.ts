import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicPrimeraCjaComponent } from './graphic-primera-cja.component';

describe('GraphicPrimeraCjaComponent', () => {
  let component: GraphicPrimeraCjaComponent;
  let fixture: ComponentFixture<GraphicPrimeraCjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphicPrimeraCjaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicPrimeraCjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
