import { Component, OnInit, Inject } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { B2cCustomer } from './../../shared/model/b2ccustomer.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { B2ccustomerService } from './../b2ccustomer.service';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { CustomerEditComponent } from './../../customer-management/customer-management/customer-management.component';
import { HeaderSideService } from '../../shared/header-side/header-side.service';
import { AccessPermission } from './../../user-management/permission/accessPermission.model';


@Component({
  selector: 'app-b2ccustomer-management',
  templateUrl: './b2ccustomer-management.component.html',
  styleUrls: ['./b2ccustomer-management.component.css']
})
export class B2ccustomerManagementComponent implements OnInit {

  newCustomer: B2cCustomer[] = [];
  role: AccessPermission;
  b2cCustomerDetailsForm: FormGroup;
  constructor(private fb: FormBuilder,
    private headerSideService: HeaderSideService,
    private b2ccustomerService: B2ccustomerService, private dialog: MatDialog) { }
  ngOnInit() {
    this.createB2cCustomerForm();
    this.getAllB2cCustomer();
    this.headerSideService.hideMenuTransparent();
    this.role = JSON.parse(sessionStorage.getItem('role'));
  }
  createB2cCustomerForm() {
    this.b2cCustomerDetailsForm = this.fb.group({
      _id: [],
      customerName: [],
      gender: [],
      mobileNumber: [],
      email: [],
      dateOfBirth: [],
      nationality: [],
      categoryType: [],
      customerGrade: [],
      designation: [],
      location: []
    });
  }
  getAllB2cCustomer() {
    this.b2ccustomerService.allB2cCustomer().subscribe(data => {
      this.newCustomer = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }

  getDuplicateB2cCustomer() {
    this.b2ccustomerService.duplicateB2cCustomer().subscribe(data => {
      this.newCustomer = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }
  // CRUD start
  cancelB2cCustomer(edit) {
    edit.editing = false;
  }

  updateB2cCustomer(b2cCustomerDetailsForm: FormGroup, row) {
    this.b2ccustomerService.editB2cCustomer(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  }
  getDeleteB2cCustomer(b2cCustomerDetailsForm: FormGroup, row) {
    row.editing = false;
    b2cCustomerDetailsForm.reset();
    this.b2ccustomerService.deleteB2cCustomer(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  }
  // CRUD end
  getEditB2cCustomer(b2cCustomerDetailsForm: FormGroup, row) {
    const dialogRef = this.dialog.open(B2ccustomerEditComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }
}


@Component({
  templateUrl: './b2ccustomer-edit.component.html'
})
export class B2ccustomerEditComponent implements OnInit {
  b2cCustomerDetailsForm: FormGroup;
  newCustomer: B2cCustomer[] = [];
  constructor(private fb: FormBuilder, private b2ccustomerService:
    B2ccustomerService, public dialogRef: MatDialogRef<B2ccustomerEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: B2cCustomer) {
    console.log(data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createB2cMarketForm();
  }

  createB2cMarketForm() {
    this.b2cCustomerDetailsForm = this.fb.group({
      _id: [],
      customerName: [],
      gender: [],
      mobileNumber: [],
      email: [],
      dateOfBirth: [],
      nationality: [],
      categoryType: [],
      customerGrade: [],
      designation: [],
      location: []
    });
  }
  updateB2cCustomer(b2cCustomerDetailsForm: FormGroup, row) {
    this.b2ccustomerService.editB2cCustomer(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}

