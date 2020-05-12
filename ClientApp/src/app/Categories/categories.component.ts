import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Product } from '../models/product';


@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  providers: [DataService]
})
export class CategoriesComponent implements OnInit {

  product: Product = new Product();   
  products: Product[] = [];
  tableMode: boolean = true;
  private url = "/api/categories";

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadProducts();    
  }
  
  loadProducts() {

    this.dataService.getProducts(this.url)
      .subscribe((data: Product[]) => { this.products = data; console.log(data); });
    
  }
       
      
  save() {
    if (this.product.categoryId == null) {
      this.dataService.createProduct(this.product, this.url)
        .subscribe((data: Product) => this.products.push(data));
    } else {
      this.dataService.updateProduct(this.product, this.url)
        .subscribe(data => this.loadProducts());
    }
    this.cancel();
  }
  editProduct(p: Product) {
    this.product = p;
  }
  cancel() {
    this.product = new Product();
    this.tableMode = true;
  }
  delete(p: Product) {
    this.dataService.deleteProduct(p.categoryId, this.url)
      .subscribe(data => this.loadProducts());
  }
  add() {
    this.cancel();
    this.tableMode = false;
  }
}
