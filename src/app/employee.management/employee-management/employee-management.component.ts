import { Component, OnInit, Inject } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { Employee } from './../../shared/model/employee.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from './../employee.service';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { CustomerEditComponent } from './../../customer-management/customer-management/customer-management.component';
import { HeaderSideService } from '../../shared/header-side/header-side.service';
import { AccessPermission } from './../../user-management/permission/accessPermission.model';


@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {

  newCustomer: Employee[] = [];
  role: AccessPermission;
  employeeDetailsForm: FormGroup;
  constructor(private fb: FormBuilder,
    private headerSideService: HeaderSideService,
    private employeeService: EmployeeService, private dialog: MatDialog) { }
  ngOnInit() {
    this.createEmployeeForm();
    this.getAllEmployee();
    this.headerSideService.hideMenuTransparent();
    this.role = JSON.parse(sessionStorage.getItem('role'));
  }
  createEmployeeForm() {
    this.employeeDetailsForm = this.fb.group({
      _id: [],
      empName: [],
      empNo: [],
      gender: [],
      mobileNumber: [],
      whatsappNo: [],
      email: [],
      dateOfBirth: [],
      designation: [],
      addresss: []
    });
  }
  getAllEmployee() {
    this.employeeService.allEmployee().subscribe(data => {
      this.newCustomer = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }

  getDuplicateEmployee() {
    this.employeeService.duplicateEmployee().subscribe(data => {
      this.newCustomer = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }
  // CRUD start
  cancelEmployee(edit) {
    edit.editing = false;
  }

  updateEmployee(employeeDetailsForm: FormGroup, row) {
    this.employeeService.editEmployee(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  }
  deleteEmployee(employeeDetailsForm: FormGroup, row) {
    row.editing = false;
    employeeDetailsForm.reset();
    this.employeeService.deleteEmployee(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  }
  // CRUD end
  editEmployee(employeeDetailsForm: FormGroup, row) {
    const dialogRef = this.dialog.open(EmployeeEditComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }
}


@Component({
  templateUrl: './employee-edit-component.html'
})
export class EmployeeEditComponent implements OnInit {
  employeeDetailsForm: FormGroup;
  newCustomer: Employee[] = [];
  constructor(private fb: FormBuilder, private employeeService:
    EmployeeService, public dialogRef: MatDialogRef<EmployeeEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee) {
    console.log(data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createEmployeeForm();
  }

  createEmployeeForm() {
    this.employeeDetailsForm = this.fb.group({
      _id: [],
      empName: [],
      empNo: [],
      gender: [],
      mobileNumber: [],
      whatsappNo: [],
      email: [],
      dateOfBirth: [],
      designation: [],
      addresss: []
    });
  }
  updateEmployee(employeeDetailsForm: FormGroup, row) {
    this.employeeService.editEmployee(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}
