import { Component, OnInit, ViewChild } from '@angular/core';
import { NavHeaderService } from './nav-header.service';
import { map } from 'rxjs/operators';
import { SmsService } from './../../sms-management/sms.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import { B2cMarket } from './../../shared/model/b2cmarket.model';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
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
  customers;
  layoutConf: any;
  menuItems: any;
  menuItemSub: Subscription;
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  selection = new SelectionModel<B2cMarket>(true, []);
  array: any;
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public navHeaderService: NavHeaderService, private smsService: SmsService, private http: HttpClient) { }

  ngOnInit() {
    /* this.dataSource.paginator = this.paginator; */
    this.getAllAgent();
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
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  }
  getAllAgent() {
    this.smsService.allAgent()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<B2cMarket>(response);
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.totalSize = this.array.length;
     /*    this.newCustomer = response; */
        this.iterator();
      }, error => {
        console.log(error);
      });
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.forEach(row => this.selection.select(row));
  }

  newData()   {
    console.log('newData');
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

