import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { User } from '../../models/User';
import { AngularFirestore } from 'angularfire2/firestore';
import { FormControl, FormGroup, Validators,ValidatorFn,AbstractControl } from '@angular/forms';
import { OnInit } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage implements OnInit {

  user = {} as User;
  userForm: FormGroup;

  constructor(public navCtrl: NavController, private af: AngularFirestore, private toast: ToastController) {
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

  ngOnInit() {
    this.userForm = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required]),
    re_password: new FormControl('', [Validators.required,this.equalto('password')])
    });

    }

    equalto(field_name): ValidatorFn {
      return (control: AbstractControl): {[key: string]: any} => {

      let input = control.value;

      let isValid=control.root.value[field_name]==input
      if(!isValid)
      return { 'equalTo': {isValid} }
      else
      return null;
      };
      }
}


