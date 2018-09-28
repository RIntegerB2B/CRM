import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserManagementService } from './../user-management.service';
import { Router } from '@angular/router';
import { Register } from './register.model';
import { AccessPermission } from './accessPermission.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  accessForm: FormGroup;
  register: Register;
  accessPermission: AccessPermission;
  /* @Input( )  deletePermissionDisabled = false; */
  userTypes = ['operation', 'mananger'];
  selectedPermissions = [];
  manager_id;
  constructor(
    private fb: FormBuilder, private userManagementService: UserManagementService, private router: Router
  ) { }

  ngOnInit() {
    this.userRegister();
    this.getAllRegister();
    this.userAccess();
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
  userAccess() {
    this.accessForm = this.fb.group({
      _id: [''],
      userType: ['', Validators.required],
      smsPermission: [false, Validators.required],
      emailPermission: [false, Validators.required],
      editPermission: [false, Validators.required],
      deletePermission: [false, Validators.required]
    });
  }
  regSubmit(registerForm: FormGroup) {
    // TODO: Change the userModel variable to pwdChangeReset
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
  getAllRegister() {
    this.userManagementService.allRegister().subscribe(data => {
      this.register = data;
      console.log(this.register);
    }, error => {
      console.log(error);
    });
  }
  selectedAccess(e, value) {
    if (e.checked) {
      this.selectedPermissions.push(value);
    } else {
      const updateItem = this.selectedPermissions.find(this.findIndexToUpdate, value);

      const index = this.selectedPermissions.indexOf(updateItem);

      this.selectedPermissions.splice(index, 1);
    }
    console.log(this.selectedPermissions);
  }
  findIndexToUpdate(value) {
    return value === this;
  }
  sendPermission(accessForm: FormGroup, id, userType) {
    accessForm.controls._id.setValue(id);
    accessForm.controls.userType.setValue(userType);
    this.accessPermission = new AccessPermission(
      accessForm.controls._id.value,
      accessForm.controls.userType.value,
      accessForm.controls.smsPermission.value,
      accessForm.controls.emailPermission.value,
      accessForm.controls.editPermission.value,
      accessForm.controls.deletePermission.value
    );
    this.userManagementService.permissionUsers(this.accessPermission).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
}
