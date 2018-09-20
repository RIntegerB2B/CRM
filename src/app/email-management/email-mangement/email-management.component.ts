import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { EmailSend } from './email.model';
import { Customer } from '../../shared/model/customer.model';
import { EmailService } from '../email.service';
import {PageEvent} from '@angular/material';


@Component({
  selector: 'app-email-management',
  templateUrl: './email-management.component.html',
  styleUrls: ['./email-management.component.css']
})



export class EmailManagementComponent implements OnInit {
  @ViewChild('contentWrapper') content: ElementRef;
  messageTemplates = ['First Template'];
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



  constructor(private fb: FormBuilder, private emailService: EmailService) { }

  ngOnInit() {
    this.createForm();
    this.getAllCustomer();
    console.log(this.content.nativeElement.innerHTML);
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
      this.newCustomer = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }


  sendEmail(customerDetailsForm: FormGroup) {
   /*  this.htmlTemplate = this.content.nativeElement.innerHTML;
    */
   this.htmlTemplate = this.content.nativeElement.innerHTML;
   this.customerDetailsForm.controls.emailMessage.setValue(this.htmlTemplate);
    this.emailSend = new EmailSend(
      customerDetailsForm.controls.email.value,
      customerDetailsForm.controls.emailMessage.value
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
    this.customerDetailsForm.controls.email.setValue(this.sendEmaillist);
  }
  findIndexToUpdate(value) {
    return value === this;
  }
  selectedTemplate(e) {
    if (e.checked === true) {
      this.htmlTemplate = this.content.nativeElement.innerHTML;
      this.customerDetailsForm.controls.emailMessage.setValue(this.htmlTemplate);
      console.log(this.htmlTemplate);
  }    else {
      this.customerDetailsForm.controls.emailMessage.reset();
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


