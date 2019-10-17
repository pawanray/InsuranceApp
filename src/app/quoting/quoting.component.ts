import {Component, OnInit, TemplateRef} from '@angular/core'
import { ApiServices } from '../services/api.service';
import { DataShareService } from '../services/data.share';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    templateUrl:'quoting.component.html',
    styleUrls:['quoting.component.css']
})

export class QuotingComponent implements OnInit{
    agentName:string;
    genderArry:any;
    stateArry:any;
    paymentModeArry:any;
    sortTypeArry:any;
    solveForArry:any;
    riderArry:any;
    productArry:any;
    productYearArry:any;
    faceAmountArry:any;
    selectedProductsArry:any = []
    premiumAmountArry = [];
    premiumTotalAmount:string = "";
   clientData =  {
            basicDetail:{
                name:null,
                age:null,
                gender:null,
                state:null,
                amount:null,
                riders:[]
            },
            otherDetails:{
                solveFor:'Premium',
                paymentMode:null,
                sortType:null,
                underwritingClass:[{id:null,name:null}],
                tableRating:null,
                productName:null,
                productTypeYear:[],
                selectedProduct:[]
            }
        }

        modalRef: BsModalRef;

  constructor(private _apiSerives: ApiServices, private _dataSharedService: DataShareService, private modalService: BsModalService){
    this._dataSharedService.userStatus.next(true)
  }

 ngOnInit(){
    this._apiSerives.userLogin().subscribe(res=>{
        console.log(res);
    })
    let fetchAgentName = JSON.parse(localStorage.getItem("userInfo")) ? JSON.parse(localStorage.getItem("userInfo")) : "";
    this.agentName = fetchAgentName.name;

     this._apiSerives.fetchGender().subscribe(res=>{
        this.genderArry = res
        this.clientData.basicDetail.gender = this.genderArry[0].name;
     })
  
     this._apiSerives.fetchState().subscribe(res=>{
        this.stateArry = res
        this.clientData.basicDetail.state = this.stateArry[0].name;
     })

     
     this._apiSerives.fetchPaymentMode().subscribe(res=>{
        this.paymentModeArry = res;
        this.clientData.otherDetails.paymentMode = this.paymentModeArry[0].name;
     })

     this._apiSerives.fetchSortType().subscribe(res=>{
        this.sortTypeArry = res;
        this.clientData.otherDetails.sortType = this.sortTypeArry[0].name;
     })

     this._apiSerives.fetchSolveFor().subscribe(res=>{
        this.solveForArry = res;
        this.clientData.otherDetails.solveFor = this.solveForArry[0].name;
     })
     
     this._apiSerives.fetchRider().subscribe(res=>{
         console.log(res)
        this.riderArry = res;
        this.clientData.basicDetail.riders = this.riderArry;
     })

     this._apiSerives.fetchProductList().subscribe(res=>{
        this.productArry = res
     })

     this._apiSerives.fetchProductYear().subscribe(res=>{
        this.productYearArry = res
        this.clientData.otherDetails.productTypeYear = this.productYearArry;
     })
     
     this._apiSerives.fetchFaceAmount().subscribe(res=>{
         this.faceAmountArry = res;
     })
}

clientFormHandler(data){
    debugger;
    localStorage.setItem("clientData",JSON.stringify(data))
  console.log(data)
}

riderOptionsHandler(rider,e){
    if(e.currentTarget.checked){
        this.clientData.basicDetail.riders.push(rider)
        this.clientData.basicDetail.riders = Array.from(new Set(this.clientData.basicDetail.riders))
    }
    else{
        const checkedRiders = this.clientData.basicDetail.riders.filter(x=>x.name !== rider.name)
        this.clientData.basicDetail.riders = checkedRiders;
    }
}

moveLeftHandler(data){
    console.log(data)
    debugger;
    this.selectedProductsArry.push(data)
    this.selectedProductsArry =  this.selectedProductsArry.flat(1);
    this.selectedProductsArry.forEach(data=>{
    this.productArry =  this.productArry.filter(productFilter=>{
            return productFilter.id != data.id
        })
      })
     
      this.productArry =  this.productArry.flat(1);
      console.log(this.productArry)
      this.clientData.otherDetails.selectedProduct= [...this.selectedProductsArry]
    }

    moveRightHandler(proData){
        debugger;
        this.productArry.push(proData)
        this.productArry =  this.productArry.flat(1);
        proData.forEach(data=>{
        this.selectedProductsArry =  this.selectedProductsArry.filter(productFilter=>{
                return productFilter.id != data.id
            })
          })
          console.log(this.productArry, this.selectedProductsArry);
    }

    moveAllProductHandler(type){
        debugger;
        if(type=="leftAll"){
             this.selectedProductsArry = this.productArry;
             this.clientData.otherDetails.selectedProduct = this.productArry;
        }
        else if(type=="rightAll"){
             this.selectedProductsArry =[];
       }
    }

  
    productYearTypeHandler(data,e){
        if(e.currentTarget.checked){
            this.clientData.otherDetails.productTypeYear.push(data);
            this.clientData.otherDetails.productTypeYear = Array.from(new Set(this.clientData.otherDetails.productTypeYear));
        }
        else{
            debugger;
            const checkedProductTypeYear = this.clientData.otherDetails.productTypeYear.filter(x=>x.name !== data.name);
            this.clientData.otherDetails.productTypeYear = checkedProductTypeYear;
        }
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
      }

      premiumAmountHandler(e){
        if(e.currentTarget.checked){
            this.premiumTotalAmount = ""
            this.premiumAmountArry.push(e.currentTarget.value);
            this.premiumAmountArry.forEach(premiumAmount=>{
                this.premiumTotalAmount +=  premiumAmount + "," ;
                let splitPremiumAmount = this.premiumTotalAmount.split(',');
                console.log(splitPremiumAmount);
                this.premiumAmountArry = Array.from(new Set(splitPremiumAmount))
                this.premiumTotalAmount = this.premiumAmountArry.join(",");
            })
            
            let findRemoveComma = this.premiumTotalAmount.lastIndexOf(",");
            this.premiumTotalAmount = this.premiumTotalAmount.substring(0,findRemoveComma)
        }
        else{
            let splitAry = this.premiumTotalAmount.split(",");
            let filterArry = splitAry.filter(res=>{
                return e.currentTarget.value !== res
            })
            this.premiumAmountArry = filterArry;
            this.premiumTotalAmount = filterArry.join(",")

        }
      }

      premiumAmountValueHadndler(val){
        let faceFilterArr = this.faceAmountArry.find(data=>{
            return data.name === val
        })

        if( faceFilterArr.isStatus !== undefined){
            faceFilterArr.isStatus = true 
        }
        // if(faceFilterArr){
        //     faceFilterArr.isStatus = true
        // }
       
        this.faceAmountArry.push(faceFilterArr);
        this.faceAmountArry = Array.from(new Set(this.faceAmountArry))
        console.log(faceFilterArr)
      }
}