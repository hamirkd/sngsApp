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

  
  ionViewDidLoad() {
    
    this.translateService.get('BIENVENUE_PARMIS_NOUS').subscribe((value) => {
      this.successLog = value;
    });
    this.storage.get("user_connexion_data").then(data=>{
      if(JSON.parse(data))
      {this.account = JSON.parse(data);
      this.doLogin();
    }
    })

  }
  // account: { login: string, password: string } = {
  //   login: 'root',
  //   password: 'adminroot1'
  // };

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
      {
        this.account = JSON.parse(data);
        this.doLogin();
      }
      else {
        storage.remove('user_connexion_data')
      }
    })
  }

  // Attempt to login in through our User service
  doLogin() {
    this.isSubmit = true;
    this.user.login(this.account).subscribe((resp) => {
      this.isSubmit=false;
      let toast = this.toastCtrl.create({
        message: this.successLog,
        duration: 3000,
        position: 'top'
      });
       if(resp["status"]==1){
        let toast = this.toastCtrl.create({
        message: resp["message"],
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return;
      } 
      this.storage.set("permission",JSON.stringify(resp))
      toast.present();
      this.storage.set("user_connexion_data",JSON.stringify(this.account));
      this.navCtrl.push(MainPage);

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
