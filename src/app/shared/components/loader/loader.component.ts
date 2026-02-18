import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './loader.component.html',
})
export class LoaderComponent {
  readonly loadingService = inject(LoadingService);
}


