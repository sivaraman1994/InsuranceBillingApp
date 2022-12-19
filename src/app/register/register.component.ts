import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { BackendApiService } from '../services/backend-api.service';
import { RegisterService } from '../services/register.service';


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
    isUserExists!: Boolean;
    isUserSucess!: Boolean;

    constructor(public formBuilder: FormBuilder,private apiService:BackendApiService,
      private registerService:RegisterService
      ,private router:Router,public modalService: NgbModal) { }

      

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            fullName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }
    cancel(){
      this.modalService.dismissAll();
   }
    onSubmit(fullName: String, email: String, password: String){
      console.log("Form submitted with name: "+fullName+", EmailID: "+email+" and password: "+password);
      let userDetails = {
        name:fullName,
        userID:email,
        password:password
      }
      this.registerService.addUser(userDetails).subscribe( (res) => {
        
         this.isUserSucess=true; 
         this.isUserExists =false;
      },
        (err) => {
          console.log(err)
          this.isUserExists =true;
          this.isUserSucess=false;
      })
  }
    openLoginModal() {
        this.modalService.dismissAll();
        const modalRef = this.modalService.open(LoginComponent, {
          backdrop: false,
          keyboard: true,
          size: 'xxlg',
        });
      }
  
}