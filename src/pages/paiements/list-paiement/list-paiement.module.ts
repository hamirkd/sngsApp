import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { PaiementProvider } from '../../../providers/paiements/paiement.provider';
import { ListPaiementPage } from './list-paiement';
import { SMS } from '@ionic-native/sms/ngx';


@NgModule({
  declarations: [
    ListPaiementPage,
  ],
  imports: [
    IonicPageModule.forChild(ListPaiementPage),
    TranslateModule.forChild()
  ],
  exports: [
    ListPaiementPage
  ],
  providers: [
    
    PaiementProvider, SMS
  ]
})
export class ListPageModule { }
