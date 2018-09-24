
import { Component, OnInit, Inject } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { Customer } from './../../shared/model/customer.model';
import { B2cMarket } from './../../shared/model/b2cmarket.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadService } from './../upload.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-management',
  templateUrl: './upload-management.component.html',
  styleUrls: ['./upload-management.component.css']
})
export class UploadManagementComponent implements OnInit {
  arrayBuffer: any;
  file: File;
  customerDetailsForm: FormGroup;
  b2cMarket: B2cMarket [];
  customers;
  b2cMarketCustomer;
  newCustomer: Customer[] = [];
  excelData:  any = [{
    customerName: 'custerName1',
    gender: 'male/Female',
    mobileNumber: '9988776655',
    email: 'ucchal@gmail.com',
    dateOfBirth: '01/01/2018',
    nationality: 'indian',
    categoryType: 'IT or ITES',
    designation: 'developer',
    location: 'bangalore',
  }];
  constructor(private uploadService: UploadService) { }

  ngOnInit() {
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
      this.uploadService.createCustomer(this.customers)
        .subscribe(detail => {
          this.newCustomer = detail;
          console.log(detail);
        });
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  uploadingfile(event) {
    this.file = event.target.files[0];
  }
  UploadB2CMarket() {
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
      this.b2cMarketCustomer = XLSX.utils.sheet_to_json(worksheet);
      this.uploadService.createB2cMarket(this.b2cMarketCustomer)
        .subscribe(detail => {
          this.b2cMarket = detail;
          console.log(detail);
        });
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  uploadingB2cMarketfile(event) {
    this.file = event.target.files[0];
  }
  exportAsXLSX() {
    this.uploadService.exportAsExcelFile(this.excelData, 'sample');
  }

}

