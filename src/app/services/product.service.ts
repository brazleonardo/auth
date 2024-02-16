import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { DataProducts } from '@@interfaces/product'

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient)

  products(limit: number = 15, skip: number = 0) {
    return this.http.get<DataProducts>(`products?limit=${limit}&skip=${skip}`)
  }
}
