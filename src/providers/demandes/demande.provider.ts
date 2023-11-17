import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Api } from "..";
import { Demande } from "../../models/demande";

/*
  Generated class for the BonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DemandeProvider {
  constructor(public api: Api, public storage: Storage) {}
  demandes:Demande[]=[];
  getDemandeByFilter(demande) {
    let seq = this.api
      .post("app/core/apimobile/demande.class.php?x=getEtatDemandes", demande)
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

  getDemandesByRole(role){
    
    let seq = this.api
    .post("app/core/apimobile/demande.class.php?x=getDemandesByRole",{role: role})
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
 * @param demande 
 * Role : 'RESP'|'RESPACHAT'
 * @returns 
 */
  demandeRejeterOrAccepter(demande:{motif,id_dem, action, role}){
    
    let seq = this.api
    .post("app/core/apimobile/demande.class.php?x=actionSurDemande", demande)
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
  

  

  searchDemande(demandefilter) {
    let seq = this.api
      .post("app/core/apimobile/vente.class.php?x=searchDemande", demandefilter)
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
      return this.demandes;
    }
 
    return this.demandes.filter((item) => {
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
