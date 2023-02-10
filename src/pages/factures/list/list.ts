import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { isArray } from 'ionic-angular/util/util';
import { Bon } from '../../../models/bon';
import { Facture } from '../../../models/facture';

import { Items } from '../../../providers';
import { FactureProvider } from '../../../providers/factures/facture.provider';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListFacturePage {

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController,private factureProvider:FactureProvider) {
    this.getAllFacture();
  }
  
  listfactures : Facture[]=[];

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    this.getAllFacture();
    this.factureProvider.updateStatic();
  }

  /**
   * Recupérer la liste des factures rejeter
   */
  getAllFacture(){
    this.factureProvider.getFactureByFilter({}).subscribe(data=>{
      if(data)
      {
        let factures = JSON.parse(JSON.stringify(data)).datas;
        this.listfactures=[];
      if(isArray(factures)){
        this.listfactures.push(...factures)}
      }
    },err=>{
      console.log(err)
      this.listfactures=[];
    })
  }  

  /**
   * Navigate to the detail page for this item.
   */
  openItem(facture: Facture) {
    this.navCtrl.push('DetailFacturePage', {
      facture: facture
    });
  }

  annuleItem(facture: Facture) {
    this.navCtrl.push('FactureMotifPage', {
      facture: facture
    })
  }
  
  refresh(event) {
    this.getAllFacture();
    setTimeout(() => {
      if (event)
          event.complete();
    }, 3000);
  }

  
  getFactures(ev) {
    let val = ev.target.value;
    console.log(this.listfactures)
    if (!val || !val.trim()) {
      this.listfactures = [];
      return;
    }
    this.listfactures = this.factureProvider.query({
      code_fact: val,
      ref_fact_vnt: val,
      date_fact:val,
      login_caissier_fact:val,
      magasin:val,
    });
  }
}
