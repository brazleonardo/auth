import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [MatListModule, MatRippleModule, RouterModule, RouterLinkActive],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent {

}
