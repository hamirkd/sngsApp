import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { login: string, password: string } = {
    login: '',
    password: ''
  };

  // Our translated text strings
  // private loginErrorString: string;
  private successLog:string;
  isSubmit = false;

  constructor(public navCtrl: NavController, public storage: Storage,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('BIENVENUE_PARMIS_NOUS').subscribe((value) => {
      this.successLog = value;
    });
    storage.get("user_connexion_data").then(data=>{
      if(JSON.parse(data))
      {this.account = JSON.parse(data);
      this.doLogin();
    }
    })
  }

  // Attempt to login in through our User service
  doLogin() {
    this.isSubmit = true;
    this.user.login(this.account).subscribe((resp) => {
      this.isSubmit=false;
      this.navCtrl.push(MainPage);
      let toast = this.toastCtrl.create({
        message: this.successLog,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.storage.set("user_connexion_data",JSON.stringify(this.account));

    }, (err) => {
      this.isSubmit=false;
      console.log(err)
      // Unable to log in
      if(err.error.message)
      {
        let toast = this.toastCtrl.create({
        message: err.error.message,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else{
      let toast = this.toastCtrl.create({
      message: err.message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

    });
  }
}
