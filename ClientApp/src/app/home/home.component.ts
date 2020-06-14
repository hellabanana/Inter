import { Component } from '@angular/core';
import { Product } from '../models/mainproducts';
import { DataService } from '../data.service';
import { PlatformLocation } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


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
  info: string;

  constructor(private dataService: DataService, location: PlatformLocation, activateRoute: ActivatedRoute, private http: HttpClient) {
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
    this.info = this.current.info;
    this.getbets(id);
   
  }

  getall() {
   this.dataService.getProducts(this.url)
     .subscribe(
       (data: Product[]) => { this.products = data.filter(x => x.state == "Активен"); this.sec = data.filter(x => x.state == "Активен"); },
        err => console.log(err)
    );
  }

  sr(str: any) {
    if (str.target.value == "") {
      this.products = this.sec;
    } else {
      this.products = this.products.filter((x:any) => x.name.includes(str.target.value));
     
    }
  }

  buy(id: Product) {
    var price = $("#myInput").val();
    var bets = id.lotId;
    this.http.post("api/Bets", { bets, price }).subscribe(data => console.log("isok?" + data), err => console.log("er"+err));
  }
}
