import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../models/User';
import { HomePage } from '../home/home';



@IonicPage()
@Component({
  selector: 'page-authorize',
  templateUrl: 'authorize.html',
})
export class AuthorizePage {

  user = {} as User; // create an object of user

  constructor(public navCtrl: NavController, private af: AngularFirestore, private toast: ToastController) {
  }


  loginUser(user: User) {
    this.af.app.auth().signInWithEmailAndPassword(user.email, user.password).then(response => {
      let checkUser = this.af.app.auth().currentUser;
      if (!checkUser.emailVerified) {
        this.toast.create({
          message: 'Please verify your account',
          duration: 2000
        }).present();
      } else {
        this.navCtrl.push(HomePage);
      }
    }, error => {
      console.log(error);
      switch (error.code) {
        case 'auth/user-not-found':
          this.toast.create({
            message: 'User not exists',
            duration: 2000
          }).present();
          break;
        case 'auth/wrong-password':
          this.toast.create({
            message: 'Wrong password',
            duration: 2000
          }).present();
          break;

      }
    });
  }

  sendEmailVerification(user: User) {
    let checkUser = this.af.app.auth().currentUser;
    checkUser.sendEmailVerification();
    this.toast.create({
      message: `Email sent to ${checkUser.email}`,
      duration: 2000
    }).present();
  }
}
