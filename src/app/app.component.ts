import { Component } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
  <nav-bar></nav-bar>
  <router-outlet></router-outlet>
  <footer-bar></footer-bar>
  `,
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'RealProject';
  contactForm : FormGroup | undefined;
  ngOnInit(){
    this.contactForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl()
    });
  }
}
