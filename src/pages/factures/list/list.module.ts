import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { FactureProvider } from '../../../providers/factures/facture.provider';
import { ListFacturePage } from './list';


@NgModule({
  declarations: [
    ListFacturePage,
  ],
  imports: [
    IonicPageModule.forChild(ListFacturePage),
    TranslateModule.forChild()
  ],
  exports: [
    ListFacturePage
  ],
  providers: [
    
    FactureProvider
  ]
})
export class ListPageModule { }
