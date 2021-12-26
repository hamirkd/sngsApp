import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item } from '../../models/item';

import { Items } from '../../providers';
import { BonProvider } from '../../providers/bon/bon';

@IonicPage()
@Component({
  selector: 'page-bon-detail',
  templateUrl: 'bon-detail.html'
})
export class BonDetailPage {
  bon: any;

  constructor(public navCtrl: NavController, navParams: NavParams, bons: Items,private bonService:BonProvider) {
    this.bon = navParams.get('bon');
    if(!this.bon)return;
  }
  
  ionViewDidLoad() {
    if(!this.bon)return;
    this.bonService.getBonDetail(this.bon).subscribe(data=>{
      console.log(data)
      this.bon.stocks = JSON.parse(JSON.stringify(data)).datas;
    })
  }

  
  rejeter(bon: Item) {
    
    this.navCtrl.push('BonMotifPage', {
      bon: bon
    });
  }
  accepter(bon: Item) {
    
  }
  renvoyer(bon: Item) {
    
  }


}
