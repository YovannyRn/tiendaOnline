import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { ProductInterface } from '../../services/interfaces/product-interface';
import { ProductService } from '../../services/auth/produc.service';
import { RouterLink } from '@angular/router';
import { PopupService } from '../../services/utils/popup.service';

@Component({
  selector: 'app-pructos',
  imports: [NgFor],
  templateUrl: './pructos.component.html',
  styleUrl: './pructos.component.scss'
})
export class PructosComponent implements OnInit {

  products: ProductInterface[] = [];
  product2: ProductInterface[] = [];

  constructor(private productService: ProductService, private popupService: PopupService) {}

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

  // Función para mostrar el formulario del popup
  async openAddProductPopup() {
    const result = await this.popupService.showProductFormPopup();
    if (result) {
      this.productService.createProduct(result).subscribe({
        next: (product) => {
          this.products.push(product); // Agregar el nuevo producto a la lista
          this.popupService.showMessage('Éxito', 'Producto creado con éxito', 'success');
        },
        error: (err) => {
          this.popupService.showError('Error al crear el producto');
          console.error('Error al crear el producto:', err);
        }
      });
    }
  }

   // Función para eliminar un producto con confirmación
   async openDeleteProductPopup(productId: number) {
    const confirmed = await this.popupService.showConfirmation(
      'Confirmación de eliminación', 
      '¿Estás seguro de que deseas eliminar este producto?', 
      'Eliminar', 
      'Cancelar'
    );
  
    if (confirmed) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.products = this.products.filter(product => product.id !== productId); // Eliminar el producto de la lista
          this.popupService.showMessage('Éxito', 'Producto eliminado con éxito', 'success');
        },
        error: (err) => {
          this.popupService.showError('Error al eliminar el producto');
          console.error('Error al eliminar el producto:', err);
        }
      });
    }
  }
  
}
