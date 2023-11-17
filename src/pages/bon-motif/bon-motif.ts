import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Items } from '../../providers';
import { BonProvider } from '../../providers/bon/bon';

@IonicPage()
@Component({
  selector: 'page-bon-motif',
  templateUrl: 'bon-motif.html'
})
export class BonMotifPage {

  bon: any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, navParams: NavParams, bons: Items,
    public toastCtrl: ToastController, private bonService:BonProvider) {
    this.bon = navParams.get('bon') || bons.defaultItem;
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
    if(!this.bon.motif){
      
      let toast = this.toastCtrl.create({
        message: "Veuillez ajouté un motif",
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return;
    }
    
    this.bonService.rejetersrt(this.bon).subscribe(data=>{
      console.log(data)
      // this.bon.stocks = JSON.parse(JSON.stringify(data)).datas;
      this.bon.rejeter=1;
      let toast = this.toastCtrl.create({
        message: data['message'],
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.viewCtrl.dismiss(this.bon);
    });

  }
}
