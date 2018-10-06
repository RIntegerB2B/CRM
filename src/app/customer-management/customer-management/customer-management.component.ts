
import { Component, OnInit, Inject, AfterContentChecked } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { Customer } from './customer.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerManagementService } from './../customer-management.service';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import {CustomerEditComponent  } from './../customer-management/customer-edit/customer-edit.component';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MobileSend } from './mobile-send.model';
import { EmailSend } from './email-send.model';
import { HeaderSideService } from '../../shared/header-side/header-side.service';
import { AccessPermission } from './../../user-management/permission/accessPermission.model';



@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.css']
})

export class CustomerManagementComponent implements OnInit, AfterContentChecked {
  arrayBuffer: any;
  file: File;
  customerDetailsForm: FormGroup;
  customers;
  newCustomer: Customer[] = [];
  mobileSend: MobileSend;
  emailSend: EmailSend;
  selectedEamils = [];
  sendMobileNumber;
  sendEmaillist;
  whatsappShareUrl: string;
  facebookPostUrl: string;
  // customerMobileNumbers = [{ 'mobile': 9965437973 }, { 'mobile': 7418964254 }, { 'mobile': 8325446523 }];
  mobileNumbers;
  selectedMobileNumbers = [];
  smsCompleted = false;
  emailCompleted = false;
  message: any;
  role: AccessPermission;
  constructor(private fb: FormBuilder,
    private customerManagementService: CustomerManagementService
    , private http: HttpClient, private dialog: MatDialog,
    private headerSideService: HeaderSideService
    ) { }

  ngOnInit() {
    this.createForm();
    this.getAllCustomer();
    this.headerSideService.hideMenuTransparent();
    this.role = JSON.parse(sessionStorage.getItem('role'));
  }
  ngAfterContentChecked() {
    this.headerSideService.currentRegister.subscribe(message => this.message = message);
    console.log(this.message.userType);
  }

  createForm() {
    this.customerDetailsForm = this.fb.group({
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
  // CRUD start
  cancel(edit) {
    edit.editing = false;
  }

  update(customerDetailsForm: FormGroup, row) {
    this.customerManagementService.editCustomer(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  }
  delete(customerDetailsForm: FormGroup, row) {
    row.editing = false;
    customerDetailsForm.reset();
    this.customerManagementService.deleteCustomer(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  }
  // CRUD end
  editCustomer(customerDetailsForm: FormGroup, row) {
    const dialogRef = this.dialog.open(CustomerEditComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }

  uploadingfile(event) {
    this.file = event.target.files[0];
  }
  shareWhatsapp() {

    this.whatsappShareUrl = 'https://api.whatsapp.com/send?phones=91'
      + 9845263436 + '&text=welcome%20to%20CRM%20'
      + 'http://ec2-13-126-16-163.ap-south-1.compute.amazonaws.com:3021/';

    window.location.href = this.whatsappShareUrl;

  }
  postFacebook() {
    this.facebookPostUrl =
      'https://www.facebook.com/login.php?skip_api_login=1&api_key=966242223397117&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fsharer%2Fsharer.php%3Fu%3Dhttps%253A%252F%252Frinteger.com%252F%26amp%253Bsrc%3Dsdkpreparse&cancel_url=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Fclose_window%2F%3Fapp_id%3D966242223397117%26connect%3D0%23_%3D_&display=popup&locale=en_GB';
    window.location.href = this.facebookPostUrl;
  }

  getAllCustomer() {
    this.customerManagementService.allCustomer().subscribe(data => {
      this.newCustomer = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }
  // duplicate customer data find
  duplicateCustomerData() {
    this.customerManagementService.duplicateCustomer().subscribe(data => {
      this.newCustomer = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }

  selectedMobileNumber(value) {
    const indexOfEntry = this.selectedMobileNumbers.indexOf(value);
    if (indexOfEntry < 0) {
      this.selectedMobileNumbers.push(value);
    } else {
      this.selectedMobileNumbers.splice(indexOfEntry, 1);
    }
    this.sendEmaillist = this.selectedMobileNumbers.toString();
    console.log(this.selectedMobileNumbers);
    this.customerDetailsForm.controls.mobileNumber.setValue(this.sendEmaillist);
  }
  // send message  to mobile//
  selectedEmail(value) {
    const indexOfEntry = this.selectedEamils.indexOf(value);
    if (indexOfEntry < 0) {
      this.selectedEamils.push(value);
    } else {
      this.selectedEamils.splice(indexOfEntry, 1);
    }
    this.sendMobileNumber = this.selectedEamils.join(', ');
    console.log(this.selectedEamils);
    this.customerDetailsForm.controls.email.setValue(this.sendMobileNumber);
  }

  toggleSelect = function (event) {

    this.allneighbourhoods = event.target.checked;
    this.neighbourhoods.forEach(function (item) {
      console.log(item);
      item.selected = event.target.checked;
    });
  };
}

@Component({
  templateUrl: './customer-edit.component.html'
})
export class CustomerEditComponent implements OnInit {
  customerDetailsForm: FormGroup;
  newCustomer: Customer[] = [];
  constructor(private fb: FormBuilder, private customerManagementService:
    CustomerManagementService, public dialogRef: MatDialogRef<CustomerEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer) {
    console.log(data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.customerDetailsForm = this.fb.group({
      _id: [],
      customerName: [],
      mobileNumber: [],
      whatsAppNo: [],
      Landline: [],
      email: [],
      companyName: [],
      companyAddress: [],
      location: [],
      gst: [],
      customerGrade: [],
      brandName: []
    });
  }
  update(customerDetailsForm: FormGroup, row) {
    this.customerManagementService.editCustomer(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}
