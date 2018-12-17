import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { EmailSend } from './email.model';
import { Customer } from '../../shared/model/customer.model';
import { EmailService } from '../email.service';
import { PageEvent } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HeaderSideService } from '../../shared/header-side/header-side.service';
import { AccessPermission } from './../../user-management/permission/accessPermission.model';



@Component({
  selector: 'app-email-management',
  templateUrl: './email-management.component.html',
  styleUrls: ['./email-management.component.css']
})

export class EmailManagementComponent implements OnInit {
  @ViewChild('contentWrapper') content: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  messageTemplates = ['First Template'];
  selectedEmails = [];
  sendEmaillist;
  selectCheckbox = false;
  customerDetailsForm: FormGroup;
  htmlTemplate: any;
  subDescription: any;
  titleName: any;
  textHeader;
  textTemplate;
  isExpanded = true;
  showSubmenu = false;
  showInterNational = false;
  isShowing = false;
  emailMessage: any;
  newCustomer: any;
  array: any;
  displayedColumns = ['', '', '', '', ''];
  dataSource: any = [];
  rows: any = [];
  columns: any = [];
  emailSend: EmailSend;
  temp: any = [];
  smsStatus: any = [];
  selectOneTemplate = false;
  selectSecondTemplate = false;
  role: AccessPermission;
  nationalDatabse = [{ 'type': 'B2B CUSTOMER DB' },
  { 'type': 'B2B MARKET DB' }, { 'type': 'B2C CUSTOMER DB' }, { 'type': 'B2C MARKET DB' },
  { 'type': 'EMPLOYEE DB' }, { 'type': 'VENDOR DB' }, { 'type': 'AGENT DB' },
  { 'type': 'OTHERS DB' }];
  interNationalDatabse = [{ 'type': 'B2B CUSTOMER DB' },
  { 'type': 'B2B MARKET DB' }, { 'type': 'B2C CUSTOMER DB' }, { 'type': 'B2C MARKET DB' }];
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public searchString: string;
  showEmailMessage = false;



  constructor(private fb: FormBuilder,
    private emailService: EmailService,
    private headerSideService: HeaderSideService
  ) { }

  ngOnInit() {
    this.createForm();
    this.role = JSON.parse(sessionStorage.getItem('role'));
  }
  createForm() {
    this.customerDetailsForm = this.fb.group({
      _id: [],
      emailMessage: [],
      customerName: [],
      gender: [],
      mobileNumber: [],
      email: [],
      dateOfBirth: [],
      nationality: [],
      categoryType: [],
      designation: [],
      location: [],
      message: [],
      subjectTitle: [],
      subjectBody: [],
      subjectSecondBody: [],
      subjectImage: [],
      subjectFooter: []
    });
  }
  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }
  getImage() {
    this.textTemplate = 'Image';
    this.selectOneTemplate = false;
    this.selectSecondTemplate = true;
    this.customerDetailsForm.reset();
  }
  getText() {
    this.textTemplate = 'Template';
    this.selectOneTemplate = true;
    this.selectSecondTemplate = false;
    this.customerDetailsForm.reset();
  }
  // get B2B Customer //
  getAllB2bCustomer() {
    this.textHeader = this.nationalDatabse[0].type;
    this.emailService.allB2bCustomer()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<Element>(response);
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.newCustomer = response;
        this.totalSize = this.array.length;
        this.temp = response;
        this.iterator();
      }, error => {
        console.log(error);
      });
  }
  getAllB2bMarket() {
    this.textHeader = this.nationalDatabse[1].type;
    this.emailService.allB2bMarket()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<Element>(response);
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.newCustomer = response;
        this.totalSize = this.array.length;
        this.temp = response;
        this.iterator();
      }, error => {
        console.log(error);
      });
  }
  getAllB2cCustomer() {
    this.textHeader = this.nationalDatabse[2].type;
    this.emailService.allB2cCustomer()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<Element>(response);
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.newCustomer = response;
        this.totalSize = this.array.length;
        this.temp = response;
        this.iterator();
      }, error => {
        console.log(error);
      });
  }
  // get B2C Market //
  getAllB2cMarket() {
    this.textHeader = this.nationalDatabse[3].type;
    this.emailService.allB2cMarket()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<Element>(response);
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.totalSize = this.array.length;
        this.newCustomer = response;
        this.temp = response;
        this.iterator();
      }, error => {
        console.log(error);
      });
  }
  getAllEmployee() {
    this.textHeader = this.nationalDatabse[4].type;
    this.emailService.allEmployee()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<Element>(response);
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.totalSize = this.array.length;
        this.newCustomer = response;
        this.temp = response;
        this.iterator();
      }, error => {
        console.log(error);
      });
  }
  getAllVendor() {
    this.textHeader = this.nationalDatabse[5].type;
    this.emailService.allVendor()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<Element>(response);
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.totalSize = this.array.length;
        this.newCustomer = response;
        this.temp = response;
        this.iterator();
      }, error => {
        console.log(error);
      });
  }
  getAllAgent() {
    this.textHeader = this.nationalDatabse[6].type;
    this.emailService.allAgent()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<Element>(response);
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.totalSize = this.array.length;
        this.newCustomer = response;
        this.temp = response;
        this.iterator();
      }, error => {
        console.log(error);
      });
  }
  getAllOthers() {
    this.textHeader = this.nationalDatabse[7].type;
    this.emailService.allOthers()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<Element>(response);
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.totalSize = this.array.length;
        this.newCustomer = response;
        this.temp = response;
        this.iterator();
      }, error => {
        console.log(error);
      });
  }
  getAllInterB2bcustomer() {
    this.textHeader = 'INTERNATIONAL B2B CUSTOMER';
    this.emailService.allInterB2bcustomer()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<Element>(response);
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.totalSize = this.array.length;
        this.newCustomer = response;
        this.temp = response;
        this.iterator();
      }, error => {
        console.log(error);
      });
  }
  getAllInterB2bMarket() {
    this.textHeader = 'INTERNATIONAL B2B MARKET';
    this.emailService.allInterB2bMarket()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<Element>(response);
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.totalSize = this.array.length;
        this.newCustomer = response;
        this.temp = response;
        this.iterator();
      }, error => {
        console.log(error);
      });
  }
  getAllInterB2cCustomer() {
    this.textHeader = 'INTERNATIONAL B2C CUSTOMER';
    this.emailService.allInterB2cCustomer()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<Element>(response);
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.totalSize = this.array.length;
        this.newCustomer = response;
        this.temp = response;
        this.iterator();
      }, error => {
        console.log(error);
      });
  }
  getAllInterB2cMarket() {
    this.textHeader = 'INTERNATIONAL B2C MARKET';
    this.emailService.allInterB2cMarket()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<Element>(response);
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.totalSize = this.array.length;
        this.newCustomer = response;
        this.temp = response;
        this.iterator();
      }, error => {
        console.log(error);
      });
  }
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }
  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
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

  sendEmail(customerDetailsForm: FormGroup) {
    this.sendEmaillist = this.selectedEmails.toString();
    this.customerDetailsForm.controls.email.setValue(this.sendEmaillist);
    console.log(this.selectedEmails);
    this.htmlTemplate = this.content.nativeElement.innerHTML;
    this.customerDetailsForm.controls.emailMessage.setValue(this.htmlTemplate);
    this.emailSend = new EmailSend(
      customerDetailsForm.controls.email.value,
      customerDetailsForm.controls.emailMessage.value,
      customerDetailsForm.controls.subjectTitle.value
    );
    this.emailService.emailSender(this.emailSend).subscribe(data => {
      console.log(data);
      if (data.result = 1) {
        this.showEmailMessage = true;
      } else {
        this.showEmailMessage = false;
      }
    }, error => {
      console.log(error);
    });
    console.log(this.selectedEmails);
  }

  selectedEmail(e, value) {
    if (e.checked) {
      this.selectedEmails.push(value);
    } else {
      const updateItem = this.selectedEmails.find(this.findIndexToUpdate, value);

      const index = this.selectedEmails.indexOf(updateItem);

      this.selectedEmails.splice(index, 1);
    }
    console.log(this.selectedEmails);
  }
  findIndexToUpdate(value) {
    return value === this;
  }
  selectedTemplate(e) {
    if (e.checked === true) {
      this.htmlTemplate = this.content.nativeElement.innerHTML;
      this.customerDetailsForm.controls.emailMessage.setValue(this.htmlTemplate);
      console.log(this.htmlTemplate);
    } else {
      this.customerDetailsForm.controls.emailMessage.reset();
    }
  }
  selectEmailAll(e, dataSource) {
    this.selectCheckbox = !this.selectCheckbox;
    dataSource.forEach(element => {
      this.selectedEmail(e, element.email);
    });
  }

  updateFilter(event) {
    // this.showData = true;
    const val = event.target.value.toLowerCase();
    /* if (this.dataSource.length !== 0) { */
    const filterCustomer = Object.keys(this.temp[0]);
    // Removes last "$$index" from "column"
    filterCustomer.splice(filterCustomer.length - 1);
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


