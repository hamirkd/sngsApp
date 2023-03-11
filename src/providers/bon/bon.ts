import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { isArray } from 'ionic-angular/util/util';
import { Api } from "..";
import { Bon } from "../../models/bon";

/*
  Generated class for the BonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BonProvider {
  constructor(public api: Api, public storage: Storage) {}
  bons:Bon[]=[];
  getBonRejeter() {
    let seq = this.api
      .get("app/core/sortie.class.php?x=getaSortiesRejeter")
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

  getBonAll() {
    let seq = this.api.get("app/core/sortie.class.php?x=getaSorties").share();

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
    this.getBonAll().subscribe(data=>{
      let bons = JSON.parse(JSON.stringify(data)).datas;
      if(isArray(bons)){
      this.bons=bons;
      this.bons.sort((a,b)=>{if(a.date_sort.localeCompare(b.date_sort))return 0})}
    })
  }

  getBonEnAttente() {
    let seq = this.api
      .get("app/core/sortie.class.php?x=getSortiesAttentes")
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

  getBonDetail(bon) {
    let seq = this.api
      .post("app/core/sortie.class.php?x=showSortDetails", bon)
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

  searchBon(numerobon) {
    console.log(numerobon)
    let seq = this.api
      .post("app/core/sortie.class.php?x=searchBon", {numerobon:numerobon})
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
  

  query(params?: any) {
    if (!params) {
      return this.bons;
    }
    console.log(params)

    return this.bons.filter((item) => {
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
