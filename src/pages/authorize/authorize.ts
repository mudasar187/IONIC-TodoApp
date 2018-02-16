import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../models/User';



@IonicPage()
@Component({
  selector: 'page-authorize',
  templateUrl: 'authorize.html',
})
export class AuthorizePage {

user = {} as User; // create an object of user

  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFirestore, private toast: ToastController) {
  }

  loginUser() {
    this.af.app.auth().signInWithEmailAndPassword(this.user.email, this.user.password).then(response => {
      this.toast.create({
        message: 'You are now logged in!',
        duration: 2000
      }).present();
    }).catch(error => {
      this.toast.create({
        message: 'Username or password incorrect',
        duration: 2000
      }).present();
    });
  }

}
