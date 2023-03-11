import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientProvider } from '../../../providers/client/client.provider';

import { DetailClientPage } from './detail-client';

@NgModule({
  declarations: [
    DetailClientPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailClientPage),
    TranslateModule.forChild()
  ],
  exports: [
    DetailClientPage
  ],
  providers:[ClientProvider]
})
export class DetailClientPageModule { }
