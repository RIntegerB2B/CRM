import { Component, OnInit } from '@angular/core';
import { ImagesUpload } from './../email-mangement/image.model';
import { EmailService } from './../email.service';

import {EmailImageData} from './emailData.model';
import { AppSetting } from './../../config/appSetting';

@Component({
  selector: 'app-email-image',
  templateUrl: './email-image.component.html',
  styleUrls: ['./email-image.component.css']
})
export class EmailImageComponent implements OnInit {
  fileToUpload;
  fileToLoad;
  fileLength;
  byteArrayConverted: any;
  check;
  showImage: any;
  image: ImagesUpload;
  imageAll: ImagesUpload[];
  message;
  action;
  url: any;
  imagePath: string = AppSetting.imagePath;
  emailImageData: EmailImageData = new EmailImageData();
  reader: FileReader = new FileReader();
  portFolioImageBlob: Blob;
  portFolioImageBytes: Uint8Array;
  constructor(private emailService: EmailService) { }

  ngOnInit() {
    this.image = new ImagesUpload(
      '',
      ''
    );
    this.getAllImages();
  }
  handleFileInput(event) {
  console.log(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.emailImageData.emailImage = event.target.files[0];
      reader.onload = (data) => { // called once readAsDataURL is completed
        this.url = data.currentTarget;
      };
    }
  }
  uploadSingleImage() {
      this.emailService.uploadImages(this.emailImageData).subscribe(data => {
        this.getAllImages();
      }, error => {
        console.log(error);
      });
    }
  getAllImages() {
    this.emailService.findAllImage().subscribe(data => {
      this.imageAll = data;
      console.log(this.imageAll);
    }, error => {
      console.log(error);
    });
  }
  deleteSingleImage(deleteData) {
    console.log(deleteData);
    this.emailService.deleteSingleImages(deleteData).subscribe(data => {
      this.getAllImages();
    }, error => {
      console.log(error);
    });
  }
}
