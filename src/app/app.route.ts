import { RouterModule, Routes } from '@angular/router';
import { NavHeaderComponent } from './shared/nav-header/nav-header.component';


const routes: Routes = [
    { path: 'navheader', component: NavHeaderComponent },
];

export const Routing = RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' });
