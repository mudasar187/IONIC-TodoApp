import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AngularFirestore } from 'angularfire2/firestore';
import { WelcomePage } from '../pages/welcome/welcome';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  splash = true;

  rootPage:any; // remove the homepage here, so we can start with welcome page if user is logged in otherwise redirect to homepage

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, af: AngularFirestore, private toast: ToastController) { // set firestoremodule in constructor

    // create a method to check if user is logged in, redirect to homepage, if not, redirect to welcome
    const authObserve = af.app.auth().onAuthStateChanged((user) => {
      let checkUser = af.app.auth().currentUser;
      if(checkUser != null && checkUser.emailVerified == true) {
          this.rootPage = HomePage;
          this.toast.create({
          message: `Welcome ${user.email} !`,
          duration: 2000
        }).present();
      } else if((user == null) || (user.emailVerified == false)) {
        this.rootPage = 'WelcomePage';
      }
  });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      setTimeout(() => {
        this.splash = false;
        }, 3500);
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

