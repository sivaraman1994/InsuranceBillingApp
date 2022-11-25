import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


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

    constructor(private activeModal: NgbActiveModal,public formBuilder: FormBuilder, private router:Router) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            fullName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }


    onSubmit(name: String, email: String, password: String){
      console.log("form submitted with name"+name+", email"+email+"and password"+password);
    }

    cancel(){
      this.router.navigate(['home'])
    }
}
