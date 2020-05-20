import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { JwtModule } from "@auth0/angular-jwt";


import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './Categories/categories.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth-guard.service';
import { newlotComponent } from './newlot/newlot.component';
import { DataService } from './data.service';

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
    newlotComponent
 
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
      { path: ':cat', component: HomeComponent },
   
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
