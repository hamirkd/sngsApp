import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { isArray } from 'ionic-angular/util/util';

import { Items } from '../../../providers';
import {  User as UserService } from '../../../providers';
import { PaiementProvider } from '../../../providers/paiements/paiement.provider';
import { Paiement } from '../../../models/paiement';
import { SMS } from '@ionic-native/sms/ngx';

@IonicPage()
@Component({
  selector: 'page-list-paiement',
  templateUrl: 'list-paiement.html'
})
export class ListPaiementPage {

  constructor(public navCtrl: NavController,private userService: UserService, public items: Items,
    public toastCtrl: ToastController,private sms: SMS,
    public modalCtrl: ModalController,private paiementProvider:PaiementProvider) {
    this.getAllPaiements();
  }
  isSubmit = false;

  
  listpaiements : Paiement[]=[];

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    this.getAllPaiements();
  }

  /**
   * Recupérer la liste des paiements rejeter
   */
  getAllPaiement(){
    this.paiementProvider.getPaiementByFilter({limit_debut:this.limit_debut,taille:this.taille}).subscribe(data=>{
      if(data)
      {
        let paiements = JSON.parse(JSON.stringify(data)).datas;
        this.listpaiements=[];
      if(isArray(paiements)){
        this.listpaiements.push(...paiements)}
      }
    },err=>{
      console.log(err)
      this.listpaiements=[];
    })
  }  
  getAllPaiements(){
    this.paiementProvider.getPaiements().subscribe(data=>{
      if(data)
      {
        let paiements = JSON.parse(JSON.stringify(data)).datas;
        this.listpaiements=[];
      if(isArray(paiements)){
        this.listpaiements.push(...paiements)}
      }
    },err=>{
      console.log(err)
      this.listpaiements=[];
    })
  }
  sommeParCategorie(list: Paiement[], critere? : 'NONUTILISE'| 'UTILISE') : {nombre, somme} {
    const result : {nombre, somme} = {nombre:0, somme:0};
    list.forEach(paiement=> {
      if (critere === 'NONUTILISE' && !paiement.used_paiement_code_user){
        result.somme = result.somme + Number(paiement.montant);
        result.nombre = result.nombre + 1;
      } else if(critere === 'UTILISE' && paiement.used_paiement_code_user) {
        result.somme = result.somme + Number(paiement.montant);
        result.nombre = result.nombre + 1;
      }
    })
    return result;
  }
  recuperationCode(){
    this.isSubmit = true;
    this.sms.getAllSMS().then((messages) => {
      console.log('Messages:', messages);
    }).catch((error) => {
      console.error('Erreur de récupération des messages:', error);
    });

  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(paiement: Paiement) {
    this.navCtrl.push('DetailPaiementPage', {
      paiement: paiement
    });
  }

 rejeterItem(paiement: Paiement) {
    this.navCtrl.push('PaiementMotifPage', {
      paiement: paiement
    })
  }
  
  refresh(event) {
    this.getAllPaiements();
    setTimeout(() => {
      if (event)
          event.complete();
    }, 3000);
  }
  limit_debut=0;
  taille=100;
  
  getPaiements(ev) {
    let val = ev.target.value;
    console.log(this.listpaiements)
    if (!val || !val.trim()) {
      this.listpaiements = [];
      return;
    }
    this.listpaiements = this.paiementProvider.query({
      code_fact: val,
      ref_fact_vnt: val,
      date_fact:val,
      login_caissier_fact:val,
      magasin:val,
    });
  }
  
  searchPaiement(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.listpaiements = [];
      return;
    }

    this.paiementProvider.searchPaiement({limit_debut:this.limit_debut,taille:this.taille,code:val}).subscribe(data=>{
      console.log(data)
      let paiement = JSON.parse(JSON.stringify(data)).datas;
      if(isArray(paiement)){this.listpaiements=paiement}
      this.listpaiements.sort((a,b)=>{
        if(a.date_paiement.localeCompare(b.date_paiement))
        return 0
      })
    })
    
  }

  closed = true;

  loadData(event) {
    setTimeout(() => {

      this.paiementProvider.getPaiementByFilter({limit_debut:this.limit_debut,taille:this.taille}).subscribe(data=>{
        if(data)
        {
          let paiements = JSON.parse(JSON.stringify(data)).datas;
        if(isArray(paiements)){
          this.listpaiements.push(...paiements);
          if(paiements.length>0){
            this.limit_debut = this.limit_debut+this.taille;
          }
        }
        }
      },err=>{
        console.log(err)
        this.listpaiements=[];
      })
      console.log(event.ionInfinite.closed)
      // event.ionInfinite.closed = true;
      this.closed = false;
      setTimeout(() => {
        this.closed = true;
      }, 100);
      // Désactiver l'infinite scroll une fois que toutes les données sont chargées
      if (this.listpaiements.length >= 1000) {
        this.closed = false;
      }
    }, 500);
  }
}
