import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { DemandeProvider } from '../../../providers/demandes/demande.provider';

import { DetailDemandePage } from './detail';

@NgModule({
  declarations: [
    DetailDemandePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailDemandePage),
    TranslateModule.forChild()
  ],
  exports: [
    DetailDemandePage
  ],
  providers:[DemandeProvider]
})
export class DetailDemandePageModule { }
