import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2'; // Need this
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore'; // Need this
import { AngularFireAuthModule } from 'angularfire2/auth'; // Need this

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import env from '../environment/env'; // import the env file
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    FormsModule, // to use form validation
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(env), // init the env file
    AngularFireAuthModule, // import this module
    AngularFirestoreModule // import this module
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
