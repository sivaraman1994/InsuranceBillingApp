import { Component } from '@angular/core'
import { LoginComponent } from '../login/login.component'
import { MatDialog } from '@angular/material/dialog';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { PolicyCreationComponent } from '../policy-creation/policy-creation.component';


@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styles: [`
  header#myHeader {
    
    background-color: white;
    box-shadow: 20px -30px 35px 15px light grey;
    top: 0;
    width: 100%;
    z-index: 99999;

 }
 a{
   color: black;
 }
 
 .img-fluid{
    display: inline-block;
    margin-right: 5% !important;
 }
.isDisabled {
  color: currentColor;
  cursor: not-allowed;
  pointer-events: none;
  opacity: 0.5;
  text-decoration: none;
}
#username{
  text-decoration: none;
}

 .flex{
    margin: 10px 10px 0 10px;
    display:flex;
    align-items: center;
}
 @media(min-wdith: 992px){
 .flex{
    flex-direction: row;
    flex-wrap:nowrap;
    justify-content: flex-start;
 }
}

  a.active{
   color:  blue;
  }

 a.nav-item{
    margin-right: 80px;
    margin-left: 80px;
    text-decoration: none;
    font-size:larger;
     
 }
 #nav-link:hover {
    color: orange;
    cursor: pointer;
  }
 #nav-link{
  margin-left: 10px;
  text-decoration: none;
  color: blue;
 } 
 `]

})

export class NavBarComponent {
  isLoggedIn: Boolean = false;
  userName:string ="" ;
  constructor(public modalService: NgbModal, private router: Router) { }
  openLoginModal() {
    // this.router.navigate(['/login']);

    const modalRef = this.modalService.open(LoginComponent, {
      backdrop: false,
      keyboard: true,
      size: 'xxlg',
    });

    modalRef.result.then((result) => {
      console.log(result);
      //this.modalService.dismissAll();
    }).catch((error) => {
      console.log(error);
    });


  }
  refreshNavBar($event: any) {
    console.log('refresh event after login ', $event);
  }
  openSignUpModal() {
    const modalRef = this.modalService.open(RegisterComponent);
    modalRef.result.then((result) => {
      console.log(result);

    }).catch((error) => {
      console.log(error);
    });
  }
  
  ngOnInit(): void {
    // alert(localStorage.getItem('userName'));
    let name = localStorage.getItem('userName');
    if (name != null) {
      this.isLoggedIn = true;
      this.userName = name;
    } else {
      this.isLoggedIn = false;
    }

  }
  logoff() {
    
    this.router.navigate(['/']);
    localStorage.clear();
  }
  doSomething(event:any)
    { 
      alert("event received");
    }
}
