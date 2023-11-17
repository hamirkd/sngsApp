import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { DemandeProvider } from '../../../providers/demandes/demande.provider';

import { DemandeMotifPage } from './motif-demande';

@NgModule({
  declarations: [
    DemandeMotifPage,
  ],
  imports: [
    IonicPageModule.forChild(DemandeMotifPage),
    TranslateModule.forChild()
  ],
  exports: [
    DemandeMotifPage
  ],
  providers:[
    DemandeProvider
  ]
})
export class DemandeMotifPageModule { }
