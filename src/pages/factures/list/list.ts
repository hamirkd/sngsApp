import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { isArray } from 'ionic-angular/util/util';
import { Facture } from '../../../models/facture';

import { Items } from '../../../providers';
import { FactureProvider } from '../../../providers/factures/facture.provider';

@IonicPage()
@Component({
  selector: 'page-list-facture',
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
  }

  /**
   * Recupérer la liste des factures rejeter
   */
  getAllFacture(){
    this.factureProvider.getFactureByFilter({limit_debut:this.limit_debut,taille:this.taille}).subscribe(data=>{
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
  limit_debut=0;
  taille=100;
  
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
  
  searchFacture(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.listfactures = [];
      return;
    }

    this.factureProvider.searchFacture({limit_debut:this.limit_debut,taille:this.taille,numerofacture:val}).subscribe(data=>{
      console.log(data)
      let facture = JSON.parse(JSON.stringify(data)).datas;
      if(isArray(facture)){this.listfactures=facture}
      this.listfactures.sort((a,b)=>{
        if(a.date_fact.localeCompare(b.date_fact))
        return 0
      })
    })
    
  }

  closed = true;

  loadData(event) {
    setTimeout(() => {

      this.factureProvider.getFactureByFilter({limit_debut:this.limit_debut,taille:this.taille}).subscribe(data=>{
        if(data)
        {
          let factures = JSON.parse(JSON.stringify(data)).datas;
        if(isArray(factures)){
          this.listfactures.push(...factures);
          if(factures.length>0){
            this.limit_debut = this.limit_debut+this.taille;
          }
        }
        }
      },err=>{
        console.log(err)
        this.listfactures=[];
      })
      console.log(event.ionInfinite.closed)
      // event.ionInfinite.closed = true;
      this.closed = false;
      setTimeout(() => {
        this.closed = true;
      }, 100);
      // Désactiver l'infinite scroll une fois que toutes les données sont chargées
      if (this.listfactures.length >= 1000) {
        this.closed = false;
      }
    }, 500);
  }
}
