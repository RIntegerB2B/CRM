import { RouterModule, Routes } from '@angular/router';
import { NavHeaderComponent } from './shared/nav-header/nav-header.component';
import { HeaderSideComponent } from './shared/header-side/header-side.component';
import { CustomerManagementComponent } from './customer-management/customer-management/customer-management.component';

const routes: Routes = [
    { path: 'navheader', component: NavHeaderComponent },
    { path: 'headerside', component: HeaderSideComponent },
    { path: 'customers', component: CustomerManagementComponent },
    { path: '', redirectTo: 'navheader', pathMatch: 'full' },
    { path: '**', redirectTo: 'navheader', pathMatch: 'full' }
];

export const Routing = RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' });
