import { Component, OnInit } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { Customer } from './customer.model';
import { NavHeaderService } from './nav-header.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit {
  toggleMenuBar = 'colapseMenuBar';
  arrayBuffer: any;
  file: File;
  whatsappShareUrl: string;
  newCustomer: Customer[] = [];
  customers;

  constructor(public navHeaderService: NavHeaderService, private http: HttpClient) { }

  ngOnInit() {

  }
  toggleMenu() {
    this.toggleMenuBar = this.toggleMenuBar === 'colapseMenuBar' ? 'expandMenuBar' : 'colapseMenuBar';
  }
  uploadingfile(event) {
    this.file = event.target.files[0];
  }
  whatsApp() {
    this.whatsappShareUrl = 'https://api.whatsapp.com/send?phone=919965437973&text=welcome%20to%20CRM%20'
   /* + 'http://ec2-13-126-16-163.ap-south-1.compute.amazonaws.com:3021/' */;

    window.location.href = this.whatsappShareUrl;

  }

 /*  Upload() {
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
      this.navHeaderService.createCustomer(this.customers).subscribe(detail => {
        this.newCustomer = detail;
        console.log(detail);
      });
    };
    fileReader.readAsArrayBuffer(this.file);
  } */
}

