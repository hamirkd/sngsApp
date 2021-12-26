import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';

import { Settings, User } from '../../providers';

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  // Our local settings object

  settingsReady = false;
  langue:any;

  constructor(public navCtrl: NavController,
    public settings: Settings,
    public formBuilder: FormBuilder,public appCtrl: App,
    public navParams: NavParams,
    public translate: TranslateService,private userService:User) {
  }

  ionViewDidLoad() {
    // Build an empty form for the template to render
  }

  ionViewWillEnter() {
    // Build an empty form for the template to render

    this.settings.load().then(() => {
      this.settingsReady = true;
      this.langue = this.settings.allSettings.langue
    });
  }

  ngOnChanges() {
    console.log('Ng All Changes');
  }
  logout(){
    this.userService.logout();
    this.appCtrl.getRootNav().push('WelcomePage');
  }
  changerLangue(langue){
    this.settings.setValue("langue",langue);
    this.translate.use(langue);
    this.appCtrl.getRootNav().push('WelcomePage');
  }
}
