import { Component } from '@angular/core';
import { IonicPage, ToastController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage implements OnInit {

  email: string;
  resetForm: FormGroup;

  constructor(private af: AngularFirestore, private toast: ToastController) {
  }

  ngOnInit() {
    this.resetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  resetPassword(email: string) {
    let auth = this.af.app.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => this.toast.create({
        message: 'Reset email sent',
        duration: 2000
      }).present())
      .catch((error) => {
        this.toast.create({
          message: 'Something went wrong, try again',
          duration: 2000
        }).present();
      })
  }

}
