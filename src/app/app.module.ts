import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routing } from './app.route';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { NavHeaderService } from './shared/nav-header/nav-header.service';
import {
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatOptionModule,
  MatSelectModule,
  MatMenuModule,
  MatSnackBarModule,
  MatGridListModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatRadioModule,
  MatCheckboxModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatRippleModule,
  MatDialogModule,
  MatChipsModule,
  MatInputModule
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTableModule } from '@angular/material/table';
import { NavHeaderComponent } from './shared/nav-header/nav-header.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { CustomerManagementComponent,
   CustomerEditComponent } from './customer-management/customer-management/customer-management.component';
import { CustomerManagementService } from './customer-management/customer-management.service';
import { HeaderSideComponent } from './shared/header-side/header-side.component';

import { HeaderSideService } from './shared/header-side/header-side.service';
import { SmsManagementComponent } from './sms-management/sms-management/sms-management.component';
import { EmailManagementComponent } from './email-management/email-mangement/email-management.component';
import { ProductManagementComponent } from './product-management/product-management/product-management.component';

@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent,
    CustomerManagementComponent,
    CustomerEditComponent,
    HeaderSideComponent,
    SmsManagementComponent,
    EmailManagementComponent,
    ProductManagementComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    Routing,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatTableModule,
    MatDialogModule,
    RouterModule,
    MatInputModule,
    NgxDatatableModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [NavHeaderService, CustomerManagementService, HeaderSideService],
  bootstrap: [AppComponent],
  entryComponents: [CustomerEditComponent]
})
export class AppModule { }
