import { Component } from '@angular/core';
import { Product } from '../models/mainproducts';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
 // styleUrls:['./core-style.css'],
  providers: [DataService]

})
export class HomeComponent {
  private name: string;

  products: Product[] ;
  private url = "/api/Lots";
  isItems: boolean;

 constructor(private dataService: DataService) { }

  ngoninit() {
    if (this.products.length == 0) { this.isItems = false; }
    console.log(this.products);
  this.getall();

  }

  itemopen(id: number) {
   this.dataService.getProduct(id, this.url);
  }

  getall() {
   this.dataService.getProducts(this.url)
      .subscribe(
        (data: Product[]) => this.products = data,
        err => console.log(err)
      );


  }
}
