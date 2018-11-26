import { Component, OnInit, Inject, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { ConfirmAlertBox } from './confirmAlert.model';
@Component({
  selector: 'app-confirm-alert',
  templateUrl: './confirm-alert.component.html',
  styleUrls: ['./confirm-alert.component.css']
})
export class ConfirmAlertComponent implements OnInit {
  @Input() confirmAlertBox: ConfirmAlertBox;
  @Output() messageEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }
  closeModal()   {
    this.confirmAlertBox.displayClass = 'displayNone';
  }
  deleteMessage()   {
    this.confirmAlertBox.displayClass = 'displayNone';
    this.messageEvent.emit('Yes');
  }
    notDeleteMessage()   {
      this.confirmAlertBox.displayClass = 'displayNone';
      this.messageEvent.emit('No');
  }
}
