import { Routes } from '@angular/router'
import { HomeDetailsComponent } from './home/home.component'
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component'
import { LoginComponent } from './login/login.component'
import { PolicyListComponent } from './policy-details/policy-list.component'


export const appRoutes: Routes = [
  { path: 'home', component: HomeDetailsComponent },
  { path: 'policydetails', component: PolicyListComponent},
  { path: 'viewinvoice', component: ViewInvoiceComponent },
  { path: 'login', component: LoginComponent }
]