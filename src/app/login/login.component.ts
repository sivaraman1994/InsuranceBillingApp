import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators,NgForm } from "@angular/forms";
import { BackendApiService } from '../services/backend-api.service';
import { Route, Router } from '@angular/router';
import { NavBarComponent } from '../nav/navbar.component';
import { RegisterComponent } from '../register/register.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  
})

export class LoginComponent implements OnInit {
  contactForm!: FormGroup ;
  name!: String;
  password!: String;
  isUserIdMissing:Boolean = false;
  isNotAuthorized: Boolean = false;
  isUnkownError: Boolean = false;
  @Output() refreshNavBar = new EventEmitter();

  constructor(public formBuilder: FormBuilder,private apiService:BackendApiService
    ,private route:Router,public navCom: NavBarComponent,public modalService: NgbModal) { }

  ngOnInit(){
    this.route.navigate(['/home']);
    this.contactForm = this.formBuilder.group({
      name: ['',[Validators.required,Validators.minLength(3)]],
      password: ['',[Validators.required, Validators.minLength(3)]]
    });
    
  }
  cancel(){
    this.navCom.modalService.dismissAll();
  }
  onSubmit(name: String, password: String){
    console.log("form submitted with name"+name+"and password"+password);
    let userDetails = {
      userID:name,
      password:password
    }
    this.apiService.checkAccess(userDetails).subscribe((res:any)=>{
      // alert(JSON.stringify(res) +" ____________")
      
       if(res.token){
       localStorage.setItem("userName",res.userName);
        localStorage.setItem("userToken",res.token);
        this.navCom.modalService.dismissAll(); 
        
        this.refreshNavBar.emit("refresh");
        this.route.navigate(['/policydetails']);
        // navigate to policy detail page.
        // alert("valid user")
       // this.navCom.modalService.dismissAll();
      //  this.route.navigate(['/'+url]);
      }else alert("invalid");
    },(err)=>{

      if(err && err.error == "User not Authorized") {
        this.isNotAuthorized = true;
        this.isUnkownError = false;
        this.isUserIdMissing = false;
      }
      else if(err && err.error == "User ID does not exist") {
        this.isNotAuthorized = false;
        this.isUserIdMissing = true;
        this.isUnkownError = false;
      }else{
        this.isUnkownError = true;
      }
      this.contactForm.setErrors({ unauthenticated: true });
     // this.navCom.modalService.dismissAll();
    })
  }
  openSignUpModal() {
    const modalRef = this.modalService.open(RegisterComponent);
    modalRef.result.then((result) => {
      console.log(result);

    }).catch((error) => {
      console.log(error);
    });
  }
}