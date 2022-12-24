import { Component } from '@angular/core'


@Component({
    templateUrl: './home.component.html',
    styles: [`
      div.card-header {
        font-size: large;
       }      
       div.card {
        width: 90%;
        height: 750px;
        align: center;
        margin: 30px auto 30px auto;
       }
       .bg-gray-sec{
        background-color: white;
       }
      .text-center{
        text-align: center !important;
      }
      .px-4 {
    padding-left: 1.5rem !important;
}
.plans-available .card {
    margin: 0 13px 0 12px;
}

        
       `]
})
export class HomeDetailsComponent {
    public pageTitle = 'Welcome to Trip Insurance';
}
