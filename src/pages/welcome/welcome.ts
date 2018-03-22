import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, private emailComposer: EmailComposer, private network: Network, private toast: ToastController) {
   /* this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        // Now we know we can send
      }
    }); */
  }

  goToResetPasswordPage() {
    this.navCtrl.push('ResetPasswordPage')
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
