import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserManagementService } from './../user-management.service';
import { Router } from '@angular/router';
import { Register } from './register.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  register: Register;
  userTypes = ['operation', 'mananger'];
  constructor(
    private fb: FormBuilder, private userManagementService: UserManagementService, private router: Router
  ) { }

  ngOnInit() {
    this.userRegister();
  }

  userRegister() {
    this.registerForm = this.fb.group({
      userName: ['', Validators.minLength(3)],
      password: ['', Validators.minLength(3)],
      mobileNumber: ['', Validators.required],
      email: [''],
      userType: ['', Validators.required]
    });
  }
  regSubmit(registerForm: FormGroup) {
    // TODO: Change the userModel variable to pwdChangeReset
    this.register = new Register(
      registerForm.controls.userName.value,
      registerForm.controls.password.value,
      registerForm.controls.mobileNumber.value,
      registerForm.controls.email.value,
      registerForm.controls.userType.value
    );
    this.userManagementService.registration(this.register).subscribe(data => {
      console.log(data);
    }, error => {

      console.log(error);
    });
  }
}
