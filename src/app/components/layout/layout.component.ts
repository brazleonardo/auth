import { Component, inject, ChangeDetectorRef, AfterContentChecked } from '@angular/core'
import { NgClass } from '@angular/common'
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

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
import { debounceTime, exhaustMap } from 'rxjs'

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    NgClass,
    RouterOutlet,
    ReactiveFormsModule,
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
  private activatedRoute = inject(ActivatedRoute)
  private router = inject(Router)
  private changeDetector = inject(ChangeDetectorRef)
  private authService = inject(AuthService)
  private filterAdminService = inject(FilterAdminService)
  protected hasFilter: FilterAdmin | null = null
  protected searchForm = new FormControl<string>('')

  constructor() {
    this.filterAdminService.getHasFilter.subscribe((response) => (this.hasFilter = response))

    this.searchForm.valueChanges
      .pipe(
        debounceTime(1000),
        exhaustMap((value) => this.onSearch(value ?? '')),
      )
      .subscribe()
  }

  onSearch(value: string) {
    const queryParams = { search: value }
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    })

    return value
  }

  onOpenModalFilter() {
    this.filterAdminService.setOpenModal = true
  }

  onLogout() {
    this.authService.signOut()
  }

  ngAfterContentChecked() {
    this.changeDetector.detectChanges()
  }
}
