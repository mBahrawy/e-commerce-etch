import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { ProductTableComponent } from '../product-table/product-table.component';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NavbarComponent, ProductTableComponent, LoaderComponent],
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent {}


