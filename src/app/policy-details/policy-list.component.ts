import { HttpHeaders } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import {MatTableDataSource} from '@angular/material/table';
import { Subscription } from "rxjs";
import { Element } from "./policy";
import { PolicyService } from "./policy.service";


@Component({
    selector: 'app-policy-list',
    templateUrl: './policy-list.component.html',
    styleUrls: ['./policy-list.component.css']

})
export class PolicyListComponent implements OnInit {
    constructor(private productService: PolicyService){}

    errorMessage = '';
    sub!: Subscription;
    displayedColumns = ['policyID','policyName','userName','country','policyCoverage','policyPremium','paymentStatus'];
    dataSource = new MatTableDataSource();
    
    private _listFilter: string = '';

    get listFilter(): string{
      return this._listFilter;
     }

    filteredPolicy: Element[] = [];

    policy: Element[] = [];

     ngOnInit() {
        let headers = new HttpHeaders();
        let usertoken = localStorage.getItem("userToken");
        if(usertoken!==null){
        headers = headers.set('token', usertoken );
        this.sub = this.productService.getPolicy(headers).subscribe((dataResponse) => {
          this.dataSource = dataResponse.policyData;
          });
      }
        }
}

