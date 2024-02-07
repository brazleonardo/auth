import { Component, OnInit, inject, } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { AuthService } from '@@services/auth.service';
import { CategoryService } from '@@services/category.service';

@Component({
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export default class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ['pos', 'name'];
  dataSource = new MatTableDataSource<string>([]);
  protected authService = inject(AuthService);
  protected categoryService = inject(CategoryService);


  ngOnInit(): void {
    this.getUser();
    this.getCategories();
  }

  getUser(){
    this.authService.me().subscribe();
  }

  getCategories(){
    this.categoryService.categories().subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource<string>(response);
      }
    });
  }

}
