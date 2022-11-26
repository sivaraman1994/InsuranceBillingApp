import { Component } from '@angular/core'


@Component({
    templateUrl: './home.component.html',
    styles: [`
      div.card-header {
        font-size: large;
       }
       
       div.card {
         width: 90%;
         height: 450px;
         align: center;
         margin: 30px auto 30px auto;
       }`]
})
export class HomeDetailsComponent {
    public pageTitle = 'Welcome to Trip Insurance';
}