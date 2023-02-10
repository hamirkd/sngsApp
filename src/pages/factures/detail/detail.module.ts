import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { FactureProvider } from '../../../providers/factures/facture.provider';

import { DetailFacturePage } from './detail';

@NgModule({
  declarations: [
    DetailFacturePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailFacturePage),
    TranslateModule.forChild()
  ],
  exports: [
    DetailFacturePage
  ],
  providers:[FactureProvider]
})
export class DetailFacturePageModule { }
