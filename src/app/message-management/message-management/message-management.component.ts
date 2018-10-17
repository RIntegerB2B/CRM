import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Message } from './../../shared/model/message.model';
import { MessageService } from './../message.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-message-management',
  templateUrl: './message-management.component.html',
  styleUrls: ['./message-management.component.css']
})
export class MessageManagementComponent implements OnInit {
  messageDetailsForm: FormGroup;
  newMessage: Message;

  constructor(private fb: FormBuilder,
     private messageService: MessageService, private dialog: MatDialog,
     ) { }

  ngOnInit() {
    this.getAllMessage();
  }

  addMessage(messageDetailsForm: FormGroup, row) {

    const dialogRef = this.dialog.open(MessageAddComponent, {
      width: '360px',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed();
  }
  getDeleteMessage(messageDetailsForm: FormGroup, row) {
    this.messageService.deleteMessage(row).subscribe(data => {
      this.newMessage = data;
    }, error => {
      console.log(error);
    });
  }
  getAllMessage() {
    this.messageService.allMessage().subscribe(data => {
      this.newMessage = data;
      console.log(this.newMessage);
    }, error => {
      console.log(error);
    });
  }

}

@Component({
  templateUrl: './message-add.component.html'
})
export class MessageAddComponent implements OnInit {
  messageDetailsForm: FormGroup;
  newMessage: Message;
  constructor(private fb: FormBuilder, private messageService: MessageService
    , public dialogRef: MatDialogRef<MessageAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Message) {
    console.log(data);
  }
  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createMessageForm();
  }

  createMessageForm() {
    this.messageDetailsForm = this.fb.group({
      messageTitle: [],
      messageDescription: []
    });
  }
  createUserMessage(messageDetailsForm: FormGroup) {
    this.newMessage = new Message(
      messageDetailsForm.controls.messageTitle.value,
      messageDetailsForm.controls.messageDescription.value,
    );
    this.messageService.createMessage(this.newMessage).subscribe(data => {
      this.newMessage = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
}
