import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { FactureProvider } from '../../../providers/factures/facture.provider';

import { FactureMotifPage } from './motif';

@NgModule({
  declarations: [
    FactureMotifPage,
  ],
  imports: [
    IonicPageModule.forChild(FactureMotifPage),
    TranslateModule.forChild()
  ],
  exports: [
    FactureMotifPage
  ],
  providers:[
    FactureProvider
  ]
})
export class FactureMotifPageModule { }
