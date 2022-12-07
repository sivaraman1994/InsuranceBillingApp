import { HttpHeaders } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatTableDataSource } from '@angular/material/table';
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { NavBarComponent } from "../nav/navbar.component";
import { Element } from "./policy";
import { PolicyService } from "./policy.service";


@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.css']

})
export class PolicyListComponent implements OnInit {
  constructor(private productService: PolicyService, public router: Router, public navCom: NavBarComponent) { }

  errorMessage = '';
  sub!: Subscription;
  isLoggedIn:Boolean = false;
  noDataFound:Boolean = false;
  
  displayedColumns:String[] = ['policyID', 'policyName', 'userName', 'country', 'policyCoverage', 'policyPremium', 'paymentStatus', 'actions'];
  dataSource = new MatTableDataSource();

  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
   //this.filteredPolicy = this.performFilter(value);
  }

  ngOnInit() {
    // alert(localStorage.getItem('userName') + " policy list")
    //this.navCom.ngOnInit();
    let headers = new HttpHeaders();
    let usertoken = localStorage.getItem("userToken");
    if (usertoken !== null) {
      this.isLoggedIn = true;
      headers = headers.set('token', usertoken);
      this.sub = this.productService.getPolicy(headers).subscribe((dataResponse) => {
        console.log(JSON.stringify(dataResponse));
        this.dataSource = dataResponse;
        if(dataResponse == null){
          this.noDataFound= true;
        }
      });
     // window.location.reload();
    }  
  }
}

