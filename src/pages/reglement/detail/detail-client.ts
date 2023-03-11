import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Items } from '../../../providers';
import { ClientProvider } from '../../../providers/client/client.provider';

@IonicPage()
@Component({
  selector: 'page-detail-client',
  templateUrl: 'detail-client.html'
})
export class DetailClientPage {
  client: any;

  constructor(public navCtrl: NavController, navParams: NavParams, clients: Items,private clientService:ClientProvider) {
    this.client = navParams.get('client');
    if(!this.client)return;
  }
  liste_item = []
  
  ionViewDidLoad() {
    if(!this.client)return;
    this.clientService.getclientDetail(this.client.id_clt).subscribe(data=>{
      this.liste_item = JSON.parse(JSON.stringify(data)).datas;
    })
  }

}
