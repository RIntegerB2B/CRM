import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogIn } from './login.model';
import { Router } from '@angular/router';
import { UserManagementService } from './../user-management.service';
import { HeaderSideService} from './../../shared/header-side/header-side.service';
import { AuthService } from '../auth.service';
import { Register } from '../register/register.model';

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
  deletePermissionDisabled = false;
  message: Register;
  constructor(
    private fb: FormBuilder, private router: Router, private route: ActivatedRoute, public userManagementService: UserManagementService,
     private authService: AuthService, public headerSideService: HeaderSideService
  ) { 
  }

  ngOnInit() {
    this.createForm();
    this.returnUrl = '/register';
    // this.headerSideService.currentRegister.subscribe(message => this.message = message);
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
      /* if (data !== null) {
        this.router.navigate(['/register']);
      }      else      {
        this.showError = true;
      } */
      if (this.login.userName === data.userName && this.login.password === data.password ) {
          /* localStorage.setItem('userID', JSON.stringify(userID));  */
        // this.router.navigate(['/register', data._id], { queryParams: { allowEdit: '1' } });
        this.message = data;
        this.headerSideService.changeRegister(this.message);
        localStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('token', this.login.userName);
        this.router.navigate([this.returnUrl]);
        this.headerSideService.hideMenuTransparent();
      } else {
        /* const userID = data;
        localStorage.setItem('userID', JSON.stringify(userID)); */
        this.router.navigate(['/register', data.userName], { queryParams: { allowEdit: '1' } });
      }

    }, error => {
      console.log(error);
    });
  }
}

