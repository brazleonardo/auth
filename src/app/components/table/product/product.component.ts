import { Component, Input, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { Product } from '@@interfaces/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit  {
  @Input() data!: Product[];
  displayedColumns: string[] = ['id', 'thumbnail', 'title', 'brand', 'category', 'price'];
  dataSource = new MatTableDataSource<Product>([]);

  ngOnInit(): void {
    console.log("data", this.data);
    this.dataSource = new MatTableDataSource<Product>(this.data);
  }
}
