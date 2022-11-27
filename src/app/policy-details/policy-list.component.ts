import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IPolicy } from "./policy";
import { PolicyService } from "./policy.service";

@Component({
    selector: 'app-policy-list',
    templateUrl: './policy-list.component.html',
    styleUrls: ['./policy-list.component.css']

})
export class PolicyListComponent implements OnInit, OnDestroy{
    errorMessage = '';
    sub!: Subscription;
    
    private _listFilter: string = '';

    get listFilter(): string{
      return this._listFilter;
     }


    filteredPolicy: IPolicy[] = [];

    policy: IPolicy[] = [];

     constructor(private productService: PolicyService){}
 
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