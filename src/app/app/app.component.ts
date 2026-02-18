import { Component, inject, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from '../core/services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private readonly languageService = inject(LanguageService);

  constructor() {
    effect(() => {
      const isRtl = this.languageService.isRtl();
      document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
      document.documentElement.lang = this.languageService.currentLang();
    });
  }
}


