import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { isArray } from 'ionic-angular/util/util';
import { Demande } from '../../../models/demande';

import { Items } from '../../../providers';
import { DemandeProvider } from '../../../providers/demandes/demande.provider';
import {  User as UserService } from '../../../providers';

@IonicPage()
@Component({
  selector: 'page-list-demande',
  templateUrl: 'list-demande.html'
})
export class ListDemandePage {

  constructor(public navCtrl: NavController,private userService: UserService, public items: Items,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,private demandeProvider:DemandeProvider) {
    this.getAllDemandeValidation();
  }

  
  listdemandes : Demande[]=[];

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    this.getAllDemandeValidation();
  }

  /**
   * Recupérer la liste des demandes rejeter
   */
  getAllDemande(){
    this.demandeProvider.getDemandeByFilter({limit_debut:this.limit_debut,taille:this.taille}).subscribe(data=>{
      if(data)
      {
        let demandes = JSON.parse(JSON.stringify(data)).datas;
        this.listdemandes=[];
      if(isArray(demandes)){
        this.listdemandes.push(...demandes)}
      }
    },err=>{
      console.log(err)
      this.listdemandes=[];
    })
  }  
  getAllDemandeValidation(){
    this.demandeProvider.getDemandesByRole(this.userService._user.droit_validateur_demande).subscribe(data=>{
      if(data)
      {
        let demandes = JSON.parse(JSON.stringify(data)).datas;
        this.listdemandes=[];
      //if(isArray(demandes)){
        this.listdemandes.push(...demandes)}
     // }
    },err=>{
      console.log(err)
      this.listdemandes=[];
    })
  }  

  /**
   * Navigate to the detail page for this item.
   */
  openItem(demande: Demande) {
    this.navCtrl.push('DetailDemandePage', {
      demande: demande
    });
  }

 rejeterItem(demande: Demande) {
    this.navCtrl.push('DemandeMotifPage', {
      demande: demande
    })
  }
  accepterItem(demande: Demande) {
    
    this.demandeProvider.demandeRejeterOrAccepter(
      {
      motif:'',
      id_dem:Number(demande.id_dem),
      role: this.userService._user.droit_validateur_demande,
      action:1
    }).subscribe(data=>{
      let toast = this.toastCtrl.create({
      message: data["message"],
      duration: 3000,
      position: 'top'
    });
    toast.present();
    this.getAllDemandeValidation();
    })
  }
  
  refresh(event) {
    this.getAllDemandeValidation();
    setTimeout(() => {
      if (event)
          event.complete();
    }, 3000);
  }
  limit_debut=0;
  taille=100;
  
  getDemandes(ev) {
    let val = ev.target.value;
    console.log(this.listdemandes)
    if (!val || !val.trim()) {
      this.listdemandes = [];
      return;
    }
    this.listdemandes = this.demandeProvider.query({
      code_fact: val,
      ref_fact_vnt: val,
      date_fact:val,
      login_caissier_fact:val,
      magasin:val,
    });
  }
  
  searchDemande(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.listdemandes = [];
      return;
    }

    this.demandeProvider.searchDemande({limit_debut:this.limit_debut,taille:this.taille,numerodemande:val}).subscribe(data=>{
      console.log(data)
      let demande = JSON.parse(JSON.stringify(data)).datas;
      if(isArray(demande)){this.listdemandes=demande}
      this.listdemandes.sort((a,b)=>{
        if(a.date_demande.localeCompare(b.date_demande))
        return 0
      })
    })
    
  }

  closed = true;

  loadData(event) {
    setTimeout(() => {

      this.demandeProvider.getDemandeByFilter({limit_debut:this.limit_debut,taille:this.taille}).subscribe(data=>{
        if(data)
        {
          let demandes = JSON.parse(JSON.stringify(data)).datas;
        if(isArray(demandes)){
          this.listdemandes.push(...demandes);
          if(demandes.length>0){
            this.limit_debut = this.limit_debut+this.taille;
          }
        }
        }
      },err=>{
        console.log(err)
        this.listdemandes=[];
      })
      console.log(event.ionInfinite.closed)
      // event.ionInfinite.closed = true;
      this.closed = false;
      setTimeout(() => {
        this.closed = true;
      }, 100);
      // Désactiver l'infinite scroll une fois que toutes les données sont chargées
      if (this.listdemandes.length >= 1000) {
        this.closed = false;
      }
    }, 500);
  }
}
