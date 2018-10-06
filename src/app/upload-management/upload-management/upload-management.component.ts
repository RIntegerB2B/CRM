
import { Component, OnInit, Inject } from '@angular/core';
import * as XLSX from 'ts-xlsx';

import { Customer } from './../../shared/model/customer.model';
import { B2cMarket } from './../../shared/model/b2cmarket.model';
import { B2bMarket } from './../../shared/model/b2bmarket.model';
import { B2cCustomer } from './../../shared/model/b2ccustomer.model';
import { Vendor } from './../../shared/model/vendor.model';
import { Employee } from './../../shared/model/employee.model';
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
  b2cMarket: B2cMarket[];
  b2bMarket: B2bMarket[];
  b2cCustomer: B2cCustomer[];
  employee: Employee[];
  vendor: Vendor[];
  fullVendor;
  customers;
  b2cMarketCustomer;
  fullb2cCustomer;
  fullEmployee;
  b2bMarketCustomer;
  newCustomer: Customer[] = [];
  excelData: any = [{
    customerName: 'customerName1',
    gender: 'male/Female',
    mobileNumber: '9988776655',
    email: 'sample@gmail.com',
    dateOfBirth: '01/01/2018',
    nationality: 'indian',
    categoryType: 'IT or ITES',
    designation: 'developer',
    location: 'bangalore',
  }];
  excelB2BCustomerData: any = [
    {
      customerName: 'customerName1',
      mobileNumber: 'Male/Female',
      whatsAppNo: '9988776655',
      landLine: '080-4455666',
      email: 'sample@gmail.com',
      companyName: 'Company Name',
      companyAddress: 'Company Address',
      location: 'bangalore',
      gstNumber: 'GSTINBN123',
      customerGrade: 'A',
      brandName: 'Test'
    }
  ];
  constructor(private uploadService: UploadService) { }

  ngOnInit() {
  }
  /* b2b customer */

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
  /* b2c customer */
  UploadB2CCustomer() {
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
      this.fullb2cCustomer = XLSX.utils.sheet_to_json(worksheet);
      this.uploadService.createB2cCustomer(this.fullb2cCustomer)
        .subscribe(detail => {
          this.b2cCustomer = detail;
          console.log(detail);
        });
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  uploadingB2cCustomerfile(event) {
    this.file = event.target.files[0];
  }

  /* b2c market */
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
  /* b2b market */
  UploadB2BMarket() {
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
      this.b2bMarketCustomer = XLSX.utils.sheet_to_json(worksheet);
      this.uploadService.createB2bMarket(this.b2bMarketCustomer)
        .subscribe(detail => {
          this.b2bMarket = detail;
          console.log(detail);
        });
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  uploadingB2BMarketfile(event) {
    this.file = event.target.files[0];
  }

  UploadEmployee() {
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
      this.fullEmployee = XLSX.utils.sheet_to_json(worksheet);
      this.uploadService.createEmployee(this.fullEmployee)
        .subscribe(detail => {
          this.employee = detail;
          console.log(detail);
        });
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  uploadingEmployeefile(event) {
    this.file = event.target.files[0];
  }

  exportAsXLSX() {
    this.uploadService.exportAsExcelFile(this.excelData, 'B2Cmarket');
  }
  b2bCustomerExportAsXLSX() {
    this.uploadService.b2bCustomerExportAsExcelFile(this.excelB2BCustomerData, 'B2Bcustomer');
  }
  UploadVendor() {
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
      this.fullVendor = XLSX.utils.sheet_to_json(worksheet);
      this.uploadService.createVendor(this.fullVendor)
        .subscribe(detail => {
          this.employee = detail;
          console.log(detail);
        });
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  uploadingVendorfile(event) {
    this.file = event.target.files[0];
  }
}

