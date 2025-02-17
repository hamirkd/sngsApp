import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Api } from "..";
import { Facture } from "../../models/facture";

/*
  Generated class for the BonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FactureProvider {
  constructor(public api: Api, public storage: Storage) {}
  factures:Facture[]=[];
  getFactureByFilter(facture) {
    let seq = this.api
      .post("app/core/apimobile/vente.class.php?x=getVentes", facture)
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

  getfactureDetail(facture){
    
    let seq = this.api
    .post("app/core/apimobile/vente.class.php?x=getfactureDetail", facture)
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

  factureAnnulation(facture:{motif,id_fact}){
    
    let seq = this.api
    .post("app/core/apimobile/annulation.class.php?x=undoFacture", facture)
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
  

  

  searchFacture(facturefilter) {
    let seq = this.api
      .post("app/core/apimobile/vente.class.php?x=searchFacture", facturefilter)
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
      return this.factures;
    }
 
    return this.factures.filter((item) => {
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
