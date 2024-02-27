import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  inject,
  signal,
  OnDestroy,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, ActivatedRoute, Router } from '@angular/router'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { MatRippleModule } from '@angular/material/core'
import { MatDialog } from '@angular/material/dialog'

import { ModalFilterComponent } from './components/modal-filter/modal-filter.component'
import { ModalDetailsComponent } from './components/modal-details/modal-details.component'

import { FilterAdminService } from '@@services/filter-admin.service'
import { AuthService } from '@@services/auth.service'
import { ProductService } from '@@services/product.service'
import { Product } from '@@models/product.models'

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatRippleModule,
    ModalFilterComponent,
    ModalDetailsComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export default class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator

  private filterAdminService = inject(FilterAdminService)
  private authService = inject(AuthService)
  private productService = inject(ProductService)
  private dialogModal = inject(MatDialog)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  protected pageEvent!: PageEvent
  protected displayedColumns: string[] = [
    'pos',
    'thumbnail',
    'title',
    'stock',
    'brand',
    'category',
    'price',
  ]
  protected dataSource = new MatTableDataSource<Product>([])
  protected pageSizeOptions = [5, 15, 25]

  protected pageLength = signal(0)
  protected pageIndex = signal(0)
  protected pageSize = signal(15)

  protected limit = signal(15)
  protected skip = signal(0)

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  ngOnInit() {
    this.filterAdminService.setHasFilter = {
      search: true,
      options: true,
    }
    this.getUser()
    this.route.queryParamMap.subscribe((params) => {
      const paramLimit = params.get('limit')
      const paramSkip = params.get('skip')
      if (paramLimit && this.pageSizeOptions.includes(Number(paramLimit))) {
        this.limit.set(Number(paramLimit))
        this.pageSize.set(Number(paramLimit))
      }
      if (paramSkip) {
        this.skip.set(Number(paramSkip))
      }
    })

    this.getProducts()
    this.onWachModalFilter()
  }

  getUser() {
    this.authService.me().subscribe()
  }

  getProducts() {
    this.productService.products(this.limit(), this.skip()).subscribe({
      next: (response) => {
        this.pageLength.set(response.total)
        this.pageIndex.set(response.skip / this.limit())
        this.skip.set(response.skip)
        this.dataSource = new MatTableDataSource<Product>(response.products)
      },
    })
  }

  handlePageEvent(event: PageEvent) {
    this.pageEvent = event
    this.pageLength.set(event.length)
    this.pageSize.set(event.pageSize)
    this.pageIndex.set(event.pageIndex)

    this.limit.set(event.pageSize)
    this.skip.set(event.pageIndex * event.pageSize)

    const queryParams = {
      limit: event.pageSize,
      skip: this.skip(),
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    })

    this.getProducts()
  }

  onWachModalFilter() {
    this.filterAdminService.getOpenModal.subscribe((openModal) => {
      if (openModal) {
        const dialogRef = this.dialogModal.open(ModalFilterComponent, {
          position: { top: '80px' },
        })

        dialogRef.afterClosed().subscribe(() => {
          this.filterAdminService.setOpenModal = false
        })
      }
    })
  }

  onDetails(product?: Product) {
    const dialogRef = this.dialogModal.open(ModalDetailsComponent, {
      position: { top: '0', right: '0' },
      data: {
        title: 'Editar Produto',
        product,
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`)
    })
  }

  formatter(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  }

  ngOnDestroy() {
    this.filterAdminService.setHasFilter = null
  }
}
