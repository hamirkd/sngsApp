import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Items } from '../../../providers';
import { PaiementProvider } from '../../../providers/paiements/paiement.provider';
import {  User as UserService } from '../../../providers';

@IonicPage()
@Component({
  selector: 'page-detail-paiement',
  templateUrl: 'detail-paiement.html'
})
export class DetailPaiementPage {
  paiement: any;

  constructor(public navCtrl: NavController, navParams: NavParams, paiements: Items,private paiementService:PaiementProvider,
    public toastCtrl: ToastController,
    private userService: UserService) {
    this.paiement = navParams.get('paiement');
    if(!this.paiement)return;
  }
  
  ionViewDidLoad() {
    
  }

  
  annuler() {
    this.navCtrl.push('PaiementMotifPage', {
      paiement: this.paiement
    });
  }

  accepter() {
    
    this.paiementService.paiementRejeterOrAccepter(
      {
      motif:'',
      id_dem:this.paiement.id_dem,
      role: this.userService._user.droit_validateur_paiement,
      action:1
    }).subscribe(data=>{
      this.navCtrl.canGoBack();
      this.paiement.action = 1;
      let toast = this.toastCtrl.create({
      message: data["message"],
      duration: 3000,
      position: 'top'
    });
    toast.present();
    })
  }


}
