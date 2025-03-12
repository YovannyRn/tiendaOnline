import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { ProductInterface } from '../../services/interfaces/product-interface';
import { ProductService } from '../../services/auth/produc.service';

@Component({
  selector: 'app-pructos',
  imports: [NgFor],
  templateUrl: './pructos.component.html',
  styleUrl: './pructos.component.scss'
})
export class PructosComponent implements OnInit {


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
