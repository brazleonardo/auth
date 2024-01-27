import { LayoutComponent } from '@@components/layout/layout.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'auth';
}
