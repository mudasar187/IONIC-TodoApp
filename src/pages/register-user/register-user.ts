import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/User';
import { AngularFirestore } from 'angularfire2/firestore';

@IonicPage()
@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFirestore, private toast: ToastController) {
  }

   // make a new account for new registered user
   registerUser(user: User) {
    this.af.app.auth().createUserWithEmailAndPassword(user.email,user.password).then(response => {
      let user = this.af.app.auth().currentUser;
      user.sendEmailVerification();
      this.navCtrl.push('WelcomePage');
    }, err => {
      if(err.code == 'auth/email-already-in-use') {
        this.toast.create({
          message: 'Email already in use',
          duration: 2000
        }).present();
      }
    });
  }
}


