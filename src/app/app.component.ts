import { Component, OnInit } from '@angular/core';
import { DataShareService } from './services/data.share';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'policy-tool-app';
  isUser = localStorage.getItem("userInfo") ? true : false;
  userStatus:boolean;
  constructor(private _dataShareService: DataShareService, private _router:Router){
    this._dataShareService.userStatus.next(this.isUser)
    this._dataShareService.userStatus.subscribe(res=>{
      this.userStatus = res;
      if(this.userStatus){
      this._router.navigate(['quoting'])
      }
      console.log(res)
  })
  }
  ngOnInit(){
    
  
  }
}
