import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Product } from '../../../core/models/product.model';
import { Category } from '../../../core/models/category.model';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { LoadingService } from '../../../core/services/loading.service';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { CategoryListComponent } from '../category-list/category-list.component';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [TranslateModule, NavbarComponent, LoaderComponent, CategoryListComponent, ProductCardComponent],
  templateUrl: './user-dashboard.component.html',
})
export class UserDashboardComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);
  private readonly loadingService = inject(LoadingService);

  readonly categories = signal<Category[]>([]);
  readonly allProducts = signal<Product[]>([]);
  readonly selectedCategory = signal<string>('all');
  readonly isLoadingProducts = signal(false);
  readonly skeletonItems = Array.from({ length: 8 }, (_, i) => i);

  readonly displayProducts = computed(() => {
    const cat = this.selectedCategory();
    const products = this.allProducts();
    if (cat === 'all') return products;
    return products.filter((p) => p.category === cat);
  });

  ngOnInit(): void {
    this.loadCategories();
    this.loadAllProducts();
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe((cats) => {
      this.categories.set(cats);
    });
  }

  private loadAllProducts(): void {
    this.isLoadingProducts.set(true);
    this.loadingService.show();
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.allProducts.set(products);
        this.isLoadingProducts.set(false);
        this.loadingService.hide();
      },
      error: () => {
        this.isLoadingProducts.set(false);
        this.loadingService.hide();
      },
    });
  }

  onCategorySelect(category: string): void {
    this.selectedCategory.set(category);
  }
}


