import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { PolicyService } from '../policy-details/policy.service';
import { BackendApiService } from '../services/backend-api.service';
@Component({
  selector: 'app-policy-creation',
  templateUrl: './policy-creation.component.html',
  styleUrls: ['./policy-creation.component.scss'],
  
})

export class PolicyCreationComponent implements OnInit {
    isPolicySucess!: Boolean;
    UserNotExists!: Boolean;
    isActive!: Boolean;
    policyID!: String;
    policyName!: String;
    userEmail!: String;
    policyCoverage!: Number;
    policyPremium!: Number;
    paymentStatus!: String;
    travelStartDate!: Date;
    travelEndDate!: Date;
    dueDate!: Date;
    country!: String;
    createpolicyForm! : FormGroup;

    constructor(private apiService:BackendApiService,
        private policyService:PolicyService,
        private router:Router,public formBuilder: FormBuilder,public modalService: NgbModal) { }

        ngOnInit() {

            this.createpolicyForm = this.formBuilder.group({
                policyID: ['', Validators.required],
                policyName: ['', [Validators.required, Validators.minLength(6)]],
                country: ['', [Validators.required, Validators.minLength(3)]],
                userEmail: ['', [Validators.required, Validators.email]],
                policyCoverage: ['', [Validators.required, Validators.min(5)]],
                policyPremium: ['', [Validators.required, Validators.min(3)]],
                paymentStatus: ['', [Validators.required, Validators.minLength(6)]],
                travelStartDate: ['', [Validators.required, Validators.maxLength(10)]],
                travelEndDate: ['', [Validators.required, Validators.maxLength(10)]],
                dueDate: ['', [Validators.required, Validators.maxLength(10)]]
            });
        }

        cancel(){
        this.modalService.dismissAll();
        }
        onSubmit(policyID:String, policyName:String, userEmail:String, policyCoverage:Number, policyPremium:Number, travelStartDate:Date, travelEndDate:Date,dueDate:Date, country:String, paymentStatus:String){
            let agentID = localStorage.getItem("agentID")   
            let policyAdd = {  
            policyData : {
                policyID: policyID,
                agentID: agentID,
                policyName: policyName ,
                userEmail: userEmail,
                policyCoverage:policyCoverage,
                policyPremium:policyPremium,
                paymentStatus:paymentStatus,
                travelStartDate:travelStartDate,
                travelEndDate:travelEndDate, 
                dueDate:dueDate,
                country:country,
                isActive:true
            }
        }
            console.log("New Policy Created");
            let headers = new HttpHeaders();
            let usertoken = localStorage.getItem("userToken");
            if (usertoken !== null) {
                headers = headers.set('token', usertoken);
            }
            
            this.policyService.addPolicy(policyAdd,headers).subscribe((res) => {

                this.isPolicySucess=true;
                this.UserNotExists=false;
                

            },
              (err) => {
                console.log(err)
                this.UserNotExists=true;
                this.isPolicySucess=false;
            })
        }
 }