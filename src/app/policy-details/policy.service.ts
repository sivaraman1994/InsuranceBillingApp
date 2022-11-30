import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { Element } from "./policy";

@Injectable({
    providedIn: 'root'
})
export class PolicyService{
    private policyUrl = 'api/policy/policy.json';

    constructor(private http:HttpClient)
    {}

   getPolicy(): Observable<Element[]>{
    return this.http.get<Element[]>(this.policyUrl).pipe(
        tap(data => console.log('All', JSON.stringify(data))),
         catchError(this.handleError)
    );
   }

   private handleError(err: HttpErrorResponse){
    //in a real world we may send the server to some remote logging infrastructure
    //instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent){
        //A client-side or network error occured. Handle it properly
        errorMessage = `An error occurred: ${err.error.message}`;
    }else {
        //the backend returned an unsuccessful response code.
        //the response body may contain clues as to what went wrong
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(()=>errorMessage);
   }
}