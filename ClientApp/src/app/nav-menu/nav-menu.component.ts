import { Component, Input } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { DataService } from '../data.service';
import { Product } from '../models/product';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  products: Product[] = [];
  
  isExpanded = false;
  constructor(private jwtHelper: JwtHelperService, private router: Router, private x: DataService) {
    this.loadProducts();
  }
  private url = "/api/categories";

  isUserAuthenticated() {
    let token: string = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  got() {
    this.x.isViewed = false;
    this.x.isViewed = true;
 
   
  }
  public logOut = () => {
    localStorage.removeItem("jwt");
  }

  collapse() {
    this.isExpanded = false;
  }


  search(s: any) {
    this.x.search = s;
    this.x.setLang(s);
   
  }
  goHome() {

    this.router.navigate(['/']);
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  loadProducts() {

    this.x.getProducts(this.url)
      .subscribe((data: Product[]) => { this.products = data; console.log(data); });

  }
}
