import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { DemandeProvider } from '../../../providers/demandes/demande.provider';
import { Storage } from '@ionic/storage';
import {  User as UserService } from '../../../providers';

@IonicPage()
@Component({
  selector: 'page-motif-demande',
  templateUrl: 'motif-demande.html'
})
export class DemandeMotifPage {

  demande: any;
  motif="";

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, navParams: NavParams,
    private userService: UserService,
    public toastCtrl: ToastController, private demandeService:DemandeProvider,public storage: Storage) {
    this.demande = navParams.get('demande')
  }
  
  ionViewDidLoad() {
     
    
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if(this.motif.length<=1){
      let toast = this.toastCtrl.create({
        message: "Veuillez ajouté un motif",
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return;
    }
    this.demandeService.demandeRejeterOrAccepter(
      {
      motif:this.motif,
      id_dem:this.demande.id_dem,
      role: this.userService._user.droit_validateur_demande,
      action:2
    }).subscribe(data=>{
      this.viewCtrl.dismiss(this.demande);
      let toast = this.toastCtrl.create({
      message: data["message"],
      duration: 3000,
      position: 'top'
    });
    toast.present();
    this.demande.action = 3;
    })
    
  }
}
