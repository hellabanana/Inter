import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { JwtModule } from "@auth0/angular-jwt";
import { NgxSummernoteDirective } from "ngx-summernote"
import { NgxSummernoteModule } from "ngx-summernote"
import * as $ from 'jquery';


import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './Categories/categories.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth-guard.service';
import { newlotComponent } from './newlot/newlot.component';
import { DataService } from './data.service';
import { AdminComponent } from './admin/admin.component';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CategoriesComponent,
    LoginComponent,
    newlotComponent,
    AdminComponent
 
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,

    FormsModule,
    
    RouterModule.forRoot([
      {
        path: '', component: HomeComponent, pathMatch: 'full'
      },{
        path: 'category', component: CategoriesComponent, pathMatch: 'full'
      }
      , {
        path: 'login', component: LoginComponent, pathMatch: 'full'
      }
      , {
        path: 'newlot', component: newlotComponent, pathMatch: 'full'
      },
      {
        path: 'admin', component: AdminComponent, pathMatch: 'full'
      },
   
    ]), JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:44328", "localhost:17784", "localhost:5000", "localhost:5001"],
        blacklistedRoutes: []
      }
    })
  ],
  providers: [AuthGuard, DataService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
