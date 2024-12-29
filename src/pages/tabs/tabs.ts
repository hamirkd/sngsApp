import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Tab0Root, Tab1Root, Tab2Root, Tab3Root, Tab4Root, Tab5Root } from '../';
import {  User as UserService } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab0Root: any = Tab0Root;
  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;
  tab4Root: any = Tab4Root;
  tab5Root: any = Tab5Root;
  activeValidation = false;
  activeValidation0 = true;
  activePaiement = false;

  // tab1Title = " ";
  // tab2Title = " ";
  // tab3Title = " ";
  // tab4Title = " ";

  constructor(public navCtrl: NavController, public translateService: TranslateService,private userService: UserService) {
    // translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE', 'TAB4_TITLE']).subscribe(values => {
    //   this.tab1Title = values['TAB1_TITLE'];
    //   this.tab2Title = values['TAB2_TITLE'];
    //   this.tab3Title = values['TAB3_TITLE'];
    //   this.tab4Title = values['TAB4_TITLE'];
    // });
    if(this.userService._user.droit_validateur_demande && this.userService._user.droit_validateur_demande !=='NO'){
      this.activeValidation = true;
      // this.activeValidation0 = true;
    }
    else {
      // this.activeValidation0 = true;
    }
    
    if(this.userService._user.droit_paiement){
      this.activePaiement = true;
      // this.activeValidation0 = true;
    } else {
      this.activePaiement = false;
    }
  }
}
