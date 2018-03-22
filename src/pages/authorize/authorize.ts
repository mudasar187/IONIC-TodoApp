import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../models/User';
import { HomePage } from '../home/home';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';



@IonicPage()
@Component({
  selector: 'page-authorize',
  templateUrl: 'authorize.html',
})
export class AuthorizePage implements OnInit {

  user = {} as User; // create an object of user
  loginForm: FormGroup;

  constructor(public navCtrl: NavController, private af: AngularFirestore, private toast: ToastController) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });

  }

  // login user
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
            message: 'Wrong username/password',
            duration: 2000
          }).present();
          break;
        case 'auth/wrong-password':
          this.toast.create({
            message: 'Wrong username/password',
            duration: 2000
          }).present();
          break;

      }
    });
  }

  // send email verification
  sendEmailVerification(user: User) {
    let checkUser = this.af.app.auth().currentUser;
    checkUser.sendEmailVerification();
    this.toast.create({
      message: `Email sent to ${checkUser.email}`,
      duration: 2000
    }).present();
  }
}
