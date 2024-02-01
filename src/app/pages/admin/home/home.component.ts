import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


import { AuthService } from '@@services/auth.service';
import { ProductService } from '@@services/product.service';
import { DataProducts, Product } from '@@interfaces/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent implements OnInit {
  protected authService = inject(AuthService);
  protected productService = inject(ProductService);
  protected data = signal<DataProducts>({
    products: [],
    total: 0,
    skip: 0,
    limit: 15,
  });

  displayedColumns: string[] = ['id', 'thumbnail', 'title', 'stock', 'brand', 'category',  'price'];
  dataSource = new MatTableDataSource<Product>([]);

  ngOnInit() {
    this.getUser();
    this.getProducts();
  }

  getUser(){
    this.authService.me().subscribe();
  }

  getProducts() {
    this.productService.products(this.data().limit, this.data().skip)
    .subscribe({
      next: (response) => {
        this.data.set(response);
        this.dataSource = new MatTableDataSource<Product>(this.data().products);
      }
    })
  }

  public formatter(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

}
