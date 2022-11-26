import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendApiService } from '../services/backend-api.service';


@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;
    fullName!: String;
    email! : String;
    password!: String;
    modalService: any;

    constructor(public formBuilder: FormBuilder,private apiService:BackendApiService
      ,private router:Router) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            fullName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }
    onSubmit(fullName: String, email: String, password: String){
      console.log("Form submitted with name: "+fullName+", EmailID: "+email+" and password: "+password);
      let userDetails = {
        userID:fullName,
        emailID:email,
        password:password
      }
      this.apiService.checkUser(userDetails).subscribe((res:any)=>{
        // alert(JSON.stringify(res) +" ____________")
        
         if(res.token){
          alert("new user")
        //  this.route.navigate(['/'+url]);
        }else alert("existing user");
      },(err)=>{
  
        console.log("response"+err);
        this.registerForm.setErrors({ unauthenticated: true });
      })
    }
    cancel(){
      this.router.navigate(['home']);
    }
  }