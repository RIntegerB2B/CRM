import { Component, OnInit } from '@angular/core';
import { HeaderSideService } from './shared/header-side/header-side.service';
import { AccessPermission } from './user-management/permission/accessPermission.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  role: AccessPermission;
  constructor(
    public headerSideService: HeaderSideService
  ) {
    this.role = JSON.parse(sessionStorage.getItem('role'));
  }

  ngOnInit() {
    this.role = JSON.parse(sessionStorage.getItem('role'));
    this.headerSideService.makeMenuTransparent();
  }
}
