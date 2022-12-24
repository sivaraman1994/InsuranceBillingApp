import { Component } from '@angular/core'

@Component({
  selector: 'footer-bar',
  templateUrl: './footer.component.html',
  styles:[ `

.footer-img{
     margin-right: 5px;
     margin-left: 10px;
   }
 .footer-default{
    background-color: #2a4c6d;
    padding: 1px;
    margin-bottom: 0px;
    overflow: hidden;
    position: fixed;
    width: 99.3%;
    bottom: 0;
   }

 .footer-item{
    color: white;
    margin-right: 100px;
    text-decoration: none;
    font-size:medium;
 }

 `]

})
export class FooterbarComponent {

}
