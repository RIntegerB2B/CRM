
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { Customer } from './customer.model';
import { CustomerManagementService } from './../customer-management.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.css']
})

export class CustomerManagementComponent implements OnInit {
  arrayBuffer: any;
  file: File;
  customers;
  newCustomer: Customer[] = [];
  whatsappShareUrl: string;
  facebookPostUrl: string;
  customerMobileNumbers = [{ 'mobile': 9965437973 }, { 'mobile': 7418964254 }, { 'mobile': 8325446523 }];
  selectedMobileNumbers = [];
  mobiles = [{ 'mobile': 9965437973 }, { 'mobile': 7418964254 }];
  number = ['9965437973'];

  constructor(
    private customerManagementService: CustomerManagementService
    , private http: HttpClient) { }

  ngOnInit() {
  }

  uploadingfile(event) {
    this.file = event.target.files[0];
  }
  shareWhatsapp() {

    this.whatsappShareUrl = 'https://api.whatsapp.com/send?phones=91'
      + this.number + '&text=welcome%20to%20CRM%20'
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
      this.customerManagementService.createCustomer(this.customers).subscribe(detail => {
        this.newCustomer = detail;
        console.log(detail);
      });
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  selectedMobileNumber(value: string) {
    const indexOfEntry = this.selectedMobileNumbers.indexOf(value);
    if (indexOfEntry < 0) {
      this.selectedMobileNumbers.push(value);
    } else {
      this.selectedMobileNumbers.splice(indexOfEntry, 1);
    }
    console.log(this.selectedMobileNumbers);
  }

}

