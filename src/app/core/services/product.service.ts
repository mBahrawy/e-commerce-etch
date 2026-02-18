import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://fakestoreapi.com/products';

  private readonly productsCache = signal<Product[]>([]);
  private readonly lastFetchTime = signal<number>(0);
  private readonly cacheDuration = 5 * 60 * 1000; // 5 minutes

  getProducts(): Observable<Product[]> {
    const now = Date.now();
    if (this.productsCache().length > 0 && now - this.lastFetchTime() < this.cacheDuration) {
      return of(this.productsCache());
    }
    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap(products => {
        this.productsCache.set(products);
        this.lastFetchTime.set(Date.now());
      })
    );
  }

  getProduct(id: number): Observable<Product> {
    const cached = this.productsCache().find(p => p.id === id);
    if (cached) {
      return of(cached);
    }
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${encodeURIComponent(category)}`);
  }

  addProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      tap(newProduct => {
        this.productsCache.update(products => [...products, newProduct]);
      })
    );
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product).pipe(
      tap(updated => {
        this.productsCache.update(products =>
          products.map(p => (p.id === id ? { ...p, ...updated } : p))
        );
      })
    );
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.productsCache.update(products => products.filter(p => p.id !== id));
      })
    );
  }

  clearCache(): void {
    this.productsCache.set([]);
    this.lastFetchTime.set(0);
  }
}
