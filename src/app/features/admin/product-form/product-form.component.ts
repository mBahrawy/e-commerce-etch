import { Component, input, output, signal, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Product } from '../../../core/models/product.model';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, TranslateModule],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  private readonly categoryService = inject(CategoryService);

  readonly product = input<Product | null>(null);
  readonly save = output<Partial<Product>>();
  readonly cancel = output<void>();

  readonly categories = signal<Category[]>([]);

  formData: Partial<Product> = {
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
  };

  ngOnInit(): void {
    const p = this.product();
    if (p) {
      this.formData = {
        title: p.title,
        price: p.price,
        description: p.description,
        category: p.category,
        image: p.image,
      };
    }

    this.categoryService.getCategories().subscribe(cats => {
      this.categories.set(cats);
      if (!this.formData.category && cats.length > 0) {
        this.formData.category = cats[0];
      }
    });
  }

  onSubmit(): void {
    if (this.formData.title && this.formData.price && this.formData.category) {
      this.save.emit(this.formData);
    }
  }
}


