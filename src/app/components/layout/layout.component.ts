import { Component, inject, ChangeDetectorRef, AfterContentChecked } from '@angular/core'
import { NgClass } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'

import { DrawerComponent } from '@@components/drawer/drawer.component'

import { AuthService } from '@@services/auth.service'
import { FilterAdminService } from '@@services/filter-admin.service'
import { FilterAdmin } from '@@models/filter-admin.models'

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    NgClass,
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    DrawerComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements AfterContentChecked {
  private changeDetector = inject(ChangeDetectorRef)
  private authService = inject(AuthService)
  private filterAdminService = inject(FilterAdminService)
  protected hasFilter: FilterAdmin | null = null

  constructor() {
    this.filterAdminService.getHasFilter.subscribe((response) => (this.hasFilter = response))
  }

  onLogout() {
    this.authService.signOut()
  }

  ngAfterContentChecked() {
    this.changeDetector.detectChanges()
  }
}
