import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    this.currentBons = this.bons.query({
      nom_mag: val,
      bon_sort: val,
      date_sort:val,
      nom_mag_sort_dst:val
    });
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
