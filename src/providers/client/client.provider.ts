import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Api } from "..";
import { Client } from "../../models/client";

/*
  Generated class for the BonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClientProvider {
  constructor(public api: Api, public storage: Storage) {}
  clients:Client[]=[];
  getCreancesgClients(client) {
    let seq = this.api
      .post("app/core/apimobile/reglement.class.php?x=getCreancesgClients", client)
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

  getclientDetail(client_id){
    
    let seq = this.api
    .get("app/core/apimobile/reglement.class.php?x=getCreancegDetails&&id_clt="+client_id)
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
 
  

  

  searchClient(clientfilter) {
    let seq = this.api
      .post("app/core/apimobile/vente.class.php?x=searchClient", clientfilter)
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
      return this.clients;
    }
 
    return this.clients.filter((item) => {
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
