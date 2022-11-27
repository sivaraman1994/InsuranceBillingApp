import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  headers = new HttpHeaders().set('Content-Type','application/json')
  baseUrl:String = 'http://localhost:3000/register-api' 

  constructor(private _http:HttpClient) { }

  errmanage(err:HttpErrorResponse){
    let errmessage = ''
    if(err.error instanceof ErrorEvent)
      errmessage = err.error.message
    else
      errmessage = 'Error Code: '+err.status+' \n Message: '+err.message
    return throwError(errmessage)
     }
    
    addUser(data:any): Observable<any>{
       return this._http.post(this.baseUrl+'/add-user', data).pipe(catchError(this.errmanage))
    }
    
    getUser(data:any): Observable<any>{
      return this._http.get(this.baseUrl+'/get-user', data).pipe(catchError(this.errmanage))
   }
    
}
