import { Component, OnInit } from '@angular/core';
import { CarrouselComponent } from "../carrousel/carrousel.component";
import { TabInfoComponent } from "../tabs/tab-info/tab-info.component";
import { ProductInterface } from '../../services/interfaces/product-interface';
import { ProductService } from '../../services/auth/produc.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CarrouselComponent, TabInfoComponent, NgFor],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

    products: ProductInterface[] = [];
    
      constructor(private productService: ProductService) {}
    
      ngOnInit(): void {
        this.productService.getAllProducts().subscribe({
          next: (data) => {
            this.products = data;
          },
          error: (err) => {
            console.error('Error al obtener productos:', err);
          }
        });
      }
}
