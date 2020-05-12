import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './models/product';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {

  //private url = "/api/categories";

  constructor(private http: HttpClient) {
  }
  getLogin() {
    return this.http.get("/api/account/login");
  }

  getProducts(url: string) {

    return this.http.get(url);
  }

  getProduct(id: number, url: string) {
    return this.http.get(url + '/' + id);
  }

  createProduct(product: Product, url: string) {
    return this.http.post(url, product);
  }
  updateProduct(product: Product, url: string) {

    return this.http.put(url, product);
  }
  deleteProduct(id: number, url: string) {
    return this.http.delete(url + '/' + id);
  }
}
