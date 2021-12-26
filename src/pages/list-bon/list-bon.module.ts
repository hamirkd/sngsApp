import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ListBonPage } from './list-bon';

@NgModule({
  declarations: [
    ListBonPage,
  ],
  imports: [
    IonicPageModule.forChild(ListBonPage),
    TranslateModule.forChild()
  ],
  exports: [
    ListBonPage
  ]
})
export class ListBonPageModule { }
