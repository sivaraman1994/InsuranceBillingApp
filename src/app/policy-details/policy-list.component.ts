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
    displayedColumns = ['position', 'username', 'policyID', 'coverage','premium','paymentStatus'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    
    private _listFilter: string = '';

    get listFilter(): string{
      return this._listFilter;
     }

    filteredPolicy: Element[] = [];

    policy: Element[] = [];

     ngOnInit() {
        let header = new HttpHeaders();
        let usertoken = localStorage.getItem("userToken");
        if(usertoken!==null){
        header = header.set("token", usertoken );
        this.sub = this.productService.getPolicy(header).subscribe((data) => {
            this.dataSource;
          });
      }
        }
}

  const ELEMENT_DATA: Element[] = [
    {position: 1, username: 'John Doe', policyID: '12345D12', coverage:'Travel', premium: 2000, paymentStatus: 'COMPLETED'},
    {position: 2, username: 'Mike Hussey', policyID: '4564E45', coverage:'Travel', premium: 2000, paymentStatus: 'COMPLETED'},
    {position: 3, username: 'Ricky Hans', policyID: '4564F458', coverage:'Travel', premium: 2000, paymentStatus: 'In-Progress'},
    {position: 4, username: 'Martin Kos', policyID: '4564G458', coverage:'Travel', premium: 2000, paymentStatus: 'COMPLETED'},
    {position: 5, username: 'Tom Paisa', policyID: '4564H458', coverage:'Travel', premium: 2000, paymentStatus: 'In-Progress'},
    {position: 6, username: 'George Donald', policyID: '4564H458', coverage:'Travel', premium: 2000, paymentStatus: 'COMPLETED'},
    {position: 7, username: 'Chaitali Mane', policyID: '4564H458', coverage:'Travel', premium: 2000, paymentStatus: 'In-Progress'}
  ];