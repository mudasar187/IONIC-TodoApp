import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AngularFirestore } from 'angularfire2/firestore';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any; // remove the homepage here, so we can start with welcome page if user is logged in otherwise redirect to homepage

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, af: AngularFirestore) { // set firestoremodule in constructor

    // create a method to check if user is logged in, redirect to homepage, if not, redirect to welcome
    const authObserve = af.app.auth().onAuthStateChanged((user) => {
      if(user) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = 'WelcomePage';
      }
    })

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

