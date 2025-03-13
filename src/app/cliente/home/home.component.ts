import { Component } from '@angular/core';
import { CarrouselComponent } from "../carrousel/carrousel.component";
import { TabInfoComponent } from "../tabs/tab-info/tab-info.component";

@Component({
  selector: 'app-home',
  imports: [CarrouselComponent, TabInfoComponent],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
