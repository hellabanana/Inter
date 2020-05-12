import { Component, Input } from '@angular/core';
import { CategoriesComponent } from '../Categories/categories.component';
import { Product } from '../models/product';
import { NgForm } from '@angular/forms';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DataService } from '../data.service';

@Component({
  selector: 'newlot',
  templateUrl: './newlot.component.html',
  providers: [DataService]
})
export class newlotComponent {

  cat: CategoriesComponent;
  categories: Product[] = [];
  public Filename: string;
  private url = "/api/Lots";
  constructor(private router: Router, private http: HttpClient, private dataService: DataService) {}

  ngOnInit() {
    this.loadProducts();
    
  }

  loadProducts() {

    this.dataService.getProducts('/api/categories')
      .subscribe((data: Product[]) => { this.categories = data }, err => console.log(err));
    
  }



  public send = (form: NgForm) => {
    setTimeout(() => {
      console.log("OnSend:" + this.Filename);
      let Filename = this.Filename;
      let Name = form.value.Name;
      let Info = form.value.Info;
      let StartPrice = form.value.StartPrice;
      let LotCategory = form.value.LotCategory;
      let BuyOutPrice = form.value.BuyOutPrice;
      let DateStart = form.value.DateStart;
      let DateEnd = form.value.DateEnd;

      this.http.post(this.url, { Name, Info, StartPrice, LotCategory, BuyOutPrice, DateStart, DateEnd, Filename })
        .subscribe(
          ok => { console.log("response:" + ok); this.router.navigate([""]); },
          err => console.log("err"+err))
    }, 2000);

  }


  upload(files) {
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);

    const uploadReq = new HttpRequest('POST', `api/Lots/upload`, formData, {
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(r => { this.Filename = (<any>r).body; console.log(this.Filename) });
  }
}
