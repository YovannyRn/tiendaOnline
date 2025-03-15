import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ProductInterface } from '../interfaces/product-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly PRODUCT_KEY = 'tienda_product';

  constructor(private http: HttpClient) {}

  saveProduct(product: ProductInterface): void {
    sessionStorage.setItem(this.PRODUCT_KEY, JSON.stringify(product));
  }

  getProduct(): ProductInterface | null {
    const productData = sessionStorage.getItem(this.PRODUCT_KEY);
    return productData ? JSON.parse(productData) as ProductInterface : null;
  }

  removeProduct(): void {
    sessionStorage.removeItem(this.PRODUCT_KEY);
  }

  getAllProducts(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(`${environment.apiUrl}/products`);
  }

  getProductById(id: string): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(`${environment.apiUrl}/products/${id}`);
  }

  createProduct(product: ProductInterface): Observable<ProductInterface> {
    return this.http.post<ProductInterface>(`${environment.apiUrl}/products/add`, product);
  }

  updateProduct(id: string, product: ProductInterface): Observable<ProductInterface> {
    return this.http.put<ProductInterface>(`${environment.apiUrl}/products/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/products/${id}`);
  }
}
