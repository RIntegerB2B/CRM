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


const routes: Routes = [
    { path: 'sms', canActivate: [AuthGuard], component: SmsManagementComponent },
    {
        path: 'headerside', canActivate: [AuthGuard], component: HeaderSideComponent
    },
    { path: 'upload', canActivate: [AuthGuard], component: UploadManagementComponent },
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
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

export const Routing = RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' });
