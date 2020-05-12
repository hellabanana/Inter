import { Component } from '@angular/core';
import { Product } from '../models/mainproducts';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
 styleUrls:['./core-style.css'],
  providers: [DataService]

})
export class HomeComponent {
  private name: string;


  products: Product[] = [];
  current: Product;
  private url = "api/Lots";
  isItems = true;

  constructor(private dataService: DataService) {
   
    this.getall();
    console.log("Now:" + this.products.length);
  }

  ngoninit() {
    this.getall();
    console.log("Now:" + this.products.length);
  }
  change() {
    this.isItems = !this.isItems;
  }
  

  itemopen(id: number) {
    this.current = this.products.find(x => x.lotId === id);
    this.change();
  }

  getall() {
   this.dataService.getProducts(this.url)
     .subscribe(
       (data: Product[]) => { this.products=data;  },
        err => console.log(err)
      );


  }
}
