import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MobileSend } from './sms-model';
import { Customer } from './../../shared/model/customer.model';
import { SmsService } from './../sms.service';
import { Template } from '@angular/compiler/src/render3/r3_ast';



@Component({
  selector: 'app-sms-management',
  templateUrl: './sms-management.component.html',
  styleUrls: ['./sms-management.component.css']
})

export class SmsManagementComponent implements OnInit {
  customerDetailsForm: FormGroup;
  smsCompleted = false;
  mobileSend: MobileSend;
  newCustomer: Customer[] = [];
  selectedMobileNumbers = [];
  sendMobileNumber;
  selectCheckbox = false;
  mobiles;
  defaultTemplates: [{template: 'Happy New Year'}, {template: 'Happy Diwali'} ];
  messages = [];

  constructor(private fb: FormBuilder, private smsService: SmsService) { }


  ngOnInit() {
    this.createForm();
    this.getAllCustomer();
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
  getAllCustomer() {
    this.smsService.allCustomer().subscribe(data => {
      this.newCustomer = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }

  sendSms(customerDetailsForm: FormGroup) {
    this.mobileSend = new MobileSend(
      customerDetailsForm.controls.mobileNumber.value,
      customerDetailsForm.controls.message.value
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
    this.customerDetailsForm.controls.mobileNumber.setValue(this.sendMobileNumber);
  }
  findIndexToUpdate(value) {
    return value === this;
  }
  selectAllMobileNumber(e, value) {
    this.selectCheckbox = !this.selectCheckbox;
    value.forEach(element => {
      this.selectedMobileNumber(e, element.mobileNumber);
    }
    );
  }
  setNameValue(templateValue) {
    this.customerDetailsForm.controls.message.setValue(templateValue);
}
}


