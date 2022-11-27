import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators,NgForm } from "@angular/forms";
import { BackendApiService } from '../services/backend-api.service';
import { Route, Router } from '@angular/router';
import { NavBarComponent } from '../nav/navbar.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  
})
export class LoginComponent implements OnInit {
  contactForm!: FormGroup ;
  name!: String;
  password!: String;
  isUserIdExists!:Boolean;
  constructor(public formBuilder: FormBuilder,private apiService:BackendApiService
    ,private route:Router,public navCom: NavBarComponent) { }
  
  ngOnInit(){
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
        alert("valid user")
       // this.navCom.modalService.dismissAll();
      //  this.route.navigate(['/'+url]);
      }else alert("invalid");
    },(err)=>{

      console.log("response"+err);
      this.isUserIdExists = true;
      this.contactForm.setErrors({ unauthenticated: true });
     // this.navCom.modalService.dismissAll();
    })
  }

}
