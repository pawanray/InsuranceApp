import {Component} from '@angular/core'
import { DataShareService } from '../services/data.share';

@Component({
    selector:'app-leftbar',
    templateUrl:'app.leftbar.html',
    styleUrls:['app.leftbar.css']
})

export class AppleftBarComponent{
  constructor(private _dataShareService:DataShareService){
    
  }

}