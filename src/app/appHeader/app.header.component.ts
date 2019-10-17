import {Component} from '@angular/core'
import { Router } from '@angular/router';
import { DataShareService } from '../services/data.share';

@Component({
    selector:'app-topbar',
    templateUrl:'app.header.html',
    styleUrls:['app.header.css']
})

export class AppHeaderComponent  {
    fetchUser:Object;
    constructor(private _router:Router, private _dataShareService:DataShareService){

    }
    ngOnInit(){
        this.fetchUser = JSON.parse(localStorage.getItem("userInfo")) ? JSON.parse(localStorage.getItem("userInfo")) : {}
    }
  
    logoutUser(){
        localStorage.removeItem("userInfo");
        this._dataShareService.userStatus.next(false)
        this._router.navigate([''])
    }
}

