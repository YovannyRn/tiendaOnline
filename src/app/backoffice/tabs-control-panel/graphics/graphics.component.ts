import { Component } from '@angular/core';
import { GraphicPrimeraCjaComponent } from "../graphic-primera-cja/graphic-primera-cja.component";
import { GraphicTerceraCajaComponent } from '../graphic-tercera-caja/graphic-tercera-caja.component';
import { GraphicCuartaCajaComponent } from "../graphic-cuarta-caja/graphic-cuarta-caja.component";
import { GraphicQuintaCajaComponent } from "../graphic-quinta-caja/graphic-quinta-caja.component";

@Component({
  selector: 'app-graphics',
  standalone: true,
  imports: [GraphicPrimeraCjaComponent, GraphicTerceraCajaComponent, GraphicCuartaCajaComponent, GraphicQuintaCajaComponent],
  templateUrl: './graphics.component.html',
  styleUrl: './graphics.component.scss'
})
export class GraphicsComponent {

}
