import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { Email } from '../../models/Email';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage implements OnInit {

  email = {} as Email;
  emailForm: FormGroup;

  constructor(private emailComposer: EmailComposer) {
  }

  ngOnInit() {
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
      body: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(200)])
    });
  }

  // Send email
  sendEmail(email: Email) {
    let emailContent = {
      to: 'mudasar@iam-developer.com',
      cc: `${this.email.from}`,
      subject: `${this.email.subject}`,
      body: `${this.email.body}`,
      isHtml: true
    };

    // Send a text message using default options on the phone
    this.emailComposer.open(emailContent);
  }

  // for the textarea in html file
  @ViewChild('myInput') myInput: ElementRef;
  resize() {
    var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
    var scrollHeight = element.scrollHeight;
    element.style.height = scrollHeight + 'px';
    this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }



}
