import { Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserManagementService } from './../user-management.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Register } from './register.model';
import { AuthService } from '../auth.service';
import { HeaderSideService } from '../../shared/header-side/header-side.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  accessForm: FormGroup;
  register: Register;
  userTypes = ['operation', 'mananger'];
  selectedPermissions = [];
  logOutSession = false;
  manager_id;
  paramsValue: Params;
  allowEdit = false;
  message: Register;

  constructor(
    private fb: FormBuilder,
    private userManagementService: UserManagementService, private router: Router, public route: ActivatedRoute,
    public authService: AuthService, public headerSideService: HeaderSideService
  ) {
  }

  ngOnInit() {
    this.userRegister();
    this.headerSideService.currentRegister.subscribe(message => this.message = message);
    console.log(this.message.userType);
  }

  userRegister() {
    this.registerForm = this.fb.group({
      _id: [''],
      userName: ['', Validators.minLength(3)],
      password: ['', Validators.minLength(3)],
      mobileNumber: ['', Validators.required],
      email: [''],
      userType: ['', Validators.required]
    });
  }
  regSubmit(registerForm: FormGroup) {
  
    this.register = new Register(
      registerForm.controls.userName.value,
      registerForm.controls.password.value,
      registerForm.controls.mobileNumber.value,
      registerForm.controls.email.value,
      registerForm.controls.userType.value,
      /*    registerForm.controls.smsPermission.value,
         registerForm.controls.emailPermission.value,
         registerForm.controls.editPermission.value,
         registerForm.controls.deletePermission.value */
    );
    this.userManagementService.registration(this.register).subscribe(data => {
      console.log(data);
    }, error => {

      console.log(error);
    });
  }
}
