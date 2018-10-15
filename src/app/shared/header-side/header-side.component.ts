
import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
// import PerfectScrollbar from 'perfect-scrollbar';
import { HeaderSideService } from '../../shared/header-side/header-side.service';
import { UserManagementService } from './../../user-management/user-management.service';
import { Subscription } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../user-management/auth.service';
import { Register } from '../../user-management/register/register.model';
import { AccessPermission } from './../../user-management/permission/accessPermission.model';

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.component.html',
  styleUrls: ['./header-side.component.css']
})

export class HeaderSideComponent implements OnInit, OnDestroy, AfterContentChecked {
  // private sidebarPS: PerfectScrollbar;
  menuItems: any[];
  public hasIconTypeMenuItem: boolean;
  menuItemsSub: Subscription;
  mobileQuery: MediaQueryList;
  allowEdit: false;
  paramsVal;
  paramsValue: Params[];
  roleIsEmpty = false;
  // message: Register;
  role: AccessPermission;
  isExpanded = true;
  showSubmenu = false;
  isShowing = false;
  showSubSubMenu = false;
  showInternational = false;
  showSetting = false;
  message;
  private _mobileQueryListener: () => void;
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  constructor(public headerSideService: HeaderSideService, private userManagementService: UserManagementService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher, private router: Router, public route: ActivatedRoute, private authService: AuthService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.paramsValue = this.route.snapshot.children.map(d => d.params);
    console.log(this.paramsValue);
  }

  ngOnInit() {
    this.menuItemsSub = this.headerSideService.menuItems$.subscribe(menuItem => {
      this.menuItems = menuItem.filter(item => item.type !== 'icon' && item.type !== 'separator');
      this.hasIconTypeMenuItem = !!this.menuItems.filter(item => item.type === 'icon').length;
    });
    /* this.userManagementService.logIn().subscribe(data => data); */
    // this.role = sessionStorage.getItem('role');
    this.headerSideService.makeMenuTransparent();
  }
  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    if (this.menuItemsSub) {
      this.menuItemsSub.unsubscribe();
    }
    this.authService.logout();
  }
  ngAfterContentChecked() {
  }
  logout() {
    console.log('Logout');
    this.authService.logout();
    this.router.navigate(['/login']);
    this.headerSideService.makeMenuTransparent();
  }
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }
  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
