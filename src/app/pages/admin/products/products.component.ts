import { Component, OnInit, AfterViewInit, ViewChild, inject, signal, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';


import { AuthService } from '@@services/auth.service';
import { ProductService } from '@@services/product.service';
import { Product } from '@@interfaces/product';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatPaginatorModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export default class ProductsComponent implements OnInit, AfterViewInit {
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['id', 'thumbnail', 'title', 'stock', 'brand', 'category',  'price'];
  dataSource = new MatTableDataSource<Product>([]);
  pageSizeOptions = [5, 15, 25];

  protected pageLength = signal(0);
  protected pageIndex = signal(0);
  protected pageSize = signal(15);

  protected skip = signal(0);

  protected authService = inject(AuthService);
  protected productService = inject(ProductService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.getUser();
    this.getProducts();
  }

  getUser(){
    this.authService.me().subscribe();
  }

  getProducts() {
    this.productService.products(this.pageSize(), this.skip())
    .subscribe({
      next: (response) => {
        this.pageLength.set(response.total);
        this.skip.set(response.skip);
        this.dataSource = new MatTableDataSource<Product>(response.products);
      }
    })
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageLength.set(e.length);
    this.pageSize.set(e.pageSize);
    this.pageIndex.set(e.pageIndex);

    this.skip.set(e.pageIndex * e.pageSize);

    this.getProducts();
  }

  formatter(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

}