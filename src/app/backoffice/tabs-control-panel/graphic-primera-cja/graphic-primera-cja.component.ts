import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-graphic-primera-cja',
  imports: [BaseChartDirective],
  templateUrl: './graphic-primera-cja.component.html',
  styleUrl: './graphic-primera-cja.component.scss'
})
export class GraphicPrimeraCjaComponent implements OnInit {

  ngOnInit(): void {
    this.setChartData()
  }

  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false, //proporcion de grafico
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
      tooltip: {
        
      },
      title: {
        text: 'Primer Grafico',
        display: true,
      }
    }

  }


  public doughnutChartLabels: string[] = [];
  public doughnutChartData: {
    labels: string[],
    datasets: ChartDataset<'pie'>[],
  } = {
    labels:[],
    datasets:[{
      data: [],
      backgroundColor:[],
      hoverBackgroundColor:['Purple'],
    }]
  }

  public doughnutChartType:ChartType = 'pie';


  private setChartData(){
    this.doughnutChartLabels = [
      "label 1",
      "label 2",
      "label 3",
      "label 4",
    ]
    this.doughnutChartData.datasets[0].data = [20,30,40,50]
    this.doughnutChartData.datasets[0].backgroundColor = ["red","gray", "green","yellow"]
  }
  



}
