/* B2B Customer */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogIn } from './login.model';
import { Router } from '@angular/router';
import { UserManagementService } from './../user-management.service';
import { HeaderSideService} from './../../shared/header-side/header-side.service';
import { AuthService } from '../auth.service';
import { Register } from '../register/register.model';
import { AccessPermission } from './../../user-management/permission/accessPermission.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  onLoginForm: FormGroup;
  login: LogIn;
  showError = false;
  logOutSession: false;
  manager_id;
  returnUrl: string;
  message: Register;
  role: AccessPermission;
  constructor(
    private fb: FormBuilder, private router: Router, private route: ActivatedRoute, public userManagementService: UserManagementService,
     private authService: AuthService, public headerSideService: HeaderSideService
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.returnUrl = '/register';
  }
  createForm() {
    this.onLoginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginSubmit(onAdminForm: FormGroup) {
    this.login = new LogIn(
      onAdminForm.controls.userName.value,
      onAdminForm.controls.password.value
    );

    this.userManagementService.logIn(this.login).subscribe(data => {
      const fullData = Object.assign(data[0], data[1]);
      if (this.login.userName === fullData.userName
         && this.login.password === fullData.password ) {
        this.message = fullData;
        console.log(fullData);
        console.log(this.message);
        this.headerSideService.changeRegister(this.message);
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('role', JSON.stringify(fullData));
        this.router.navigate([this.returnUrl]);
        this.headerSideService.hideMenuTransparent();
      } else {
        /* const userID = data;
        localStorage.setItem('userID', JSON.stringify(userID)); */
        // this.router.navigate(['/register', data.userName], { queryParams: { allowEdit: '1' } });
      }
    }, error => {
      console.log(error);
    });
  }
}

