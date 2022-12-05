import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class BackendApiService {

  constructor(private http: HttpClient) { }
 

  checkAccess(data:any){
    // return this.http.post("https://upskillingapi.herokuapp.com/checkAccess",data);
    return this.http.post("http://localhost:4020/validateUser",data);
  }
  
}
