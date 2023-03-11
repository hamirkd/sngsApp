import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientProvider } from '../../../providers/client/client.provider';
import { ListClientPage } from './list-client';


@NgModule({
  declarations: [
    ListClientPage,
  ],
  imports: [
    IonicPageModule.forChild(ListClientPage),
    TranslateModule.forChild()
  ],
  exports: [
    ListClientPage
  ],
  providers: [
    ClientProvider
  ]
})
export class ListClientPageModule { }
