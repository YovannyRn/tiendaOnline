import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartDataset, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-graphic-tercera-caja',
  imports: [BaseChartDirective],
  templateUrl: './graphic-tercera-caja.component.html',
  styleUrl: './graphic-tercera-caja.component.scss'
})
export class GraphicTerceraCajaComponent implements OnInit {

  ngOnInit(): void {
    this.setChartData();
  }

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Meses',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Valores',
        },
        ticks: {
          stepSize: 20
        },
      },
    },
  };

  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };

  public lineChartType: ChartType = 'line';

  private setChartData() {
    this.lineChartData.labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
    this.lineChartData.datasets = [
      {
        label: 'Dataset 1',
        data: [50, 0, 90, 10, 200, 60],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgb(75, 192, 192)',
        fill: true,
      },
      {
        label: 'Dataset 2',
        data: [0, 90, 10, 105, 10, 150],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgb(255, 99, 132)',
        fill: true,
      }
    ];
  }
  
}
