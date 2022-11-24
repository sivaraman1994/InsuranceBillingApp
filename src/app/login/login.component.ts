import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators,NgForm } from "@angular/forms";
import { BackendApiService } from '../services/backend-api.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  
})
export class LoginComponent implements OnInit {
  contactForm!: FormGroup ;
  name!: String;
  password!: String;
  constructor(public formBuilder: FormBuilder,private apiService:BackendApiService
    ,private route:Router) { }
  
  ngOnInit(){
    this.contactForm = this.formBuilder.group({
      name: ['',[Validators.required,Validators.minLength(3)]],
      password: ['',[Validators.required, Validators.minLength(3)]]
    });
    
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
      //  this.route.navigate(['/'+url]);
      }else alert("invalid");
    },(err)=>{

      console.log("response"+err);
      this.contactForm.setErrors({ unauthenticated: true });
    })
  }


}
