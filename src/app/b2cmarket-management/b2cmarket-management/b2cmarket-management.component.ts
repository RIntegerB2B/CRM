import { Component, OnInit, Inject } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { B2cMarket } from './../../shared/model/b2cmarket.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { B2cmarketService } from './../b2cmarket.service';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomerEditComponent } from './../../customer-management/customer-management/customer-management.component';

@Component({
  selector: 'app-b2cmarket-management',
  templateUrl: './b2cmarket-management.component.html',
  styleUrls: ['./b2cmarket-management.component.css']
})
export class B2cmarketManagementComponent implements OnInit {
  newCustomer: B2cMarket[] = [];
  b2cMarketDetailsForm: FormGroup;
  constructor(private fb: FormBuilder,
    private b2cmarketService: B2cmarketService, private dialog: MatDialog) { }
  ngOnInit() {
    this.createB2cMarketForm();
    this.getAllB2cMarketCustomer();
  }
  createB2cMarketForm() {
    this.b2cMarketDetailsForm = this.fb.group({
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
  getAllB2cMarketCustomer() {
    this.b2cmarketService.allB2cMarket().subscribe(data => {
      this.newCustomer = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }

  duplicateB2cMarketCustomer() {
    this.b2cmarketService.duplicateB2cMarket().subscribe(data => {
      this.newCustomer = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }
  // CRUD start
  cancelB2cMarketCustomer(edit) {
    edit.editing = false;
  }

  updateB2cMarketCustomer(b2cMarketDetailsForm: FormGroup, row) {
    this.b2cmarketService.editB2cMarket(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  }
  deleteB2cMarketCustomer(b2cMarketDetailsForm: FormGroup, row) {
    row.editing = false;
    b2cMarketDetailsForm.reset();
    this.b2cmarketService.deleteB2cMarket(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  }
  // CRUD end
  editB2cMarketCustomer(b2cMarketDetailsForm: FormGroup, row) {
    const dialogRef = this.dialog.open(B2cmarketEditComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }
}


@Component({
  templateUrl: './b2cmarket-edit.component.html'
})
export class B2cmarketEditComponent implements OnInit {
  b2cMarketDetailsForm: FormGroup;
  newCustomer: B2cMarket[] = [];
  constructor(private fb: FormBuilder, private b2cmarketService:
    B2cmarketService, public dialogRef: MatDialogRef<B2cmarketEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: B2cMarket) {
    console.log(data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createB2cMarketForm();
  }

  createB2cMarketForm() {
    this.b2cMarketDetailsForm = this.fb.group({
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
  updateB2cMarketCustomer(b2cMarketDetailsForm: FormGroup, row) {
    this.b2cmarketService.editB2cMarket(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}
