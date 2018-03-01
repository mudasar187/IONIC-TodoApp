import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { Email } from '../../models/Email';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  email = {} as Email;

  constructor(private emailComposer: EmailComposer) {
  }

  // send the email
  sendEmail() {
    let emailContent = {
    to: 'mudasar@iam-developer.com',
    cc: 'ahmmud16@hotmail.com',
    subject: `${this.email.emailSubject}`,
    body: `${this.email.emailBody}`,
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
