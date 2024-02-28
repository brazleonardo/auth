import { Component, OnInit, OnDestroy, inject } from '@angular/core'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'

import { FilterAdminService } from '@@services/filter-admin.service'
import { AuthService } from '@@services/auth.service'
import { CategoryService } from '@@services/category.service'

@Component({
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export default class CategoriesComponent implements OnInit, OnDestroy {
  protected displayedColumns: string[] = ['pos', 'name']
  protected dataSource = new MatTableDataSource<string>([])

  private filterAdminService = inject(FilterAdminService)
  private authService = inject(AuthService)
  private categoryService = inject(CategoryService)

  ngOnInit(): void {
    this.filterAdminService.setHasFilter = {
      search: true,
      options: false,
    }
    this.getUser()
    this.getCategories()
  }

  getUser() {
    this.authService.me().subscribe()
  }

  getCategories() {
    this.categoryService.categories().subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource<string>(response)
      },
    })
  }

  ngOnDestroy() {
    this.filterAdminService.setHasFilter = null
    this.filterAdminService.searchForm.setValue('')
  }
}
