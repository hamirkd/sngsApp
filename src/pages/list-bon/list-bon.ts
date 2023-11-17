import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { isArray } from 'ionic-angular/util/util';
import { Bon } from '../../models/bon';

import { Items } from '../../providers';
import { BonProvider } from '../../providers/bon/bon';

@IonicPage()
@Component({
  selector: 'page-list-bon',
  templateUrl: 'list-bon.html'
})
export class ListBonPage {

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public items: Items, public modalCtrl: ModalController,private bonService:BonProvider) {
    this.getBonList();
  }
  
  listBons : Bon[]=[];

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    this.getBonList();
  }

  /**
   * Recupérer la liste des bons rejeter
   */
  getBonListRejeter(){
    this.bonService.getBonRejeter().subscribe(data=>{
      let bons = JSON.parse(JSON.stringify(data)).datas;
      if(isArray(bons)){this.listBons.push(...bons)
      this.listBons.sort((a,b)=>{if(a.date_sort.localeCompare(b.date_sort))return 0})}
    },err=>{
      console.log(err)
      this.listBons=[];
    })
  }
  getBonListEnAttente(){
    this.bonService.getBonEnAttente().subscribe(data=>{
      let bons = JSON.parse(JSON.stringify(data)).datas;
      if(isArray(bons)){
      this.listBons.push(...bons);
      this.listBons=this.listBons.sort((a,b)=>{if(a.date_sort.localeCompare(b.date_sort))return 0})}
      console.log(this.listBons);
    },err=>{
      console.log(err)
      this.listBons=[];
    })
  }
  getBonList(){
    this.listBons=[];
    this.getBonListEnAttente();
    this.getBonListRejeter();
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(bon: Bon) {
    this.navCtrl.push('BonDetailPage', {
      bon: bon
    });
  }
  
  refresh(event) {
    this.getBonList();
    setTimeout(() => {
      if (event)
          event.complete();
    }, 3000);
  }

  
  searchBon(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.listBons = [];
      return;
    }

    this.bonService.searchBon(val).subscribe(data=>{
      console.log(data)
      let bons = JSON.parse(JSON.stringify(data)).datas;
      if(isArray(bons)){this.listBons=bons}
      this.listBons.sort((a,b)=>{
        if(a.date_sort.localeCompare(b.date_sort))
        return 0
      })
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
        message: data['message'],
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.ionViewDidLoad();
    });
  }

  renvoyer(bon) {
    console.log(bon)
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
