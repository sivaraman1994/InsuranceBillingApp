import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators,NgForm } from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit {
  contactForm!: FormGroup ;
  name!: String;
  password!: String;
  constructor(private activeModal: NgbActiveModal,public formBuilder: FormBuilder) { }
  
  ngOnInit(){
    this.contactForm = this.formBuilder.group({
      name: ['',[Validators.required,Validators.minLength(3)]],
      password: ['',[Validators.required, Validators.minLength(3)]]
    });
  }
  
  onSubmit(name: String, password: String){
    console.log("form submitted with name"+name+"and password"+password);
  }

}
