import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Api } from "..";
import { Paiement } from "../../models/paiement";

/*
  Generated class for the BonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PaiementProvider {
  constructor(public api: Api, public storage: Storage) {}
  paiements:Paiement[]=[];
  getPaiementByFilter(paiement) {
    let seq = this.api
      .post("app/core/paiement.class.php?x=getEtatPaiements", paiement)
      .share();
    seq.subscribe(
      (res: any) => {
        // If the API returned a successful response, mark the user as logged in
        console.log(res);
      },
      (err) => {
        console.error("ERROR", err);
      }
    );

    return seq;
  }

  getPaiements(){
    
    let seq = this.api
    .get("app/core/paiement.class.php?x=getPaiements")
    .share();

    seq.subscribe(
      (res: any) => {
        // If the API returned a successful response, mark the user as logged in
        console.log(res);
      },
      (err) => {
        console.error("ERROR", err);
      }
    );

  return seq;
  }
/**
 * 
 * @param paiement 
 * Role : 'RESP'|'RESPACHAT'
 * @returns 
 */
  paiementRejeterOrAccepter(paiement:{motif,id_dem, action, role}){
    
    let seq = this.api
    .post("app/core/paiement.class.php?x=actionSurPaiement", paiement)
    .share();

    seq.subscribe(
      (res: any) => {
        // If the API returned a successful response, mark the user as logged in
        console.log(res);
      },
      (err) => {
        console.error("ERROR", err);
      }
    );
  return seq;
  }
  

  

  searchPaiement(paiementfilter) {
    let seq = this.api
      .post("app/core/paiement.class.php?x=searchPaiement", paiementfilter)
      .share();

    seq.subscribe(
      (res: any) => {
        // If the API returned a successful response, mark the user as logged in
        console.log(res);
      },
      (err) => {
        console.error("ERROR", err);
      }
    );

    return seq;
  }
  

  
  getVentesSearch(){

  }

  query(params?: any) {
    if (!params) {
      return this.paiements;
    }
 
    return this.paiements.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (
          typeof field == "string" &&
          field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0
        ) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }
}
