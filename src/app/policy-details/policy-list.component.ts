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

  // const dataSource: Element[] = [
  //   {position: 1, username: 'John Doe', policyID: '12345D12', policyCoverage:250000, policyPremium: 2000, paymentStatus: 'Completed'},
  //   {position: 2, username: 'Mike Hussey', policyID: '4564E45', policyCoverage:125000, policyPremium: 450, paymentStatus: 'Declined'},
  //   {position: 3, username: 'Ricky Hans', policyID: '4564F458', policyCoverage:300000, policyPremium: 1000, paymentStatus: 'Completed'},
  //   {position: 4, username: 'Martin Kos', policyID: '4564G458', policyCoverage:4500000, policyPremium: 670, paymentStatus: 'In-Progress'},
  //   {position: 5, username: 'Tom Paisa', policyID: '4564H458', policyCoverage:1200000, policyPremium: 430, paymentStatus: 'Completed'},
  //   {position: 6, username: 'George Donald', policyID: '4564H458', policyCoverage:2300000, policyPremium: 1500, paymentStatus: 'Completed'},
  //   {position: 7, username: 'Chaitali Mane', policyID: '4564H458', policyCoverage:200000, policyPremium: 2000, paymentStatus: 'In-Progress'}
  // ];