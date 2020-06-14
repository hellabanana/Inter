import { Component, Output, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Product } from '../models/product';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  

 
  product: Product = new Product();
  products: any[] = [];
  iscat: boolean = true;
  islot: boolean = false;
  isusr: boolean=false
  tableMode: boolean = true;
  private url = "/api/categories";

  constructor(private router: Router, private http: HttpClient, private dataService: DataService) { }

  cat() {
    this.iscat = true;
    this.islot = false;
    this.isusr = false;
    this.loadProducts();

  }
  lots() {
    this.islot = true;
    this.iscat = false;
    this.isusr = false;
    this.getall();
  }

  activn() {
    this.islot = true;
    this.iscat = false;
    this.isusr = false;
    this.dataService.getProducts("api/Lots")
      .subscribe(
        (data: any) => { this.products = data.filter(x => x.state == "Активен"); },
        err => console.log(err)
      );
  }
  zaversh() {
    this.islot = true;
    this.iscat = false;
    this.isusr = false;
    this.dataService.getProducts("api/Lots")
      .subscribe(
        (data: any) => { this.products = data.filter(x =>  x.state == "Завершен" || x.state=="Продан" ); },
        err => console.log(err)
      );

  }

  prodan() {
    this.islot = true;
    this.iscat = false;
    this.isusr = false;
    this.dataService.getProducts("api/Lots")
      .subscribe(
        (data: any) => { this.products = data.filter(x => x.state == "Продан"); },
        err => console.log(err)
      );
  }
  users() {
    this.islot = false;
    this.iscat = false;
    this.isusr = true;
    this.usr();
  }
  ngOnInit() {
    this.loadProducts();
  }
  loadProducts() {

    this.dataService.getProducts(this.url)
      .subscribe((data: Product[]) => { this.products = data; console.log(data); });

  }
  getall() {
    this.dataService.getProducts("api/Lots")
      .subscribe(
        (data: any) => { this.products = data; },
        err => console.log(err)
      );



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
  active(p: any) {
    this.http.put("api/Lots/" + p.lotId, p).subscribe(data => { this.getall() });
  
  }
  make(p: any) {
    this.http.put("api/Users/" + p.id, p).subscribe(data => { this.usr() });

  }
  del(p: any) {
    this.http.delete("api/Lots/" + p.lotId, p).subscribe(data => { this.getall() });
  }

  usr() {
    this.http.get("api/Users").subscribe(
      (data: any) => { this.products = data; console.log(data) },
      err => console.log(err)
    );
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
