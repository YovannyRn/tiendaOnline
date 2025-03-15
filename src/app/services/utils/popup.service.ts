import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import Swal, { SweetAlertResult } from "sweetalert2";
import { ProductInterface } from '../interfaces/product-interface';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  /**
   * Muestra un mensaje emergente con SweetAlert2.
   */
  showMessage(
    title: string, 
    message: string, 
    icon: 'success' | 'warning' | 'error' | 'info' | 'question' = 'info'
  ): void {
    Swal.fire({
      title: title,
      text: message,
      icon: icon,
      confirmButtonText: "Cerrar notificación"
    });
  }

  /**
   * Muestra un mensaje de error.
   */
  showError(message: string): void {
    Swal.fire({
      title: "Error",
      text: message,
      icon: "error",
      confirmButtonText: "Cerrar"
    });
  }

  /**
   * Muestra un loader (cargando...) mientras se espera una acción.
   */
  loader(title: string = "Cargando...", message: string = ''): void {
    Swal.fire({
      title: title,
      text: message,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

  /**
   * Muestra una confirmación con opciones de aceptar o cancelar.
   */
  async showConfirmation(
    title: string, 
    message: string, 
    confirmButtonText: string = "Aceptar", 
    cancelButtonText: string = "Cancelar"
  ): Promise<boolean> {
    const result: SweetAlertResult<any> = await Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      showCancelButton: true
    });

    return result.isConfirmed;
  }

  /**
   * Cierra cualquier popup activo.
   */
  close(): void {
    Swal.close();
  }

  /**
   * Muestra un popup con campos de entrada para cambiar la contraseña.
   */
  async showChangePasswordPopup(): Promise<{ username: string, oldPassword: string, newPassword: string } | null> {
    const result: SweetAlertResult<any> = await Swal.fire({
      title: 'Cambiar Contraseña',
      html: `
        <input id="swal-username" class="swal2-input" placeholder="Nombre de Usuario" type="text">
        <input id="swal-oldPassword" class="swal2-input" placeholder="Contraseña Actual" type="password">
        <input id="swal-newPassword" class="swal2-input" placeholder="Nueva Contraseña" type="password">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Cambiar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const username = (document.getElementById('swal-username') as HTMLInputElement)?.value;
        const oldPassword = (document.getElementById('swal-oldPassword') as HTMLInputElement)?.value;
        const newPassword = (document.getElementById('swal-newPassword') as HTMLInputElement)?.value;

        if (!username || !oldPassword || !newPassword) {
          Swal.showValidationMessage('Todos los campos son obligatorios.');
          return null;
        }

        return { username, oldPassword, newPassword };
      }
    });

    return result.isConfirmed ? result.value : null;
  }

  async showProductFormPopup(): Promise<any | null> {
    const result: SweetAlertResult<any> = await Swal.fire({
      title: 'Agregar Producto',
      html: `
        <input id="product-name" class="swal2-input" placeholder="Nombre del producto" type="text">
        <input id="product-description" class="swal2-input" placeholder="Descripción" type="text">
        <input id="product-image" class="swal2-input" placeholder="Imagen (URL)" type="text">
        <input id="product-price" class="swal2-input" placeholder="Precio" type="number">
        <input id="product-tax" class="swal2-input" placeholder="Impuesto" type="number">
        <input id="product-currency" class="swal2-input" placeholder="Moneda" type="text">
        <input id="product-seller-username" class="swal2-input" placeholder="Nombre de usuario del vendedor" type="text">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Agregar Producto',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const name = (document.getElementById('product-name') as HTMLInputElement)?.value;
        const description = (document.getElementById('product-description') as HTMLInputElement)?.value;
        const image = (document.getElementById('product-image') as HTMLInputElement)?.value;
        const price = (document.getElementById('product-price') as HTMLInputElement)?.value;
        const tax = (document.getElementById('product-tax') as HTMLInputElement)?.value;
        const currency = (document.getElementById('product-currency') as HTMLInputElement)?.value;
        const sellerUsername = (document.getElementById('product-seller-username') as HTMLInputElement)?.value;

        if (!name || !description || !image || !price || !tax || !currency || !sellerUsername) {
          Swal.showValidationMessage('Todos los campos son obligatorios.');
          return null;
        }

        return { name, description, image, price, tax, currency, sellerUsername };
      }
    });

    return result.isConfirmed ? result.value : null;
  }

  async showProductDetailsPopup(product: ProductInterface): Promise<void> {
    await Swal.fire({
      title: product.name,
      html: `
        <div>
          <img src="${product.image}" alt="Imagen del Producto" style="width: 100%; height: auto;">
          <p><strong>ID del producto:</strong> ${product.id}</p>
          <p><strong>Descripción:</strong> ${product.description}</p>
          <p><strong>Precio:</strong> ${product.price} ${product.currency}</p>
          <p><strong>Impuesto:</strong> ${product.tax}%</p>
          <p><strong>Vendedor:</strong> ${product.sellerUsername}</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Cerrar',
      cancelButtonText: 'Cancelar',
      width: '400px',
      padding: '20px'
    });
  }
  

  open(template: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    // Limpiar el contenedor antes de insertar la nueva vista
    viewContainerRef.clear();
    // Crear la vista embebida del template en el contenedor
    viewContainerRef.createEmbeddedView(template);
  }

  closeViewContainer(viewContainerRef: ViewContainerRef) {
    // Limpiar el contenedor (cerrar el popup)
    viewContainerRef.clear();
  }

  async showPaymentPopup(): Promise<{ name: string, cardType: string, cardNumber: string, cvv: string, expiryDate: string } | null> {
    const result = await Swal.fire({
      title: 'Detalles de Pago',
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Nombre del Titular">
        <select id="swal-card-type" class="swal2-input">
          <option value="Visa">Visa</option>
          <option value="Mastercard">Mastercard</option>
          <option value="American Express">American Express</option>
        </select>
        <input id="swal-card-number" class="swal2-input" placeholder="Número de Tarjeta" type="text" maxlength="16">
        <input id="swal-cvv" class="swal2-input" placeholder="CVV" type="text" maxlength="3">
        <input id="swal-expiry-date" class="swal2-input" placeholder="Fecha de Expiración (MM/YY)" type="text" maxlength="5">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Pagar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const name = (document.getElementById('swal-name') as HTMLInputElement)?.value.trim();
        const cardType = (document.getElementById('swal-card-type') as HTMLSelectElement)?.value;
        const cardNumber = (document.getElementById('swal-card-number') as HTMLInputElement)?.value.trim();
        const cvv = (document.getElementById('swal-cvv') as HTMLInputElement)?.value.trim();
        const expiryDate = (document.getElementById('swal-expiry-date') as HTMLInputElement)?.value.trim();
  
        if (!name || !cardNumber || !cvv || !expiryDate) {
          Swal.showValidationMessage('Todos los campos son obligatorios.');
          return null;
        }
        
        if (!/^\d{16}$/.test(cardNumber)) {
          Swal.showValidationMessage('Número de tarjeta inválido. Debe tener 16 dígitos.');
          return null;
        }
  
        if (!/^\d{3}$/.test(cvv)) {
          Swal.showValidationMessage('CVV inválido. Debe tener 3 dígitos.');
          return null;
        }
  
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
          Swal.showValidationMessage('Fecha de expiración inválida. Formato MM/YY.');
          return null;
        }
  
        return { name, cardType, cardNumber, cvv, expiryDate };
      }
    });
  
    return result.isConfirmed ? result.value : null;
  }
}


