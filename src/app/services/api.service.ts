import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
@Injectable()

export class ApiServices{
    baseUrl = "https://10.101.23.158:5002/api/insurance"
    constructor(private _http:HttpClient){

    }
     userLogin(){
      return  this._http.get(`${this.baseUrl}/getuser`)
     }
    
     fetchGender(){
        return  this._http.get(`${this.baseUrl}/getgender`)
     }
     fetchState(){
        return  this._http.get(`${this.baseUrl}/getstate`)
     }

     fetchPaymentMode(){
        return  this._http.get(`${this.baseUrl}/getpaymentmode`)
     }

     fetchSortType(){
        return  this._http.get(`${this.baseUrl}/getsorttype`)
     }
     fetchSolveFor(){
        return  this._http.get(`${this.baseUrl}/getsolveFor`)
     }
     
     fetchRider(){
        return  this._http.get(`${this.baseUrl}/getrider`)
     }
    
     fetchProductList(){
        return  this._http.get(`${this.baseUrl}/getproduct`)
     }
       
     fetchProductYear(){
        return  this._http.get(`${this.baseUrl}/getproductyear`)
     }

     fetchFaceAmount(){
      return  this._http.get(`${this.baseUrl}/getfaceamount`)
   }

   
}