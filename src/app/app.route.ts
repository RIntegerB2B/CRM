import { RouterModule, Routes } from '@angular/router';
import { NavHeaderComponent } from './shared/nav-header/nav-header.component';
import { HeaderSideComponent } from './shared/header-side/header-side.component';
import { CustomerManagementComponent } from './customer-management/customer-management/customer-management.component';
import { SmsManagementComponent } from './sms-management/sms-management/sms-management.component';
import { EmailManagementComponent } from './email-management/email-mangement/email-management.component';
import { UploadManagementComponent } from './upload-management/upload-management/upload-management.component';
import { B2cmarketManagementComponent } from './b2cmarket-management/b2cmarket-management/b2cmarket-management.component';
import { LoginComponent } from './user-management/login/login.component';
import { RegisterComponent } from './user-management/register/register.component';
import { AuthGuard } from './user-management/auth-guard.service';
import { PermissionComponent } from './user-management/permission/permission.component';
import { B2bmarketManagementComponent } from './b2bmarket-management/b2bmarket-management/b2bmarket-management.component';
import { B2ccustomerManagementComponent } from './b2ccustomer-management/b2ccustomer-management/b2ccustomer-management.component';
import { VendorManagementComponent } from './vendor-management/vendor-management/vendor-management.component';
import { EmployeeManagementComponent } from './employee.management/employee-management/employee-management.component';
import { BackupComponent } from './backup-management/backup/backup.component';
import {
    AgentManagementComponent
  } from './agent-management/agent-management/agent-management.component';
  import {
    OtherCustomerComponent
  } from './other-customer-management/other-customer/other-customer.component';
  import { Interb2bcustomerManagementComponent
  } from './interb2bcustomer-management/interb2bcustomer-management/interb2bcustomer-management.component';
 import { Interb2bmarketManagementComponent
  } from './interb2bmarket-management/interb2bmarket-management/interb2bmarket-management.component';
 import { Interb2ccustomerManagementComponent
  } from './interb2ccustomer-management/interb2ccustomer-management/interb2ccustomer-management.component';
 import { Interb2cmarketManagementComponent
  } from './interb2cmarket-management/interb2cmarket-management/interb2cmarket-management.component';
  import { MessageManagementComponent
  } from './message-management/message-management/message-management.component';
  import { InteruploadManagementComponent } from './interupload-management/interupload-management/interupload-management.component';

const routes: Routes = [
    { path: 'sms', canActivate: [AuthGuard], component: SmsManagementComponent },
    {
        path: 'headerside', canActivate: [AuthGuard], component: HeaderSideComponent
    },
    { path: 'upload', canActivate: [AuthGuard], component: UploadManagementComponent },
    { path: 'backup', canActivate: [AuthGuard], component: BackupComponent },
    { path: 'b2cmarket', canActivate: [AuthGuard], component: B2cmarketManagementComponent },
    { path: 'customers', canActivate: [AuthGuard], component: CustomerManagementComponent },
    {
        path: 'b2bmarket',
        component: B2bmarketManagementComponent, canActivate: [AuthGuard]
    },
    {
        path: 'b2ccustomer',
        component: B2ccustomerManagementComponent, canActivate: [AuthGuard]
    },
    {
        path: 'employee',
        component: EmployeeManagementComponent, canActivate: [AuthGuard]
    },
    {
        path: 'vendor',
        component: VendorManagementComponent, canActivate: [AuthGuard]
    },
    {
        path: 'agent',
        component: AgentManagementComponent, canActivate: [AuthGuard]
    },
    {
        path: 'others',
        component: OtherCustomerComponent, canActivate: [AuthGuard]
    },
    {
        path: 'interb2bcustomer',
        component: Interb2bcustomerManagementComponent, canActivate: [AuthGuard]
    },
    {
        path: 'interb2bmarket',
        component: Interb2bmarketManagementComponent, canActivate: [AuthGuard]
    },
    {
        path: 'interb2ccustomer',
        component: Interb2ccustomerManagementComponent, canActivate: [AuthGuard]
    },
    {
        path: 'interb2cmarket',
        component: Interb2cmarketManagementComponent, canActivate: [AuthGuard]
    },
    {
        path: 'message',
        component: MessageManagementComponent, canActivate: [AuthGuard]
    },
    {
        path: 'login', component: LoginComponent
    },
    { path: 'email', component: EmailManagementComponent, canActivate: [AuthGuard] },
    {
        path: 'register',
        component: RegisterComponent, canActivate: [AuthGuard]
    },
    {
        path: 'permission',
        component: PermissionComponent, canActivate: [AuthGuard]
    },
    {
        path: 'interupload',
        component: InteruploadManagementComponent, canActivate: [AuthGuard]
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

export const Routing = RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' });
