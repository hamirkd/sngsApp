import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Api } from '..';

/*
  Generated class for the BonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BonProvider {

  constructor(public api: Api, public storage: Storage) {
   
   }

   getBonRejeter() {
    
    let seq = this.api.get('app/core/sortie.class.php?x=getaSortiesRejeter').share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      console.log(res)
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  getBonEnAttente() {
   
   let seq = this.api.get('app/core/sortie.class.php?x=getSortiesAttentes').share();

   seq.subscribe((res: any) => {
     // If the API returned a successful response, mark the user as logged in
     console.log(res)
   }, err => {
     console.error('ERROR', err);
   });

   return seq;
 }
 getBonDetail(bon){
   
  let seq = this.api.post('app/core/sortie.class.php?x=showSortDetails',bon).share();

  seq.subscribe((res: any) => {
    // If the API returned a successful response, mark the user as logged in
    console.log(res)
  }, err => {
    console.error('ERROR', err);
  });

  return seq;
 }
  

}
