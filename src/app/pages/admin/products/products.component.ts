import { Component, OnInit, AfterViewInit, ViewChild, inject, signal, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';

import { ModalComponent } from '@@components/modal/modal.component';

import { AuthService } from '@@services/auth.service';
import { ProductService } from '@@services/product.service';
import { Product } from '@@interfaces/product';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatRippleModule,
    ModalComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export default class ProductsComponent implements OnInit, AfterViewInit {
  @ViewChild('modal', {static: true}) modal!: ModalComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageEvent!: PageEvent;
  displayedColumns: string[] = ['pos', 'thumbnail', 'title', 'stock', 'brand', 'category',  'price'];
  dataSource = new MatTableDataSource<Product>([]);
  pageSizeOptions = [5, 15, 25];

  protected pageLength = signal(0);
  protected pageIndex = signal(0);
  protected pageSize = signal(15);

  protected limit = signal(15);
  protected skip = signal(0);

  protected authService = inject(AuthService);
  protected productService = inject(ProductService);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.getUser();
    this.route.queryParamMap.subscribe(params => {
      const paramLimit = params.get('limit');
      const paramSkip = params.get('skip');
      if(paramLimit && this.pageSizeOptions.includes(Number(paramLimit))){
        this.limit.set(Number(paramLimit));
        this.pageSize.set(Number(paramLimit));
      }
      if(paramSkip){
        this.skip.set(Number(paramSkip));
      }
    });

    this.getProducts();
  }

  getUser(){
    this.authService.me().subscribe();
  }

  getProducts() {
    this.productService.products(this.limit(), this.skip())
    .subscribe({
      next: (response) => {
        this.pageLength.set(response.total);
        this.pageIndex.set(response.skip / this.limit())
        this.skip.set(response.skip);
        this.dataSource = new MatTableDataSource<Product>(response.products);
      }
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageLength.set(e.length);
    this.pageSize.set(e.pageSize);
    this.pageIndex.set(e.pageIndex);

    this.limit.set(e.pageSize);
    this.skip.set(e.pageIndex * e.pageSize);

    const queryParams = {
      limit: e.pageSize,
      skip: this.skip(),
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });

    this.getProducts();
  }

  onDetails(id: number){
    console.log(id);
    this.modal.open();
  }

  formatter(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

}
