import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeDetailsComponent } from './home/home.component';
import { NavBarComponent } from './nav/navbar.component';
import { RegisterComponent } from './register/register.component';
import { FooterbarComponent } from './footer/footer.component';

import {MatExpansionModule} from '@angular/material/expansion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule,MatFormFieldControl, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field'
import { appRoutes } from './routes';
import { PolicyDetailsComponent } from './policy-details/policy-details.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { BackendApiService } from './services/backend-api.service';
import { PolicyListComponent } from './policy-details/policy-list.component';
import { convertToSpacesPipe } from './policy-details/convert-to-space.pipe';
import { RegisterService } from './services/register.service';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatFormFieldModule,
    MatButtonModule,
    NgbModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    RouterModule.forChild([
      {path: 'policy', component: PolicyListComponent}

  ])
],
  exports:[
    MatCardModule
  ],
  declarations: [
    AppComponent,
    HomeDetailsComponent,
    FooterbarComponent,
    NavBarComponent,
    RegisterComponent,
    PolicyListComponent,
    PolicyDetailsComponent,
    convertToSpacesPipe,
    ViewInvoiceComponent,
    LoginComponent
  ],
  providers:  [BackendApiService, NavBarComponent,[{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'legacy'}}],
  [{provide: MatFormFieldControl}],
  RegisterService
],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
