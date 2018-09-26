import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MobileSend } from './sms-model';
/* import { Customer } from './../../shared/model/customer.model'; */
import { B2cMarket } from './../../shared/model/b2cmarket.model';
import { SmsService } from './../sms.service';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PageEvent } from '@angular/material';


@Component({
  selector: 'app-sms-management',
  templateUrl: './sms-management.component.html',
  styleUrls: ['./sms-management.component.css']
})
export class SmsManagementComponent implements OnInit, DoCheck {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  b2cMarketDetailsForm: FormGroup;
  smsCompleted = false;
  mobileSend: MobileSend;
  newCustomer: B2cMarket[] = [];
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
  // pageEvent: PageEvent;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public searchString: string;

  constructor(private fb: FormBuilder, private smsService: SmsService) {
  }


  ngOnInit() {
    this.createB2cMarketForm() ;
    this.getAllB2cMarketCustomer();
    this.getArray();
    // this.columns = this.smsService.allCustomer();
    // this.rows = this.temp = this.getAllCustomer();
  }
  ngDoCheck() {
    this.temp = this.newCustomer;
    console.log(this.temp);
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
      location: [],
      message: ['', Validators.minLength(3)],
      messageTemplates: [],
      pagedItems: []
    });
  }
  getAllB2cMarketCustomer() {
    this.smsService.allB2cMarket().subscribe(data => {
      this.newCustomer = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }

  /* createForm() {
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
  getAllCustomer() {
    this.smsService.allCustomer().subscribe(data => {
      this.newCustomer = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  } */
  handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  getArray() {
    this.smsService.allB2cMarket()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<Element>(response);
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.totalSize = this.array.length;
        this.iterator();
      });
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
    /* selectedMobileNumber(value) {
      const indexOfEntry = this.selectedMobileNumbers.indexOf(value);
        if (indexOfEntry < 0) {
          this.selectedMobileNumbers.push(value);
        } else {
          this.selectedMobileNumbers.splice(indexOfEntry, 1);
        }
        this.sendMobileNumber = this.selectedMobileNumbers.toString();
        console.log(this.selectedMobileNumbers);
        this.customerDetailsForm.controls.phone.setValue(this.sendMobileNumber);
      } */
    selectedMobileNumber(e, value) {
      if (e.checked) {
        this.selectedMobileNumbers.push(value);
      } else {
        const updateItem = this.selectedMobileNumbers.find(this.findIndexToUpdate, value);

        const index = this.selectedMobileNumbers.indexOf(updateItem);

        this.selectedMobileNumbers.splice(index, 1);
      }
      this.sendMobileNumber = this.selectedMobileNumbers.toString();
      this.b2cMarketDetailsForm.controls.mobileNumber.setValue(this.sendMobileNumber);
    }
    findIndexToUpdate(value) {
      return value === this;
    }
    selectAllMobileNumber(e, value) {
      this.selectCheckbox = !this.selectCheckbox;
      value.map(element => {
        this.selectedMobileNumber(e, element.mobileNumber);
      }
      );
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
