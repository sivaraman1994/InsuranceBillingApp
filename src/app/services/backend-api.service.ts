import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class BackendApiService {

  constructor(private http: HttpClient) { }
 

  checkAccess(data:any){
    // return this.http.post("https://upskillingapi.herokuapp.com/checkAccess",data);
    return this.http.post("http://localhost:3000/validateUser",data);
  }
  
}
