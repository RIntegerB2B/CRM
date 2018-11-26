import { Component, OnInit, Input } from '@angular/core';
import { AlertBox } from './alert.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() alertBox: AlertBox;

  constructor() { }

  ngOnInit() {
  }
  closeModal()   {
    this.alertBox.displayClass = 'displayNone';
  }
}
