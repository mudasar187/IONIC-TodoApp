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
  registerUser() {
    this.af.app.auth().createUserWithEmailAndPassword(this.user.email, this.user.password).then(response => {
      this.toast.create({
        message: 'You are now registered',
        duration: 2000
      }).present();
    }).catch(error => {
      this.toast.create({
        message: 'User not registered',
        duration: 2000
      }).present();
    })
  }

}
