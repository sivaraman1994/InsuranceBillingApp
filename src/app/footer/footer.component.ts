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
    background-color: grey;
    padding: 5px;
    margin-bottom: 0px;
    overflow: hidden;
    position: absolute;
    width: 95.3%;
    bottom: 0;
   }

 .footer-item{
    color: black;
    margin-right: 100px;
    text-decoration: none;
    font-size:medium;
 }

 `]

})
export class FooterbarComponent {

}