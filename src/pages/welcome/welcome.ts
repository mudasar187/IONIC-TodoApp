import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Subscription} from 'rxjs/Subscription';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  /*
  connected: Subscription;
  disconnected: Subscription;
  */

  constructor(public navCtrl: NavController, private emailComposer: EmailComposer, private network: Network, private toast: ToastController) {
     /* this.emailComposer.isAvailable().then((available: boolean) =>{
       if(available) {
         Now we know we can send
       }
      });
      */
  }

  /*
  displayNetworkUpdate(connectionState: string){
    let networkType = this.network.type;
    this.toast.create({
      message: `You are now ${connectionState} via ${networkType}`,
      duration: 3000
    }).present();
  }

  ionViewDidEnter() {
    this.connected = this.network.onConnect().subscribe(data => {
      console.log(data)
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));

    this.disconnected = this.network.onDisconnect().subscribe(data => {
      this.navCtrl.push('NetworkOfflinePage');
      console.log(data)
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
  }

  ionViewWillLeave(){
    this.navCtrl.push('NetworkOfflinePage');
    this.connected.unsubscribe();
    this.disconnected.unsubscribe();
  }
  */

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
