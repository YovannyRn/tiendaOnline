import { Component } from '@angular/core';
import { TabStatisticsComponent } from "../tabs-control-panel/tab-statistics/tab-statistics.component";
import { GraphicsComponent } from "../tabs-control-panel/graphics/graphics.component";


@Component({
  selector: 'app-control-panel',
  imports: [TabStatisticsComponent, GraphicsComponent],
  standalone: true,
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss'
})
export class ControlPanelComponent {

}
