import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IMenuItem {
  type: string,    // Possible values: link/dropDown/icon/separator/extLink
  name?: string,      // Used as display text for item and title for separator type
  state?: string,     // Router state
  icon?: string,      // Material icon name
  tooltip?: string,   // Tooltip text
  disabled?: boolean,   // If true, item will not be appeared in sidenav.
  sub?: IChildItem[], // Dropdown items
  badges?: IBadge[] 
}
interface IChildItem {
  type?: string,
  name: string,       // Display text
  state?: string,     // Router state
  icon?: string,
  sub?: IChildItem[]
}
interface IBadge {
  color: string;      // primary/accent/warn/hex color codes(#fff000)
  value: string;      // Display text
}



@Injectable()

export class HeaderSideService {

  constructor() { }
  iconMenu: IMenuItem[] = [
    {
      name: 'HOME',
      type: 'icon',
      tooltip: 'Home',
      icon: 'home',
      state: 'home',
      badges: [{ color: 'accent', value: '100+' }],
    },
    {
      name: 'PROFILE',
      type: 'icon',
      tooltip: 'Profile',
      icon: 'person',
      state: 'profile/overview'
    },
    {
      type: 'separator',
      name: 'Main Items'
    },
    {
      name: 'CUSTOMER DETAILS',
      type: 'dashboard',
      tooltip: 'Dashboard',
      icon: 'dashboard',
      state: 'dashboard',
    },
    {
      name: 'SMS',
      type: 'link',
      tooltip: 'SMS',
      icon: 'message',
      state: 'cruds/ngx-table'
    },
    {
      name: 'EMAIL',
      type: 'dropDown',
      tooltip: 'email',
      icon: 'email',
      state: 'tables',
    },
    {
      name: 'UPLOAD',
      type: 'upload',
      tooltip: 'email',
      icon: 'add_to_photos',
      state: 'tables',
    }
  ]

  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();

  publishNavigationChange(menuType: string) {
    switch (menuType) {
      case 'icon-menu':
        this.menuItems.next(this.iconMenu);
        break;
    }
  }
}
