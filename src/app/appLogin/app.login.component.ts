import {Component, OnInit} from '@angular/core'
import { ApiServices } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
    selector:'app-header',
    templateUrl:'app.login.html',
    styleUrls:['app.login.css']
})

export class AppLoginComponent implements OnInit {
    userList;
    constructor(private _apiSerives: ApiServices, private _router:Router){

    }
   ngOnInit(){
      this._apiSerives.userLogin().subscribe(res=>{
        this.userList = res;
          console.log(res)
      })
   }
   login(data){
    let getUser = this.userList.find(userdata=>{
        return data.value.username === userdata.loginId && userdata.password === data.value.password
    })
 
    if(getUser !== undefined){
        debugger
        this._router.navigate(['quoting'])
        localStorage.setItem("userInfo",JSON.stringify(getUser))
        console.log(getUser)
    }
    else{
        alert("user not valid")
    }
   }
}