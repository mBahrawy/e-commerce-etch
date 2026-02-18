import { Injectable, inject, signal, computed } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);

  readonly currentLang = signal<string>(localStorage.getItem('lang') || 'en');
  readonly isRtl = computed(() => this.currentLang() === 'ar');

  constructor() {
    const initialLang = this.currentLang();
    this.translate.setDefaultLang('en');
    this.translate.use(initialLang);
    this.updateDocumentAttributes(initialLang);
  }

  setLanguage(lang: string): void {
    this.currentLang.set(lang);
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.updateDocumentAttributes(lang);
  }

  toggleLanguage(): void {
    const newLang = this.currentLang() === 'en' ? 'ar' : 'en';
    this.setLanguage(newLang);
  }

  private updateDocumentAttributes(lang: string): void {
    if (typeof document === 'undefined') return;

    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }
}
