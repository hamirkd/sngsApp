import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { BonDetailPage } from './bon-detail';

@NgModule({
  declarations: [
    BonDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BonDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    BonDetailPage
  ]
})
export class BonDetailPageModule { }
