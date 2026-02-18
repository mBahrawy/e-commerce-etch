import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, TranslateModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);
  readonly languageService = inject(LanguageService);

  username = '';
  password = '';
  readonly errorMessage = signal('');

  toggleLang(): void {
    this.languageService.toggleLanguage();
  }

  fillCredentials(role: 'user' | 'admin'): void {
    this.username = role;
    this.password = role;
  }

  onLogin(): void {
    this.errorMessage.set('');

    if (!this.username || !this.password) {
      this.errorMessage.set(this.translate.instant('login.fill_all_fields'));
      return;
    }

    const success = this.authService.login(this.username, this.password);

    if (success) {
      const route = this.authService.isAdmin() ? '/admin' : '/user';
      this.router.navigate([route]);
    } else {
      this.errorMessage.set(this.translate.instant('login.error'));
    }
  }
}


