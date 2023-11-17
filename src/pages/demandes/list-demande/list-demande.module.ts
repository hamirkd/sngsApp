import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { DemandeProvider } from '../../../providers/demandes/demande.provider';
import { ListDemandePage } from './list-demande';


@NgModule({
  declarations: [
    ListDemandePage,
  ],
  imports: [
    IonicPageModule.forChild(ListDemandePage),
    TranslateModule.forChild()
  ],
  exports: [
    ListDemandePage
  ],
  providers: [
    
    DemandeProvider
  ]
})
export class ListPageModule { }
