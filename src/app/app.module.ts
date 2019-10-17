import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule}  from '@angular/forms'
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './appHeader/app.header.component';
import { AppleftBarComponent } from './appLeftbar/app.leftbar.component';
import { AppLoginComponent } from './appLogin/app.login.component';
import {RouterModule, Routes} from '@angular/router'
import { QuotingComponent } from './quoting/quoting.component';
import { ApiServices } from './services/api.service';
import { DataShareService } from './services/data.share';
import { ModalModule } from 'ngx-bootstrap';
var appRoute:Routes = [
  {
    path:'',
    component:AppLoginComponent
},
{
  path:'quoting',
  component:QuotingComponent
}
]
@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppleftBarComponent,
    AppLoginComponent,
    QuotingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoute),
    ModalModule.forRoot()
  ],
  providers: [ApiServices,DataShareService],
  bootstrap: [AppComponent]
})
export class AppModule { }
