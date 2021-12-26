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
    login: 'root',
    password: '1234'
  };

  // Our translated text strings
  private loginErrorString: string;
  private successLog:string;

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
    this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
      let toast = this.toastCtrl.create({
        message: this.successLog,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.storage.set("user_connexion_data",JSON.stringify(this.account));
    }, (err) => {
      
      console.log(err.status)
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: err.error.message,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
