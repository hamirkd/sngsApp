import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item } from '../../../models/item';

import { Items } from '../../../providers';
import { FactureProvider } from '../../../providers/factures/facture.provider';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailFacturePage {
  facture: any;

  constructor(public navCtrl: NavController, navParams: NavParams, factures: Items,private factureService:FactureProvider) {
    this.facture = navParams.get('facture');
    if(!this.facture)return;
  }
  liste_item = []
  
  ionViewDidLoad() {
    if(!this.facture)return;
    this.factureService.getfactureDetail(this.facture).subscribe(data=>{
      this.liste_item = JSON.parse(JSON.stringify(data)).datas;
    })
  }

  
  annuler(facture: Item) {
    this.navCtrl.push('FactureMotifPage', {
      facture: facture
    });
  }


}
