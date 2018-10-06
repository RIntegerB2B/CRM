import { Component, OnInit, Inject } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { B2bMarket } from './../../shared/model/b2bmarket.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { B2bmarketService } from './../b2bmarket.service';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { HeaderSideService } from '../../shared/header-side/header-side.service';
import { AccessPermission } from './../../user-management/permission/accessPermission.model';


@Component({
  selector: 'app-b2bmarket-management',
  templateUrl: './b2bmarket-management.component.html',
  styleUrls: ['./b2bmarket-management.component.css']
})

export class B2bmarketManagementComponent implements OnInit {
  newCustomer: B2bMarket[] = [];
  role: AccessPermission;
  b2bMarketDetailsForm: FormGroup;
  constructor(private fb: FormBuilder,
    private headerSideService: HeaderSideService,
    private b2bmarketService: B2bmarketService, private dialog: MatDialog) { }
  ngOnInit() {
    this.createB2bMarketForm();
    this.getAllB2bMarketCustomer();
    this.headerSideService.hideMenuTransparent();
    this.role = JSON.parse(sessionStorage.getItem('role'));
  }
  createB2bMarketForm() {
    this.b2bMarketDetailsForm = this.fb.group({
      _id: [],
      emailMessage: [],
      customerName: [],
      mobileNumber: [],
      whatsAppNo: [],
      landLine: [],
      email: [],
      companyName: [],
      companyAddress: [],
      location: [],
      gst: [],
      customerGrade: [],
      brandName: [],
      message: []
    });
  }
  getAllB2bMarketCustomer() {
    this.b2bmarketService.allB2bMarket().subscribe(data => {
      this.newCustomer = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }

  duplicateB2bMarketCustomer() {
    this.b2bmarketService.duplicateB2bMarket().subscribe(data => {
      this.newCustomer = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }
  // CRUD start
  cancelB2bMarketCustomer(edit) {
    edit.editing = false;
  }

  updateB2bMarketCustomer(b2bMarketDetailsForm: FormGroup, row) {
    this.b2bmarketService.editB2bMarket(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  }
  deleteB2bMarketCustomer(b2bMarketDetailsForm: FormGroup, row) {
    row.editing = false;
    b2bMarketDetailsForm.reset();
    this.b2bmarketService.deleteB2bMarket(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  }
  // CRUD end
  editB2bMarketCustomer(b2bMarketDetailsForm: FormGroup, row) {
    const dialogRef = this.dialog.open(B2bmarketEditComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }
}


@Component({
  templateUrl: './b2bmarket-edit.component.html'
})
export class B2bmarketEditComponent implements OnInit {
  b2bMarketDetailsForm: FormGroup;
  newCustomer: B2bMarket[] = [];
  constructor(private fb: FormBuilder, private b2bmarketService:
    B2bmarketService, public dialogRef: MatDialogRef<B2bmarketEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: B2bMarket) {
    console.log(data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createB2bMarketForm();
  }

  createB2bMarketForm() {
    this.b2bMarketDetailsForm = this.fb.group({
      _id: [],
      emailMessage: [],
      customerName: [],
      mobileNumber: [],
      whatsAppNo: [],
      landLine: [],
      email: [],
      companyName: [],
      companyAddress: [],
      location: [],
      gst: [],
      customerGrade: [],
      brandName: [],
      message: []
    });
  }
  updateB2bMarketCustomer(b2bMarketDetailsForm: FormGroup, row) {
    this.b2bmarketService.editB2bMarket(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}
