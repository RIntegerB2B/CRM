
import { Component, OnInit, Inject } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { Customer } from './../../shared/model/customer.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from './../product.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  arrayBuffer: any;
  file: File;
  customerDetailsForm: FormGroup;
  customers;
  newCustomer: Customer[] = [];
  constructor(private productService: ProductService) { }

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
      this.productService.createCustomer(this.customers)
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

}

