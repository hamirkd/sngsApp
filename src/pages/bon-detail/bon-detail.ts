import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Item } from '../../models/item';

import { Items, User } from '../../providers';
import { BonProvider } from '../../providers/bon/bon';

@IonicPage()
@Component({
  selector: 'page-bon-detail',
  templateUrl: 'bon-detail.html'
})
export class BonDetailPage {
  bon: any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController, navParams: NavParams, 
    public userService:User,private bonService:BonProvider) {
    this.bon = navParams.get('bon');
    if(!this.bon)return;
  }
  
  ionViewDidLoad() {
    console.log("=========>",this.userService._user,this.bon)
    if(!this.bon)return;
    this.bonService.getBonDetail(this.bon).subscribe(data=>{
      console.log(data)
      this.bon.stocks = JSON.parse(JSON.stringify(data)).datas;
    })
  }

  rejeter(bon) {
    this.navCtrl.push('BonMotifPage', {
      bon: bon
    });
    this.ionViewDidLoad();
  }

  accepter(bon) {
    this.bonService.apprvae(bon).subscribe(data=>{
      let toast = this.toastCtrl.create({
        message: data?data['message']:'Appro',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.ionViewDidLoad();
      // this.viewCtrl.dismiss();
    });
  }

  renvoyer(bon) {
    
    this.bonService.rejetersrtRenvoye(bon).subscribe(data=>{
      let toast = this.toastCtrl.create({
        message: data['message'],
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.ionViewDidLoad();
    });
  }


}
