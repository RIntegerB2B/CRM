import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MobileSend } from './sms-model';
/* import { Customer } from './../../shared/model/customer.model'; */
import { B2cMarket } from './../../shared/model/b2cmarket.model';
import { SmsService } from './../sms.service';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PageEvent } from '@angular/material';
import { HeaderSideService } from '../../shared/header-side/header-side.service';
import { AccessPermission } from './../../user-management/permission/accessPermission.model';

@Component({
  selector: 'app-sms-management',
  templateUrl: './sms-management.component.html',
  styleUrls: ['./sms-management.component.css']
})
export class SmsManagementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  b2cMarketDetailsForm: FormGroup;
  customerDetailsForm: FormGroup;
  smsCompleted = false;
  mobileSend: MobileSend;
  newCustomer: any;
  selectedMobileNumbers = [];
  sendMobileNumber;
  selectCheckbox = false;
  selectTemplate: boolean;
  mobiles;
  showMobileNumber = false;
  showMessage = false;
  messageTemplates = ['Happy New Year', 'Happy Diwali', 'Thanks for purchase', 'Welcome to UCCHAL'];
  messages = [];
  // array of all items to be paged
  array: any;
  displayedColumns = ['', '', '', '', ''];
  dataSource: any = [];
  rows: any = [];
  columns: any = [];
  temp: any = [];
  role: AccessPermission;
  // pageEvent: PageEvent;
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public searchString: string;

  constructor(private fb: FormBuilder, private smsService: SmsService, private headerSideService: HeaderSideService) {
  }


  ngOnInit() {
    this.createB2cMarketForm();
    this.headerSideService.hideMenuTransparent();
    this.role = JSON.parse(sessionStorage.getItem('role'));
  }
 /*  ngDoCheck() {
    console.log(this.temp);
  } */
// b2c market Form//
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
      location: [],
      message: ['', Validators.minLength(3)],
      messageTemplates: [],
      pagedItems: []
    });
  }
// b2b customer Form//
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
      message: ['', Validators.minLength(3)],
      messageTemplates: [],
      pagedItems: []
    });
  }
  // get B2B Customer //

    getAllB2bCustomer() {
    this.smsService.allCustomer()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<Element>(response);
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.newCustomer = response;
        this.totalSize = this.array.length;
        this.iterator();
      });
      this.temp = this.dataSource;
  }
  // get B2C Market //
  getAllB2cMarketCustomer() {
    this.smsService.allB2cMarket()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<Element>(response);
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.totalSize = this.array.length;
        this.newCustomer = response;
        this.iterator();
        this.updateFilter(event);
      });
  }

  handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
    console.log(this.dataSource);
  }

  sendSms(b2cMarketDetailsForm: FormGroup) {
    if (b2cMarketDetailsForm.controls.mobileNumber.value === null) {
      this.showMobileNumber = true;
      this.showMessage = false;
    } else {
      if (b2cMarketDetailsForm.controls.message.value === '') {
        this.showMessage = true;
        this.showMobileNumber = false;
      } else {
        this.mobileSend = new MobileSend(
          b2cMarketDetailsForm.controls.mobileNumber.value,
          b2cMarketDetailsForm.controls.message.value
        );
        this.smsService.mobileMessage(this.mobileSend).subscribe(data => {
          if (data.result = 1) {
            this.smsCompleted = true;
          }
          console.log(data);
        }, error => {
          console.log(error);
        });
      }
    }
  }
  selectedMobileNumber(e, mobileData) {
    if (e.checked) {
      if (mobileData.length > 10) {
        const lengthOf = mobileData.length - 10;
        const newValue = mobileData.substr(lengthOf);
        console.log(newValue);
        this.selectedMobileNumbers.push(newValue);
      } else {
        this.selectedMobileNumbers.push(mobileData);
      }
    } else {
      const updateItem = this.selectedMobileNumbers.find(this.findIndexToUpdate, mobileData);

      const index = this.selectedMobileNumbers.indexOf(updateItem);

      this.selectedMobileNumbers.splice(index, 1);
    }
    this.sendMobileNumber = this.selectedMobileNumbers.toString();
    this.b2cMarketDetailsForm.controls.mobileNumber.setValue(this.sendMobileNumber);
    console.log(this.selectedMobileNumbers);
  }
  findIndexToUpdate(mobileData) {
    return mobileData === this;
  }
  selectAllMobileNumber(e, mobileData) {
    this.selectCheckbox = !this.selectCheckbox;
    mobileData.map(element => element.mobileNumber);
    this.selectedMobileNumber(e, mobileData);
  }
  setNameValue(e, template) {
    if (e.checked === true) {
      this.b2cMarketDetailsForm.controls.message.setValue(template);
    } else {
      this.b2cMarketDetailsForm.controls.message.reset();
    }
  }
  updateFilter(event) {
    // this.showData = true;
    const val = event.target.value.toLowerCase();
    /* if (this.dataSource.length !== 0) { */
    const filterCustomer = Object.keys(this.temp[0]);
    // Removes last "$$index" from "column"
    filterCustomer.splice(filterCustomer.length - 1);

    console.log(filterCustomer);
    if (!filterCustomer.length) {
      return;
    }
    const rows = this.temp.filter(function (d) {
      for (let i = 0; i <= filterCustomer.length; i++) {
        const column = filterCustomer[i];
        console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.dataSource = rows;
  }
}
