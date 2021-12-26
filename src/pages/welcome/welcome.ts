import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { TranslateService } from "@ngx-translate/core";
import { IonicPage, NavController, ToastController } from "ionic-angular";
import { MainPage } from "..";
import { User } from "../../providers";

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
 */
@IonicPage()
@Component({
  selector: "page-welcome",
  templateUrl: "welcome.html",
})
export class WelcomePage {
  constructor(
    public navCtrl: NavController,
    storage: Storage,
    public user: User,
    public toastCtrl: ToastController,
    private translateService: TranslateService
  ) {
    storage.get("user_connexion_data").then((data) => {
      if (JSON.parse(data)) {
        this.user.login(JSON.parse(data)).subscribe((resp) => {
          this.navCtrl.push(MainPage);

          this.translateService
            .get("BIENVENUE_PARMIS_NOUS")
            .subscribe((value) => {
              let toast = this.toastCtrl.create({
                message: value,
                duration: 3000,
                position: "top",
              });
              toast.present();
            });
        });
      }
    });
  }

  login() {
    this.navCtrl.push("LoginPage");
  }

  signup() {
    this.navCtrl.push("SignupPage");
  }
  
}
