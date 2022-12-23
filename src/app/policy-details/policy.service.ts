import { HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PolicyService{
    private policyUrl = 'api/policy/policy.json';
    url: any;

    constructor(private http:HttpClient)
    {}

     httpOptions = {

        headers: new HttpHeaders({
   
         'Content-Type':  'application/json',
   
         'Authorization':  'token'
   
        })};

   getPolicy(headers: HttpHeaders): Observable<any> {

    const Url = `${'http://localhost:3000/fetchPolicyDetails'}`;
    return this.http.get<any>(Url, { headers: headers })

   }
   addPolicy(data:any, header: HttpHeaders): Observable<any>{
    //   console.log(header)
      let url = `${'http://localhost:3000/addPolicy'}`;
      console.log(data)
      return this.http.post(url, data, {headers:header})
 }
   
   updatePolicy({policyID, policyCoverage, policyPremium, paymentStatus}:any,headers: HttpHeaders,isActive: boolean){
     const url = `http://localhost:3000/updatePolicy`;
     let policyupdate = {
        policyData: {
            policyID,
            policyCoverage,
            policyPremium,
            paymentStatus,
            isActive: isActive
    }
}
     return this.http.post<any>(url,  policyupdate, { headers: headers })
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