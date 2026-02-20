import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { LoadingService } from '../../../core/services/loading.service';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [TranslateModule, PaginationComponent, ProductFormComponent],
  templateUrl: './product-table.component.html',
  animations: [
    trigger('modalOverlay', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('modalContent', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95) translateY(10px)' }),
        animate('300ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.95) translateY(10px)' }))
      ])
    ])
  ]
})
export class ProductTableComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly loadingService = inject(LoadingService);

  readonly products = signal<Product[]>([]);
  readonly searchTerm = signal('');
  readonly currentPage = signal(1);
  readonly showForm = signal(false);
  readonly editingProduct = signal<Product | null>(null);
  readonly showDeleteConfirm = signal(false);
  private productToDelete: Product | null = null;
  readonly pageSize = 5;

  private readonly debouncedSearch = toSignal(toObservable(this.searchTerm).pipe(debounceTime(300)), {
    initialValue: '',
  });

  readonly filteredProducts = computed(() => {
    const term = this.debouncedSearch().toLowerCase();
    const all = this.products();
    if (!term) return all;
    return all.filter(
      p =>
        p.title.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.price.toString().includes(term)
    );
  });

  readonly paginatedProducts = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredProducts().slice(start, start + this.pageSize);
  });

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.loadingService.show();
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.loadingService.hide();
      },
      error: () => this.loadingService.hide(),
    });
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
    this.currentPage.set(1);
  }

  openAddForm(): void {
    this.editingProduct.set(null);
    this.showForm.set(true);
  }

  openEditForm(product: Product): void {
    this.editingProduct.set({ ...product });
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
    this.editingProduct.set(null);
  }

  onSaveProduct(product: Partial<Product>): void {
    this.loadingService.show();
    const editing = this.editingProduct();

    if (editing) {
      this.productService.updateProduct(editing.id, product).subscribe({
        next: (updated) => {
          this.products.update((list) =>
            list.map((p) => (p.id === editing.id ? { ...p, ...product, ...updated } : p))
          );
          this.closeForm();
          this.loadingService.hide();
        },
        error: () => this.loadingService.hide(),
      });
    } else {
      this.productService.addProduct(product).subscribe({
        next: (created) => {
          const newProduct: Product = {
            id: created.id ?? this.products().length + 1,
            title: (product['title'] as string) ?? '',
            price: (product['price'] as number) ?? 0,
            description: (product['description'] as string) ?? '',
            category: (product['category'] as string) ?? '',
            image: (product['image'] as string) ?? '',
            rating: { rate: 0, count: 0 },
          };
          this.products.update((list) => [newProduct, ...list]);
          this.closeForm();
          this.loadingService.hide();
        },
        error: () => this.loadingService.hide(),
      });
    }
  }

  deleteProduct(product: Product): void {
    this.productToDelete = product;
    this.showDeleteConfirm.set(true);
  }

  confirmDelete(): void {
    if (!this.productToDelete) return;
    const id = this.productToDelete.id;
    this.loadingService.show();
    this.showDeleteConfirm.set(false);

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products.update((list) => list.filter((p) => p.id !== id));
        this.productToDelete = null;
        this.loadingService.hide();
      },
      error: () => this.loadingService.hide(),
    });
  }
}


