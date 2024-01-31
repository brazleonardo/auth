import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductComponent } from '@@components/table/product/product.component';

import { AuthService } from '@@services/auth.service';
import { ProductService } from '@@services/product.service';
import { DataProducts } from '@@interfaces/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, ProductComponent],
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

  ngOnInit() {
    this.getUser();
    this.getProducts();
  }

  getUser(){
    this.authService.me().subscribe();
  }

  getProducts() {
    this.productService.products(this.data().limit, this.data().skip).subscribe({
      next: (response) => {
        this.data.set(response);
      }
    })
  }

}
