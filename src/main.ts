/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {
  Chart,
  ArcElement,
  PieController,
  DoughnutController,
  Legend,
  Tooltip,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarController,
  BarElement,
} from 'chart.js';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

// linea de configuracion
Chart.register(
  ArcElement,
  PieController,
  DoughnutController,
  Legend,
  Tooltip,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarController,
  BarElement
);
