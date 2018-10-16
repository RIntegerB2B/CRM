import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Agent } from './../../shared/model/agent.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AgentService } from './../agent.service';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HeaderSideService } from '../../shared/header-side/header-side.service';
import { AccessPermission } from './../../user-management/permission/accessPermission.model';
import { Customer } from 'src/app/shared/model/customer.model';


@Component({
  selector: 'app-agent-management',
  templateUrl: './agent-management.component.html',
  styleUrls: ['./agent-management.component.css']
})
export class AgentManagementComponent implements OnInit {

  newCustomer: Agent[] = [];
  @ViewChild('myTable') table: any;
  temp = [];
  currentPageLimit = 0;
  pageLimitOptions = [
    { value: 10 },
    { value: 25 },
    { value: 50 },
    { value: 100 },
  ];
  role: AccessPermission;
  agentDetailsForm: FormGroup;
  constructor(private fb: FormBuilder,
    private headerSideService: HeaderSideService,
    private agentService: AgentService, private dialog: MatDialog) { }
  ngOnInit() {
    this.createAgentForm();
    this.getAllAgentCustomer();
    this.role = JSON.parse(sessionStorage.getItem('role'));
  }
  createAgentForm() {
    this.agentDetailsForm = this.fb.group({
      _id: [],
      agentName: [],
      mobileNumber: [],
      whatsAppNo: [],
      landLine: [],
      email: [],
      agentService: [],
      address: [],
      agentCompanyName: [],
      companyAddress: [],
      location: [],
      gstNumber: [],
      agentGrade: []
    });
  }
  changePageLimit(limit) {
    this.currentPageLimit = parseInt(limit, 10);
  }
  onLimitChange(limit) {
    this.changePageLimit(limit);
    this.table.limit = this.currentPageLimit;
    this.table.recalculate();
    setTimeout(() => {
      if (this.table.bodyComponent.temp.length <= 0) {
        // TODO[Dmitry Teplov] test with server-side paging.
        this.table.offset = Math.floor((this.table.rowCount - 1) / this.table.limit);
      }
    });
  }
  getAllAgentCustomer() {
    this.agentService.allAgent().subscribe(data => {
      this.newCustomer = data;
      this.temp = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }

  duplicateAgentCustomer() {
    this.agentService.duplicateAgent().subscribe(data => {
      this.newCustomer = data;
      this.temp = data;
      console.log(this.newCustomer);
    }, error => {
      console.log(error);
    });
  }
  // CRUD start
  cancelAgentCustomer(edit) {
    edit.editing = false;
  }
  updateFilter(event) {
    // this.showData = true;
    const val = event.target.value.toLowerCase();
    /* if (this.dataSource.length !== 0) { */
    const filterCustomer = Object.keys(this.temp[0]);
    // Removes last "$$index" from "column"
    filterCustomer.splice(filterCustomer.length - 1);

    console.log(filterCustomer);
    if (!filterCustomer.length) {
      return;
    }
    const rows = this.temp.filter(function (d) {
      for (let i = 0; i <= filterCustomer.length; i++) {
        const column = filterCustomer[i];
        console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.newCustomer = rows;
    this.table.offset = 0;
  }


  updateAgentCustomer(agentDetailsForm: FormGroup, row) {
    this.agentService.editAgent(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
  }
  deleteAgentCustomer(agentDetailsForm: FormGroup, row) {
    row.editing = false;
    agentDetailsForm.reset();
    this.agentService.deleteAgent(row).subscribe(data => {
      if (data) {
      this.newCustomer = this.newCustomer.filter(customer => customer._id !== row);
      }
    }, error => {
      console.log(error);
    });
  }
  addCustomer(agentDetailsForm: FormGroup, row) {

    const dialogRef = this.dialog.open(AgentAddComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }

  // CRUD end
  editAgentCustomer(agentDetailsForm: FormGroup, row) {
    const dialogRef = this.dialog.open(AgentEditComponent, {
      width: '720px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }
}


@Component({
  templateUrl: './agent-edit.component.html'
})
export class AgentEditComponent implements OnInit {
  agentDetailsForm: FormGroup;
  newCustomer: Agent[] = [];
  constructor(private fb: FormBuilder, private agentService:
    AgentService, public dialogRef: MatDialogRef<AgentEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Agent) {
    console.log(data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createAgentForm();
  }

  createAgentForm() {
    this.agentDetailsForm = this.fb.group({
      _id: [],
      agentName: [],
      mobileNumber: [],
      whatsAppNo: [],
      landLine: [],
      email: [],
      agentService: [],
      address: [],
      agentCompanyName: [],
      companyAddress: [],
      location: [],
      gstNumber: [],
      agentGrade: []
    });
  }
  updateAgentCustomer(agentDetailsForm: FormGroup, row) {
    this.agentService.editAgent(row).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}

@Component({
  templateUrl: './agent-add.component.html'
})
export class AgentAddComponent implements OnInit {
  agentDetailsForm: FormGroup;
  newCustomer: Agent;
  constructor(private fb: FormBuilder, private agentService: AgentService
    , public dialogRef: MatDialogRef<AgentAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Agent) {
    console.log(data);
  }
  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.agentDetailsForm = this.fb.group({
      _id: [],
      agentName: [],
      mobileNumber: [],
      whatsAppNo: [],
      landLine: [],
      email: [],
      agentService: [],
      address: [],
      agentCompanyName: [],
      companyAddress: [],
      location: [],
      gstNumber: [],
      agentGrade: []
    });
  }
  addMember(agentDetailsForm: FormGroup) {
    this.newCustomer = new Agent(
      agentDetailsForm.controls.agentName.value,
      agentDetailsForm.controls.mobileNumber.value,
      agentDetailsForm.controls.whatsAppNo.value,
      agentDetailsForm.controls.landLine.value,
      agentDetailsForm.controls.email.value,
      agentDetailsForm.controls.agentService.value,
      agentDetailsForm.controls.address.value,
      agentDetailsForm.controls.agentCompanyName.value,
      agentDetailsForm.controls.companyAddress.value,
      agentDetailsForm.controls.location.value,
      agentDetailsForm.controls.gstNumber.value,
      agentDetailsForm.controls.agentGrade.value
    );
    this.agentService.addSingleAgent(this.newCustomer).subscribe(data => {
      this.newCustomer = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}
