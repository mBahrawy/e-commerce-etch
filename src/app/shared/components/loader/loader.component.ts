import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingService } from '../../../core/services/loading.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './loader.component.html',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LoaderComponent {
  readonly loadingService = inject(LoadingService);
}
