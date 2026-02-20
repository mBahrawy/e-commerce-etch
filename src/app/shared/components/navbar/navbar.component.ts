import { Component, HostListener, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';
import { LanguageService } from '../../../core/services/language.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  readonly authService = inject(AuthService);
  readonly languageService = inject(LanguageService);
  readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  isMenuOpen = signal(false);

  toggleMenu(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.isMenuOpen.update(v => !v);
  }

  goToCart(): void {
    this.isMenuOpen.set(false);
    this.router.navigate(['/cart']);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (this.isMenuOpen()) {
      this.isMenuOpen.set(false);
    }
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
    this.isMenuOpen.set(false);
  }

  logout(): void {
    this.authService.logout();
    this.isMenuOpen.set(false);
    this.router.navigate(['/login']);
  }
}



