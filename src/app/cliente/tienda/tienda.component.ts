import { Component, OnInit } from '@angular/core';
import { TabPerfilHeaderComponent } from "../../backoffice/tabs/tab-perfil-header/tab-perfil-header.component";
import { PructosComponent } from "../../backoffice/pructos/pructos.component";
import { ProductService } from '../../services/auth/produc.service';
import { ProductInterface } from '../../services/interfaces/product-interface';
import { CommonModule, NgFor } from '@angular/common';
import { PopupService } from '../../services/utils/popup.service';

@Component({
  selector: 'app-tienda',
  imports: [NgFor, CommonModule],
  standalone: true,
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.scss'
})
export class TiendaComponent implements OnInit {

  products: ProductInterface[] = [];
  cart: ProductInterface[] = [];
  cartCount: number = 0;
  totalAmount: number = 0;

  constructor(private productService: ProductService, private popupService: PopupService) {}

  
  ngOnInit(): void {
    this.loadProducts();
  }

  
  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      }
    });
  }

  addToCart(product: ProductInterface): void {
    this.cart.push(product);
    this.cartCount = this.cart.length;
    this.popupService.showMessage("Producto añadido", `${product.name} se ha añadido al carrito.`, "success");
  }

  
  openProductDetailsPopup(product: ProductInterface) {
    this.popupService.showProductDetailsPopup(product);
  }

processPayment(): void {
  this.popupService.showPaymentPopup().then((paymentData) => {
    if (paymentData) {
      console.log('Pago exitoso:', paymentData);
      this.popupService.showMessage("Pago Exitoso", "Tu compra se ha realizado correctamente.", "success");
      this.cart = []; 
      this.cartCount = 0;
      this.totalAmount = 0;
    }
  });
}
}
