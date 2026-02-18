import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://fakestoreapi.com/products/categories';

  private readonly categoriesCache = signal<Category[]>([]);
  private readonly lastFetchTime = signal<number>(0);
  private readonly cacheDuration = 10 * 60 * 1000; // 10 minutes

  getCategories(): Observable<Category[]> {
    const now = Date.now();
    if (this.categoriesCache().length > 0 && now - this.lastFetchTime() < this.cacheDuration) {
      return of(this.categoriesCache());
    }
    return this.http.get<Category[]>(this.apiUrl).pipe(
      tap(categories => {
        this.categoriesCache.set(categories);
        this.lastFetchTime.set(Date.now());
      })
    );
  }
}
