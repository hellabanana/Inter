import { Component } from '@angular/core';
import { Product } from '../models/mainproducts';
import { DataService } from '../data.service';
import { PlatformLocation } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cipher } from 'crypto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
 styleUrls:['./core-style.css','./bootstrap.css'],
  

})
export class HomeComponent {
  private name: string;
  products: Product[] = [];
  sec: Product[] = [];
  current: Product;
  bets=null;
  private url = "api/Lots";
  isItems: boolean;
  loaded: boolean;
  cat: string;

  constructor(private dataService: DataService, location: PlatformLocation, private activateRoute: ActivatedRoute) {
    this.isItems = this.dataService.isViewed;
    this.getall();
  
    console.log(this.dataService.isViewed);
    if (activateRoute.snapshot.params['cat'] != null) {
      this.products=  this.products.filter(x => x.lotCategory == activateRoute.snapshot.params['cat']);
    }
    
    location.onPopState(() => {

      this.change();

    });
    this.sec = this.products.slice();


  }

  ngOnInit() {
    this.getall();
    this.dataService.langUpdated.subscribe((x) => { this.sr(x); });
    this.sec = this.products.slice();
    
  }

  change() {
    this.dataService.isViewed = !this.dataService.isViewed;
    this.isItems = !this.isItems;
    
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
       (data: Product[]) => { this.products = data; this.sec = data;  },
        err => console.log(err)
    );
   


  }

  sr(str: object) {
    if (str.target.value == "") {
      this.products = this.sec;
    } else {
      this.products = this.products.filter(x => x.name.includes(str.target.value));
     
    }
  }
}
