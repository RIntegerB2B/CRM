import { RouterModule, Routes } from '@angular/router';
import { NavHeaderComponent } from './shared/nav-header/nav-header.component';


const routes: Routes = [
    { path: 'navheader', component: NavHeaderComponent },
    { path: '', redirectTo: 'navheader', pathMatch: 'full' },
    { path: '**', redirectTo: 'navheader', pathMatch: 'full' }
];

export const Routing = RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' });
