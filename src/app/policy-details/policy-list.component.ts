import { DataSource} from "@angular/cdk/collections";
import { HttpHeaders } from "@angular/common/http";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from '@angular/material/table';
import { TooltipTouchGestures } from "@angular/material/tooltip";
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
  errorMessage = '';
  sub!: Subscription;
  isLoggedIn:Boolean = false;
  noDataFound:Boolean = false;
  displayedColumns:String[] = ['policyID', 'policyName', 'userName', 'country', 'policyCoverage', 'policyPremium', 'paymentStatus', 'actions'];
  dataSource!: MatTableDataSource<Element>;
  @ViewChild(MatPaginator) paginator!: MatPaginator
  posts:any;

   constructor(private productService: PolicyService, public router: Router, public navCom: NavBarComponent) { }

 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    console.log("filtered value:"+this.dataSource.filter)
  }

  ngOnInit() {
    let headers = new HttpHeaders();
    let usertoken = localStorage.getItem("userToken");
    if (usertoken !== null) {
      this.isLoggedIn = true;
      headers = headers.set('token', usertoken);
      this.sub = this.productService.getPolicy(headers).subscribe((dataResponse) => {
        console.log(JSON.stringify(dataResponse));
        this.posts = dataResponse;
        this.dataSource = new MatTableDataSource(this.posts);
        // this.dataSource = dataResponse;
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.filterPredicate = (data:posts, filter: string) => {
        //   return posts.userName == filter;
        //   console.log("filtered value2:"+data.userName)
        // };        
        if(dataResponse == null){
          this.noDataFound= true;
        }
      });
    }  
  }
}
