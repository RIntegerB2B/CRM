import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Register } from '../../user-management/register/register.model';

interface IMenuItem {
  type: string;    // Possible values: link/dropDown/icon/separator/extLink
  name?: string;      // Used as display text for item and title for separator type
  state?: string;    // Router state
  icon?: string;     // Material icon name
  tooltip?: string;   // Tooltip text
  disabled?: boolean;   // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
}
interface IChildItem {
  type?: string;
  name: string;      // Display text
  state?: string;     // Router state
  icon?: string;
  sub?: IChildItem[];
}
interface IBadge {
  color: string;      // primary/accent/warn/hex color codes(#fff000)
  value: string;      // Display text
}



@Injectable()

export class HeaderSideService {
  menuTransparent: string;
  registerSource = new BehaviorSubject<any>('');
  currentRegister = this.registerSource.asObservable();
  constructor() { }
  iconMenu: IMenuItem[] = [
    {
      name: 'B2B CUSTOMER DB',
      type: 'bcustomer',
      tooltip: 'Dashboard',
      icon: 'group',
      state: 'dashboard',
    },
    {
      name: 'B2B MARKET DB',
      type: 'bmarket',
      tooltip: 'market',
      icon: 'group',
      state: 'market',
    },
    {
      name: 'B2C CUSTOMER DB',
      type: 'ccustomer',
      tooltip: 'dashboard',
      icon: 'group',
      state: 'tables',
    },
    {
      name: 'B2C MARKET DB',
      type: 'cmarket',
      tooltip: 'dashboard',
      icon: 'group',
      state: 'tables',
    },
    {
      name: 'EMPLOYEE DB',
      type: 'employee',
      tooltip: 'email',
      icon: 'group',
      state: 'tables',
    },
    {
      name: 'VENDOR DB',
      type: 'vendor',
      tooltip: 'email',
      icon: 'group',
      state: 'tables',
    },
    {
      name: 'AGENT DB',
      type: 'agent',
      icon: 'group',
      state: 'tables',
    },
    {
      name: 'OTHERS DB',
      type: 'others',
      icon: 'group',
      state: 'tables',
    },
    {
      name: 'REPORT',
      type: 'others',
      icon: 'group',
      state: 'tables',
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
      name: 'USER MANAGEMENT',
      type: 'user',
      tooltip: 'user',
      icon: 'account_circle',
      state: 'tables',
    },
    {
      name: 'REGISTER',
      type: 'register',
      tooltip: 'register',
      icon: 'subject',
      state: 'tables',
    },
    {
      name: 'USER PERMISSION',
      type: 'permission',
      tooltip: 'permission',
      icon: 'lock_outline',
      state: 'tables',
    },
    {
      name: 'MESSAGE SETTING',
      type: 'message',
      tooltip: 'message',
      icon: 'message',
      state: 'message',
    },
    {
      name: 'UPLOAD',
      type: 'upload',
      tooltip: 'email',
      icon: 'cloud_upload',
      state: 'tables',
    },
    {
      name: 'BACKUP',
      type: 'backup',
      tooltip: 'email',
      icon: 'cloud_download',
      state: 'tables',
    },
  ];


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
  makeMenuTransparent() {
    this.menuTransparent = 'menuTransparent';
}
  hideMenuTransparent() {
      this.menuTransparent = '';
  }
  changeRegister(message: Register) {
    this.registerSource.next(message);
  }
}
