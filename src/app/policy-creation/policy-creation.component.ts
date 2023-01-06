import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { PolicyService } from '../policy-details/policy.service';
import { BackendApiService } from '../services/backend-api.service';

interface statusList {
    value: string;
    viewValue: string;
  }

interface nameList {
    value: string;
    viewValue: string;
}
@Component({
  selector: 'app-policy-creation',
  templateUrl: './policy-creation.component.html',
  styleUrls: ['./policy-creation.component.scss'],
  
})

export class PolicyCreationComponent implements OnInit {
    isPolicySucess!: Boolean;
    UserNotExists!: Boolean;
    isActive!: Boolean;
    //policyID!: String;
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
                //policyID: ['', Validators.required],
                policyName: ['', [Validators.required]],
                country: ['', [Validators.required, Validators.minLength(3)]],
                userEmail: ['', [Validators.required, Validators.email]],
                policyCoverage: ['', [Validators.required, Validators.min(5)]],
                policyPremium: ['', [Validators.required, Validators.min(3)]],
                paymentStatus: ['', [Validators.required]],
                travelStartDate: ['', [Validators.required, Validators.maxLength(10)]],
                travelEndDate: ['', [Validators.required, Validators.maxLength(10)]],
                dueDate: ['', [Validators.required, Validators.maxLength(10)]]
            });
        }
        Name: nameList[] = [
            {value: 'domestictrv-0', viewValue: 'Domestic Travel Insurance'},
            {value: 'internationaltrv-1', viewValue: 'International Travel Insurance'},
            {value: 'luggagetrv-2', viewValue: 'Luggage Insurance'},
            {value:'seniorcitizentrv-3', viewValue: 'Senior Citizen Travel Insurance '},
            {value:'singlemultitrv-4', viewValue: 'Single Multi Trip Insurance'},
            {value:'corporatetrv-5', viewValue: 'Corporate Travel Insurance'},
            {value:'medicaltrv-6', viewValue: 'Medical Travel Insurance'},
            {value:'familytrv-7', viewValue: 'Family Travel Insurance'},
            {value:'pregnancytrv-8', viewValue: 'Pregnancy Travel Insurance'},
            
            
        ];

        Status: statusList[] = [
            {value: 'completed-0', viewValue: 'Completed'},
            {value: 'inprogress-1', viewValue: 'In-Progress'},
            {value: 'pending-2', viewValue: 'Pending'},
            {value:'declined-3', viewValue: 'Declined'},
            {value:'cancelled-4', viewValue: 'Cancelled'}
          ];
              
        cancel(){
        this.modalService.dismissAll();
        }
        onSubmit(policyName:String, userEmail:String, policyCoverage:Number, policyPremium:Number, travelStartDate:Date, travelEndDate:Date,dueDate:Date, country:String, paymentStatus:String){
            let agentID = localStorage.getItem("agentID")   
            let policyAdd = {  
            policyData : {
               // policyID: policyID,
                agentID: agentID,
                policyName: this.Name.find(x => x.value === policyName)?.viewValue,
                userEmail: userEmail,
                policyCoverage:policyCoverage,
                policyPremium:policyPremium,
                paymentStatus:this.Status.find(x => x.value === paymentStatus)?.viewValue,
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
                window.location.reload();

            },
              (err) => {
                console.log(err)
                this.UserNotExists=true;
                this.isPolicySucess=false;
            })
        }
 }
