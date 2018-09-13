import { RouterModule, Routes } from '@angular/router';
import { NavHeaderComponent } from './shared/nav-header/nav-header.component';
import { CustomerManagementComponent } from './customer-management/customer-management/customer-management.component';


const routes: Routes = [
    { path: 'Customer', component: CustomerManagementComponent },
    { path: '', redirectTo: 'Customer', pathMatch: 'full' },
    { path: '**', redirectTo: 'Customer', pathMatch: 'full' }
];

export const Routing = RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' });
