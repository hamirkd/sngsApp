import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { isArray } from 'ionic-angular/util/util';
import { Api } from "..";
import { Bon } from "../../models/bon";
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
 
  updateStatic(){
    this.getFactureByFilter({}).subscribe(data=>{
      let factures = JSON.parse(JSON.stringify(data)).datas;
      if(isArray(factures)){
      this.factures=factures;
      this.factures.sort((a,b)=>{if(a.date_fact.localeCompare(b.date_fact))return 0})}
    })
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
