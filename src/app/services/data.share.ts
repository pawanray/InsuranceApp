import {Injectable} from '@angular/core'
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class DataShareService{
    userStatus = new BehaviorSubject(false); 
    constructor(){
    }
   
   
} 