import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private emailComposer: EmailComposer) {
    // this.emailComposer.isAvailable().then((available: boolean) =>{
      // if(available) {
        //Now we know we can send
      // }
     // });

  }

  // Send to login page
  signIn() {
    this.navCtrl.push('AuthorizePage')
  }

  // Send to registered page
  register() {
    this.navCtrl.push('RegisterUserPage')
  }

  // send to about page
  about() {
    this.navCtrl.push('AboutPage');
  }

}
