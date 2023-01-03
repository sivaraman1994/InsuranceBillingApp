import { DataSource} from "@angular/cdk/collections";
import { HttpHeaders } from "@angular/common/http";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from '@angular/material/table';
import { TooltipTouchGestures } from "@angular/material/tooltip";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { NavBarComponent } from "../nav/navbar.component";
import { PolicyCreationComponent } from "../policy-creation/policy-creation.component";
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
  isAgent:Boolean = false;
  noDataFound:Boolean = false;
  editable: boolean = false;
  policyGroup!: FormGroup;
  dataArray:any[] = [];
  displayedColumnsForAgent:String[] = ['policyID', 'policyName', 'userName', 'country', 'policyCoverage', 'policyPremium', 'paymentStatus', 'actions'];
  displayedColumns:String[] = ['policyID', 'policyName', 'userName','country', 'policyCoverage', 'policyPremium', 'paymentStatus'];
  dataSource!: MatTableDataSource<Element>;
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  posts:any;

   constructor(private productService: PolicyService, public router: Router, public navCom: NavBarComponent, private _formBuilder: FormBuilder,
    public modalService: NgbModal) { }

 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    console.log("filtered value:"+this.dataSource.filter)
  }

  ngOnInit(): void {
    this.policyGroup = new FormGroup({
      policyPremium : new FormControl(''),
      paymentStatus : new FormControl('')
    });
    this.getPolicy();  
      
    }
    
    openPolicyCreationModal(){
      const modalRef = this.modalService.open(PolicyCreationComponent);
      modalRef.result.then((result) => {
      console.log(result);
     }).catch((error) => {
        console.log(error);
      });
    }

    updatePolicy(element:any){
    let headers = new HttpHeaders();
    console.log(this.policyGroup);
    this.dataArray = [];
    let usertoken = localStorage.getItem("userToken");
    if (usertoken !== null) {
      this.isLoggedIn = true;
      //this.isAgent = true;
      headers = headers.set('token', usertoken);
      this.productService.updatePolicy(element,headers,element.editable).subscribe( (res)=> {
        element.editable = false;
        this.getPolicy();
      
   });
  }
}

getPolicy(){
  let headers = new HttpHeaders();
  this.dataArray = [];
  let usertoken = localStorage.getItem("userToken");
  let userType = localStorage.getItem("userType");
  if (usertoken !== null) {
    this.isLoggedIn = true;
    this.isAgent = userType == "AGENT";
    headers = headers.set('token', usertoken);
    this.sub = this.productService.getPolicy(headers).subscribe((dataResponse) => {
      // alert(JSON.stringify(dataResponse));
      this.posts = dataResponse;
      for(const data in this.posts){
        this.dataArray.push({
          editable: false,
          ...this.posts[data]

        });
      }
      // alert((JSON.stringify(this.posts)))
      this.dataSource = new MatTableDataSource(this.dataArray);
      // this.dataSource
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if(dataResponse == null || (Array.isArray(dataResponse) && dataResponse.length == 0)){
        this.noDataFound = true;
      }
    });
  }
}
  edit(e: any) {
        e.editable = !e.editable;
  }
}
