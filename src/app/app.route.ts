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

const routes: Routes = [
    { path: 'sms', canActivate: [AuthGuard], component: SmsManagementComponent },
    { path: 'headerside', component: HeaderSideComponent
    },
    { path: 'upload', canActivate: [AuthGuard], component: UploadManagementComponent },
    { path: 'b2cmarket', canActivate: [AuthGuard], component: B2cmarketManagementComponent },
    { path: 'customers', canActivate: [AuthGuard], component: CustomerManagementComponent},
/*
    { path: 'navheader', canActivate: [AuthGuard], component: NavHeaderComponent,  },
    ,

    { path: 'customers', component: CustomerManagementComponent,
    children: [{ path: ':id', component: CustomerManagementComponent }
        ]
 }, */
    {
        path: 'login', component: LoginComponent,
        /* children: [{ path: ':id', component: LoginComponent }
        ] */
    },
    { path: 'email', component: EmailManagementComponent, canActivate: [AuthGuard] },
    {
        path: 'register',
         component: RegisterComponent, canActivate: [AuthGuard]
        /* children: [{ path: ':id', component: RegisterComponent }
        ] */
    }
    /* { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login', pathMatch: 'full' } */
];

export const Routing = RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' });
