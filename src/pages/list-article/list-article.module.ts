import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ListArticlePage } from './list-article';

@NgModule({
  declarations: [
    ListArticlePage,
  ],
  imports: [
    IonicPageModule.forChild(ListArticlePage),
    TranslateModule.forChild()
  ],
  exports: [
    ListArticlePage
  ]
})
export class ListArticlePageModule { }
