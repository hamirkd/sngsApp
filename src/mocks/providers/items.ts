import { Injectable } from '@angular/core';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };


  constructor() {
    let items = [
      {
        "name": "MAG10",
        "profilePic": "assets/img/speakers/bear.jpg",
        "date_": "11/02/2021",
        "note":"Reject",
        "motif":"Nombre d'article incorrect",
        "stocks":[
          {
            id:1,
            name:'Chambre à aire Charlie is a Cheetah.',
            quantite:10
          },
          {
            id:2,
            name:'Pneu',
            quantite:14
          },
          {
            id:3,
            name:'Huile à moteur',
            quantite:21
          },
          {
            id:4,
            name:'Ordinateur',
            quantite:5
          },
        ]
      },
      {
        "name": "SAM",
        "profilePic": "assets/img/speakers/cheetah.jpg",
        "date_": "12/12/2021",
        "note":"En attente",
        "stocks":[
          {
            id:1,
            name:'Chambre à aire Charlie is a Cheetah.',
            quantite:10
          },
          {
            id:2,
            name:'Pneu',
            quantite:14
          },
          {
            id:3,
            name:'Huile à moteur',
            quantite:21
          },
          {
            id:4,
            name:'Ordinateur',
            quantite:5
          },
        ]
      },
      {
        "name": "ETYF",
        "profilePic": "assets/img/speakers/duck.jpg",
        "date_": "14/12/2021",
        "note":"Reject",
        "motif":"Nombre d'article incorrect"
      },
      {
        "name": "MAG10",
        "profilePic": "assets/img/speakers/eagle.jpg",
        "date_": "Eva is an Eagle.",
        "note":"En attente"
      },
      {
        "name": "MAG11",
        "profilePic": "assets/img/speakers/elephant.jpg",
        "date_": "31/05/2021",
        "note":"Reject",
        "motif":"Nombre d'article incorrect"
      }
    ];

    for (let item of items) {
      this.items.push(new Item(item));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
