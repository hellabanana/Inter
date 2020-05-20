import { Component } from '@angular/core';
import { Product } from '../models/mainproducts';
import { DataService } from '../data.service';
import { PlatformLocation } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
 styleUrls:['./core-style.css','./bootstrap.css'],
  

})
export class HomeComponent {
  private name: string;
  products: Product[] = [];
  current: Product;
  bets=null;
  private url = "api/Lots";
  isItems: boolean;
  loaded: boolean;
  cat: string;
  private subscription: Subscription;
  constructor(private dataService: DataService, location: PlatformLocation, private activateRoute: ActivatedRoute) {
    this.isItems = this.dataService.isViewed;
    this.getall();
    console.log(this.dataService.isViewed);
    this.subscription = activateRoute.params.subscribe(params => this.cat = params['cat']);
    if (activateRoute.snapshot.params['cat'] != null) {
      this.products=  this.products.filter(x => x.lotCategory == activateRoute.snapshot.params['cat']);
    }
    
    location.onPopState(() => {

      this.change();

    });


  }

  ngoninit() { this.getall(); }

  change() {
    this.dataService.isViewed = !this.dataService.isViewed;
    this.isItems = !this.isItems;
    console.log(this.dataService.isViewed);
  }

  getbets(id: number) {
    this.dataService.getProducts('api/Bets/'+id)
      .subscribe(
        data => { this.bets = data; this.change(); },
        err => { console.log(err);this.change(); }
      );
  }
  

  itemopen(id: number) {
    this.bets = null;
    this.current = this.products.find(x => x.lotId === id);
    console.log(this.current);
    this.getbets(id);
   
  }

  getall() {
   this.dataService.getProducts(this.url)
     .subscribe(
       (data: Product[]) => { this.products = data; console.log(this.products); },
        err => console.log(err)
      );


  }
}
