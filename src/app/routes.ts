import { Routes } from '@angular/router'
import { HomeDetailsComponent } from './home/home.component'
import { PolicyDetailsComponent } from './policy-details/policy-details.component'
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component'
import { LoginComponent } from './login/login.component'
 

export const appRoutes:Routes = [
  { path: 'home', component: HomeDetailsComponent},
  { path: 'policydetails', component: PolicyDetailsComponent},
  { path: 'viewinvoice', component: ViewInvoiceComponent},
  { path: 'login', component: LoginComponent}
]