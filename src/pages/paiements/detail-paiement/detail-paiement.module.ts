import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { PaiementProvider } from '../../../providers/paiements/paiement.provider';

import { DetailPaiementPage } from './detail-paiement';

@NgModule({
  declarations: [
    DetailPaiementPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailPaiementPage),
    TranslateModule.forChild()
  ],
  exports: [
    DetailPaiementPage
  ],
  providers:[PaiementProvider]
})
export class DetailPaiementPageModule { }
