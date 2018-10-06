
import { Component, OnInit, Inject } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { Vendor } from './../../shared/model/vendor.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VendorService } from './../vendor.service';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { HeaderSideService } from '../../shared/header-side/header-side.service';
import { AccessPermission } from './../../user-management/permission/accessPermission.model';

@Component({
  selector: 'app-vendor-management',
  templateUrl: './vendor-management.component.html',
  styleUrls: ['./vendor-management.component.css']
})
export class VendorManagementComponent implements OnInit {


  newCustomer: Vendor[] = [];
  role: AccessPermission;
  vendorDetailsForm: FormGroup;
  constructor(private fb: FormBuilder,
    private headerSideService: HeaderSideService,
    private vendorService: VendorService, private dialog: MatDialog) { }
  ngOnInit() {
    this.createVendorForm();
    this.getAllVendor();
    this.headerSideService.hideMenuTransparent();
    this.role = JSON.parse(sessionStorage.getItem('role'));
  }
  createVendorForm() {
    this.vendorDetailsForm = this.fb.group({
      _id: [],
    vendorName: [],
    mobileNumber: [],
    whatsAppNo: [],
    landLine: [],
    email: [],
    vendorService: [],
    address: [],
    vendorCompanyName: [],
    companyAddress: [],
    location: [],
    gstNumber: [],
    vendorGrade: []
    });
  }
  getAllVendor() {
    this.vendorService.allVendor().subscribe(data => {
      this.newCustomer = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }

  getDuplicateVendor() {
    this.vendorService.duplicateVendor().subscribe(data => {
      this.newCustomer = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }
  // CRUD start
  cancelVendor(edit) {
    edit.editing = false;
  }

  updateVendor(vendorDetailsForm: FormGroup, row) {
    this.vendorService.editVendor(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  }
  getDeleteVendor(vendorDetailsForm: FormGroup, row) {
    row.editing = false;
    vendorDetailsForm.reset();
    this.vendorService.deleteVendor(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  }
  // CRUD end
  getEditVendor(vendorDetailsForm: FormGroup, row) {
    const dialogRef = this.dialog.open(VendoorEditComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }
}


@Component({
  templateUrl: './vendor-edit-component.html'
})
export class VendoorEditComponent implements OnInit {
  vendorDetailsForm: FormGroup;
  newCustomer: Vendor[] = [];
  constructor(private fb: FormBuilder, private vendorService:
    VendorService, public dialogRef: MatDialogRef<VendoorEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Vendor) {
    console.log(data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createVendorForm();
  }

  createVendorForm() {
    this.vendorDetailsForm = this.fb.group({
      _id: [],
      vendorName: [],
      mobileNumber: [],
      whatsAppNo: [],
      landLine: [],
      email: [],
      vendorService: [],
      address: [],
      vendorCompanyName: [],
      companyAddress: [],
      location: [],
      gstNumber: [],
      vendorGrade: []
    });
  }
  updateVendor(vendorDetailsForm: FormGroup, row) {
    this.vendorService.editVendor(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}
