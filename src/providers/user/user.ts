import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { Storage } from '@ionic/storage';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;

  constructor(public api: Api, public storage: Storage) {
    storage.get("user").then(data=>{
      this._user=JSON.parse(data);
    })
   }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   * accountInfo :{login,password}
   */
  login(accountInfo: any) {
    
    let seq = this.api.post('app/core/frontController.php?x=login', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
       
        if(res['status']!=1) this._loggedIn(res.datas);
      
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('signup', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this.initData();
    
  }
  initData() {
    this._user = null;
    this.storage.remove("user_connexion_data");
    this.storage.remove("user");
    this.storage.remove("permission");
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp;
    this.storage.set("user", JSON.stringify(this._user));
  }
}
