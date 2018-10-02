import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserManagementService } from './../user-management.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Register } from '../register/register.model';
import { AuthService } from '../auth.service';
import { AccessPermission } from '../permission/accessPermission.model';
import { HeaderSideService } from '../../shared/header-side/header-side.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {
  accessForm: FormGroup;
  register: Register;
  selectedPermissions = [];
  accessPermission: AccessPermission;
  allowEdit = false;
  message: Register;

  constructor(
    private fb: FormBuilder,
    private userManagementService: UserManagementService,
    private router: Router, public route: ActivatedRoute,
    public authService: AuthService,
    public headerSideService: HeaderSideService
  ) { }

  ngOnInit() {
    this.getAllRegister();
    this.userAccess();
    this.headerSideService.currentRegister.subscribe(message => this.message = message);
    console.log(this.message.userType);
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
