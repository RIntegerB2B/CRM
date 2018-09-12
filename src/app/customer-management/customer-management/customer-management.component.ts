
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { Customer } from './customer.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerManagementService } from './../customer-management.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MobileSend } from './mobile-send.model';
import { EmailSend } from './email-send.model';




@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.css']
})

export class CustomerManagementComponent implements OnInit {
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
  constructor(private fb: FormBuilder,
    private customerManagementService: CustomerManagementService
    , private http: HttpClient) { }

  ngOnInit() {
    this.createForm();
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
  // CRUD start
  editCustomer(edit) {
    edit.editing = true;
  }
  cancel(edit) {
    edit.editing = false;
  }

  update(customerDetailsForm: FormGroup, edit) {
    this.customerManagementService.editCustomer(edit).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  }
  delete(customerDetailsForm: FormGroup, edit) {
    edit.editing = false;
    customerDetailsForm.reset();
    this.customerManagementService.deleteCustomer(edit).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  }
  // CRUD end

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

  Upload() {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      this.customers = XLSX.utils.sheet_to_json(worksheet);
      this.customerManagementService.createCustomer(this.customers)
        .subscribe(detail => {
          this.newCustomer = detail;
          console.log(detail);
        });
    };
    fileReader.readAsArrayBuffer(this.file);
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
    this.customerDetailsForm.controls.phone.setValue(this.sendEmaillist);
  }
  // send message  to mobile//
  sendSms(customerDetailsForm: FormGroup) {
    this.mobileSend = new MobileSend(
      customerDetailsForm.controls.phone.value,
      customerDetailsForm.controls.message.value
    );
    this.customerManagementService.mobileMessage(this.mobileSend).subscribe(data => {
      if (data.result = 1) {
        this.smsCompleted = true;
      }
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  // send message  to Email //
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


  sendEmail(customerDetailsForm: FormGroup) {
    this.emailSend = new EmailSend(
      customerDetailsForm.controls.email.value,
      customerDetailsForm.controls.emailMessage.value
    );
    this.customerManagementService.emailMessage(this.emailSend).subscribe(data => {
      if (data.result = 1) {
        this.emailCompleted = true;
      }
    }, error => {
      console.log(error);
    });
  }


  toggleSelect = function (event) {

    this.allneighbourhoods = event.target.checked;
    this.neighbourhoods.forEach(function (item) {
      console.log(item);
      item.selected = event.target.checked;
    });
  };
  /*   ApplyFilters(isValid: boolean) {
      const datas = this.neighbourhoods.filter(function (data) { return data.selected === true });
      console.log(datas);
      if (!isValid) return;
    } */
}

