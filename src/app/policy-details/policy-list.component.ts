import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IPolicy } from "./policy";
import { PolicyService } from "./policy.service";

@Component({
    //selector: 'pm-policy',
    templateUrl: './policy-list.component.html',

})
export class PolicyListComponent implements OnInit, OnDestroy{
    pageTitle:string = "Policy List";
    imageWidth: number = 100;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage = '';
    sub!: Subscription;
    
    private _listFilter: string = '';

    get listFilter(): string{
      return this._listFilter;
     }


    filteredPolicy: IPolicy[] = [];

    policy: IPolicy[] = [];

     constructor(private productService: PolicyService){}
     toggleImage(): void{
          this.showImage = !this.showImage
     };
 
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

     onRatingClicked(message: string):void{
      this.pageTitle= 'Policy List: ' + message;
     }

}