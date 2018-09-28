import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogIn } from './login.model';
import { Router } from '@angular/router';
import { UserManagementService } from './../user-management.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  onLoginForm: FormGroup;
  login: LogIn;
  showError = false;
  manager_id;
  deletePermissionDisabled = false;
  constructor(
    private fb: FormBuilder, private router: Router, public userManagementService: UserManagementService

  ) { }

  ngOnInit() {
    this.createForm();
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
      if (data.userType === 'mananger') {
        this.router.navigate(['/register', data._id, 'sms'], {queryParams: {allowEdit: '1'} } );
      }      else {
        this.router.navigate(['/register']);
      }
    }, error => {
      console.log(error);
    });
  }
}
