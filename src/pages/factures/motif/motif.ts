import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { FactureProvider } from '../../../providers/factures/facture.provider';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-motif',
  templateUrl: 'motif.html'
})
export class FactureMotifPage {

  facture: any;
  motif="";

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, navParams: NavParams,
    public toastCtrl: ToastController, private factureService:FactureProvider,public storage: Storage) {
    this.facture = navParams.get('facture')
  }
  
  ionViewDidLoad() {
     
      this.storage.get("permission").then(data=>{
        if(JSON.parse(data))
        {
          data = JSON.parse(data);
          console.log(data.datas)
          if(data.datas.droit_facture_vente_annulee_today){

          }
        var today = new Date();
        var date_enr = new Date(this.facture.date_enr);
        date_enr.setHours(0, 0, 0, 0)
        today.setHours(0, 0, 0, 0)

        if (data.datas.facture_vente_annulee==1) {
          console.log("peux annuler",data.datas.facture_vente_annulee)
        } else if (data.datas.droit_facture_vente_annulee_today==1) {
            if (today.toDateString() != date_enr.toDateString()) {
                let toast = this.toastCtrl.create({
                  message: "La date d'annulation de cette facture est dépassée, veuillez contacter votre supérieur pour l'annuler",
                  duration: 5000,
                  position: 'top'
                });
                toast.present();
                this.viewCtrl.dismiss();
            }
        } else {
          let toast = this.toastCtrl.create({
            message: "Vous n'êtes pas autorisés à annuler une facture, veuillez contacter un supérieur ",
            duration: 5000,
            position: 'top'
          });
          toast.present();
          this.viewCtrl.dismiss();
        }
        }
      })
    
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
    this.facture.sup_vnt=1;
    this.factureService.factureAnnulation({motif:this.motif,id_fact:this.facture.id_fact}).subscribe(data=>{
      this.viewCtrl.dismiss(this.facture);
    })
    
  }
}
