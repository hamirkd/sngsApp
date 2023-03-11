import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { isArray } from 'ionic-angular/util/util';
import { Client } from '../../../models/client';

import { Items } from '../../../providers';
import { ClientProvider } from '../../../providers/client/client.provider';

@IonicPage()
@Component({
  selector: 'page-list-client',
  templateUrl: 'list-client.html'
})
export class ListClientPage {

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController,private clientProvider:ClientProvider) {
    this.getAllClient();
  }

  
  listclients : Client[]=[];

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    this.getAllClient();
  }

  /**
   * Recupérer la liste des clients rejeter
   */
  getAllClient(){
    this.clientProvider.getCreancesgClients({limit_debut:this.limit_debut,taille:this.taille}).subscribe(data=>{
      if(data)
      {
        let clients = JSON.parse(JSON.stringify(data)).datas;
        this.listclients=[];
      if(isArray(clients)){
        this.listclients.push(...clients)}
      }
    },err=>{
      console.log(err)
      this.listclients=[];
    })
  }  

  /**
   * Navigate to the detail page for this item.
   */
  openItem(client: Client) {
    console.log(client)
    this.navCtrl.push('DetailClientPage', {
      client: client
    });
  }

  annuleItem(client: Client) {
    this.navCtrl.push('ClientMotifPage', {
      client: client
    })
  }
  
  refresh(event) {
    this.getAllClient();
    setTimeout(() => {
      if (event)
          event.complete();
    }, 3000);
  }
  limit_debut=0;
  taille=100;
  
  // getClients(ev) {
  //   let val = ev.target.value;
  //   console.log(this.listclients)
  //   if (!val || !val.trim()) {
  //     this.listclients = [];
  //     return;
  //   }
  //   this.listclients = this.clientProvider.query({
  //     code_fact: val,
  //     ref_fact_vnt: val,
  //     date_fact:val,
  //     login_caissier_fact:val,
  //     magasin:val,
  //   });
  // }
  
  searchClient(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.listclients = [];
      return;
    }

    this.clientProvider.getCreancesgClients({limit_debut:0,taille:20,nomclient:val}).subscribe(data=>{
      let client = JSON.parse(JSON.stringify(data)).datas;
      if(isArray(client)){this.listclients=client}
    })
    
  }

  closed = true;

  loadData(event) {
    setTimeout(() => {

      this.clientProvider.getCreancesgClients({limit_debut:this.limit_debut,taille:this.taille}).subscribe(data=>{
        if(data)
        {
          let clients = JSON.parse(JSON.stringify(data)).datas;
        if(isArray(clients)){
          this.listclients.push(...clients);
          if(clients.length>0){
            this.limit_debut = this.limit_debut+this.taille;
          }
        }
        }
      },err=>{
        console.log(err)
        this.listclients=[];
      })
      console.log(event.ionInfinite.closed)
      // event.ionInfinite.closed = true;
      this.closed = false;
      setTimeout(() => {
        this.closed = true;
      }, 100);
      // Désactiver l'infinite scroll une fois que toutes les données sont chargées
      if (this.listclients.length >= 1000) {
        this.closed = false;
      }
    }, 500);
  }
}
