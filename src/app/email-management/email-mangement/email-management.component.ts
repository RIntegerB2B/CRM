import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmailSend } from './email.model';
import { Customer } from '../../shared/model/customer.model';
import { EmailService } from '../email.service';


@Component({
  selector: 'app-email-management',
  templateUrl: './email-management.component.html',
  styleUrls: ['./email-management.component.css']
})

export class EmailManagementComponent implements OnInit {
  customerDetailsForm: FormGroup;
  smsCompleted = false;
  emailSend: EmailSend;
  newCustomer: Customer[] = [];
  selectedEamils = [];
  sendEmaillist;
  emailCompleted = false;

  constructor(private fb: FormBuilder, private emailService: EmailService) { }


  ngOnInit() {
    this.createForm();
    this.getAllCustomer();
  }
  createForm() {
    this.customerDetailsForm = this.fb.group({
      _id: [],
      name: [],
      phone: [],
      email: [],
      address: [],
      message: [],
      emailMessage: []
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
  }

  selectedEmail(e, value) {
    if (e.checked) {
      this.selectedEamils.push(value);
    } else {
      const updateItem = this.selectedEamils.find(this.findIndexToUpdate, value);

      const index = this.selectedEamils.indexOf(updateItem);

      this.selectedEamils.splice(index, 1);
    }
    this.sendEmaillist = this.selectedEamils.toString();
    console.log(this.selectedEamils);
    this.customerDetailsForm.controls.email.setValue(this.sendEmaillist);
  }
  findIndexToUpdate(value) {
    return value === this;
  }
}


