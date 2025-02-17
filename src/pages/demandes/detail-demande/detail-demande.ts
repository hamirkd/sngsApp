import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Items } from '../../../providers';
import { DemandeProvider } from '../../../providers/demandes/demande.provider';
import {  User as UserService } from '../../../providers';

@IonicPage()
@Component({
  selector: 'page-detail-facture',
  templateUrl: 'detail-demande.html'
})
export class DetailDemandePage {
  demande: any;

  constructor(public navCtrl: NavController, navParams: NavParams, demandes: Items,private demandeService:DemandeProvider,
    public toastCtrl: ToastController,
    private userService: UserService) {
    this.demande = navParams.get('demande');
    if(!this.demande)return;
  }
  
  ionViewDidLoad() {
    
  }

  
  annuler() {
    this.navCtrl.push('DemandeMotifPage', {
      demande: this.demande
    });
  }

  accepter() {
    
    this.demandeService.demandeRejeterOrAccepter(
      {
      motif:'',
      id_dem:this.demande.id_dem,
      role: this.userService._user.droit_validateur_demande,
      action:1
    }).subscribe(data=>{
      this.navCtrl.canGoBack();
      this.demande.action = 1;
      let toast = this.toastCtrl.create({
      message: data["message"],
      duration: 3000,
      position: 'top'
    });
    toast.present();
    })
  }


}
