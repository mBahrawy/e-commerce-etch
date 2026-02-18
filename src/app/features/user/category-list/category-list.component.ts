import { Component, input, output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent {
  readonly categories = input.required<Category[]>();
  readonly selectedCategory = input.required<string>();
  readonly categorySelect = output<string>();
}


