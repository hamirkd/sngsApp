import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { BonMotifPage } from './bon-motif';

@NgModule({
  declarations: [
    BonMotifPage,
  ],
  imports: [
    IonicPageModule.forChild(BonMotifPage),
    TranslateModule.forChild()
  ],
  exports: [
    BonMotifPage
  ]
})
export class BonMotifPageModule { }
