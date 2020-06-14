import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './models/product';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {

  //private url = "/api/categories";

  public isViewed: boolean;
  public search: string;


  @Output() langUpdated= new EventEmitter ();

  setLang(sr) {
    this.search = sr;
    this.langUpdated.emit(this.search);
  }

  getLang() {
    return this.search;
  }

  constructor(private http: HttpClient) {
    this.isViewed = true;
  }
  getLogin() {
    return this.http.get("/api/account/login");
  }

  getProducts(url: string) {

    return this.http.get(url);
  }
  getAdmin() {
    return this.http.get("api/Admin");
  }

  getProduct(id: number, url: string) {
    return this.http.get(url + '/' + id);
  }

  createProduct(product: Product, url: string) {
    return this.http.post(url, product);
  }
  updateProduct(product: any, url: string) {

    return this.http.put(url, product);
  }
  deleteProduct(id: number, url: string) {
    return this.http.delete(url + '/' + id);
  }
}
