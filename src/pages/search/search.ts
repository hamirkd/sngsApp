import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { isArray } from 'ionic-angular/util/util';
import { Bon } from '../../models/bon';

import { BonProvider } from '../../providers/bon/bon';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentBons: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public bons: BonProvider) { }

  /**
   * Perform a service for the proper bons.
   */
  
   ionViewDidLoad() {
    this.bons.updateStatic();
  }
  getBons(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentBons = [];
      return;
    }

    this.bons.searchBon(val).subscribe(data=>{
      console.log(data)
      let bons = JSON.parse(JSON.stringify(data)).datas;
      if(isArray(bons)){this.currentBons=bons}
      this.currentBons.sort((a,b)=>{
        if(a.date_sort.localeCompare(b.date_sort))
        return 0
      })
    })
    

  }

  /**
   * Navigate to the detail page for this item.
   */
  openBon(bon: Bon) {
    this.navCtrl.push('BonDetailPage', {
      bon: bon
    });
  }

}
