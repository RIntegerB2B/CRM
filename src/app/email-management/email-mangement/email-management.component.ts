import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';
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
  b2cMarketDetailsForm: FormGroup;
  customerDetailsForm: FormGroup;
  smsCompleted = false;
  emailSend: EmailSend;
  newCustomer: Customer[] = [];
  selectedEmails = [];
  sendEmaillist;
  emailCompleted = false;
  selectCheckbox = false;
  allValue;
  htmlTemplate: any;
  subTitle: any;
  titleName: any;
  emailMessage: any;
  array: any;
  displayedColumns = ['', '', '', '', ''];
  dataSource: any = [];
  role: AccessPermission;

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public searchString: string;


  constructor(private fb: FormBuilder,
     private emailService: EmailService,
     private headerSideService: HeaderSideService
     ) { }

  ngOnInit() {
    this.createB2cMarketForm();
   //    this.getAllB2cMarketCustomer();
    // this.getArray();
    console.log(this.content.nativeElement.innerHTML);
    this.role = JSON.parse(sessionStorage.getItem('role'));
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
       message: [],
       titleName: [],
       subTitle: [],
     });
   }
   getAllCustomer() {
     this.emailService.allCustomer().subscribe(data => {
       this.dataSource = data;
       console.log(this.newCustomer);
       this.getArrayCustomer();
     }, error => {
       console.log(error);
     });
   }
   getArrayCustomer() {
    this.emailService.allCustomer()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<Element>(response);
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.totalSize = this.array.length;
        this.iterator();
      });
  }

  createB2cMarketForm() {
    this.b2cMarketDetailsForm = this.fb.group({
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
      titleName: [],
      subTitle: [],
    });
  }
  getAllB2cMarketCustomer() {
    this.emailService.allB2cMarket().subscribe(data => {
      this.dataSource = data;
      this.getArray();
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }
  handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  getArray() {
    this.emailService.allB2cMarket()
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


  sendEmail(b2cMarketDetailsForm: FormGroup) {
    /*  this.htmlTemplate = this.content.nativeElement.innerHTML;
     */
    this.htmlTemplate = this.content.nativeElement.innerHTML;
    this.b2cMarketDetailsForm.controls.emailMessage.setValue(this.htmlTemplate);
    this.emailSend = new EmailSend(
      b2cMarketDetailsForm.controls.email.value,
      b2cMarketDetailsForm.controls.emailMessage.value
    );
    this.emailService.emailSender(this.emailSend).subscribe(data => {
      if (data.result = 1) {
        this.emailCompleted = true;
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
    this.sendEmaillist = this.selectedEmails.toString();
    this.b2cMarketDetailsForm.controls.email.setValue(this.sendEmaillist);
  }
  findIndexToUpdate(value) {
    return value === this;
  }
  selectedTemplate(e) {
    if (e.checked === true) {
      this.htmlTemplate = this.content.nativeElement.innerHTML;
      this.b2cMarketDetailsForm.controls.emailMessage.setValue(this.htmlTemplate);
      console.log(this.htmlTemplate);
    } else {
      this.b2cMarketDetailsForm.controls.emailMessage.reset();
    }
  }
  selectEmailAll(e, value) {
    this.selectCheckbox = !this.selectCheckbox;
    value.forEach(element => {
      this.selectedEmail(e, element.email);
    }
    );
  }
}


