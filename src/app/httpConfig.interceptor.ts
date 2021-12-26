//httpConfig.interceptor.ts
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
  } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { Injectable } from '@angular/core';
  import { User } from '../providers';
  import { map, catchError } from 'rxjs/operators';
  import { Storage } from '@ionic/storage';
  import { App } from 'ionic-angular';
  
  import {  User as UserService } from '../providers';
  @Injectable()
  export class HttpConfigInterceptor implements HttpInterceptor {
  
    constructor(public storage: Storage,
      public appCtrl: App,private userService:UserService) { }
  
  
  
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
  
      const token = this.userService._user ? this.userService._user.token : '';
      const userId = this.userService._user ? this.userService._user.id_user : '';
      // console.log(this.user._user)
      // const token = '';
      // const token_type = '';
      //Authentication by setting header with token value
      // console.log(token_type+' '+token)
  
      if (token) {
        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
      }
      if(userId){
        request = request.clone({ headers: request.headers.set('userData', JSON.stringify(this.userService._user)) });
      }
    //   console.log("Intercept")
  
  
      // return next.handle(request);
  
  
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log('event--->>>', event);
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
  
          if (error.status == 401) {
             this.userService.initData();
            if (!localStorage.getItem("redirection")) {
              this.appCtrl.getRootNav().push('LoginPage');
              localStorage.setItem("redirection", "ok")
            }
          }
          throw (error);
        }));
    }
  
  
  }