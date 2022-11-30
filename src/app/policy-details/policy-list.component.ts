import { Component, OnDestroy, OnInit } from "@angular/core";
import {MatTableDataSource} from '@angular/material/table';
import { Subscription } from "rxjs";
import { IPolicy } from "./policy";
import { PolicyService } from "./policy.service";

@Component({
    selector: 'app-policy-list',
    templateUrl: './policy-list.component.html',
    styleUrls: ['./policy-list.component.css']

})
export class PolicyListComponent implements OnInit, OnDestroy{
    constructor(private productService: PolicyService){}

    errorMessage = '';
    sub!: Subscription;

    displayedColumns: any[] = ['position', 'userName', 'policyID', 'coverage','premium','paymentStatus'];
    
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    
    private _listFilter: string = '';

    get listFilter(): string{
      return this._listFilter;
     }

    filteredPolicy: IPolicy[] = [];

    policy: IPolicy[] = [];
     ngOnInit(): void {
      this.sub = this.productService.getPolicy().subscribe({
        next: policy => {
            this.policy = policy;
            this.filteredPolicy = this.policy;
        },
        error: err=> this.errorMessage = err
      });
      
     }

     ngOnDestroy(): void {
         this.sub.unsubscribe();
     }
}
 export interface Element {
    position: number;
    userName: string;
    policyID: string;
    coverage: string;
    premium: number;
    paymentStatus: string;

  }
  
  const ELEMENT_DATA: Element[] = [
    {position: 1, userName: 'John Doe', policyID: '12345D12', coverage:'Travel', premium: 2000, paymentStatus: 'COMPLETED'},
    {position: 2, userName: 'Mike Hussey', policyID: '4564E45', coverage:'Travel', premium: 2000, paymentStatus: 'COMPLETED'},
    {position: 3, userName: 'Ricky Hans', policyID: '4564F458', coverage:'Travel', premium: 2000, paymentStatus: 'COMPLETED'},
    {position: 4, userName: 'Martin Kos', policyID: '4564G458', coverage:'Travel', premium: 2000, paymentStatus: 'COMPLETED'},
    {position: 5, userName: 'Tom Paisa', policyID: '4564H458', coverage:'Travel', premium: 2000, paymentStatus: 'COMPLETED'}
  ];