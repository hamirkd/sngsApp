import { Component, ViewChild } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { TranslateService } from "@ngx-translate/core";
import { Config, Nav, Platform } from "ionic-angular";

import { FirstRunPage, HomeRunPage } from "../pages";
import { Settings } from "../providers";

@Component({
  template: `<ion-menu [content]="content" type="overlay">
      <ion-header>
        <ion-toolbar>
          <ion-title>Pages</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <ion-list>
          <button
            menuClose
            ion-item
            *ngFor="let p of pages"
            (click)="openPage(p)"
          >
            {{ p.title }}
          </button>
        </ion-list>
      </ion-content>
    </ion-menu>
    <ion-nav #content [root]="rootPage"></ion-nav>`,
})
export class MyApp {
  rootPage = HomeRunPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: "Tutorial", component: "TutorialPage" },
    { title: "Welcome", component: "WelcomePage" },
    { title: "Tabs", component: "TabsPage" },
    { title: "Cards", component: "CardsPage" },
    { title: "Content", component: "ContentPage" },
    { title: "Login", component: "LoginPage" },
    { title: "Signup", component: "SignupPage" },
    { title: "Master Detail", component: "ListMasterPage" },
    { title: "Menu", component: "MenuPage" },
    { title: "Settings", component: "SettingsPage" },
    { title: "Search", component: "SearchPage" },
  ];
  settingData: any;
  constructor(
    private translate: TranslateService,
    platform: Platform,
    public settings: Settings,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    settings.load().then((d) => {
      if (
        !settings.allSettings.TutoralNoActif ||
        settings.allSettings.TutoralNoActif == "no"
      ) {
        this.rootPage = FirstRunPage;
      }
      this.initTranslate();
    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang("en");
    let browserLang = this.translate.getBrowserLang();
    this.translate.getDefaultLang();
    if (this.settings.allSettings.langue) {
      browserLang = this.settings.allSettings.langue;
    }

    if (browserLang) {
      if (browserLang === "zh") {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use("zh-cmn-Hans");
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use("zh-cmn-Hant");
        }
      } else {
        this.translate.use(browserLang);
      }
    } else {
      this.translate.use("en"); // Set your language here
    }

    this.translate.get(["BACK_BUTTON_TEXT"]).subscribe((values) => {
      this.config.set("ios", "backButtonText", values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
