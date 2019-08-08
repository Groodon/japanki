import { Component, OnInit } from '@angular/core';
import {CardService} from "../_services/card.service";
import Card from "../Card";
import {DeckService} from "../_services/deck.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-show-deck',
  templateUrl: './show-deck.component.html',
  styleUrls: ['./show-deck.component.css']
})
export class ShowDeckComponent implements OnInit {

  cards: Card[];

  constructor(private ds: DeckService, private cs: CardService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.ds
      .getDeck(id)
      .subscribe((data: Card[]) => {
        this.cards = data;
      });
  }

  deleteRow(id){
    for(let i = 0; i < this.cards.length; ++i){
      if (this.cards[i]._id === id) {
        this.cards.splice(i,1);
      }
    }
  }

  deleteCard(id) {
    this.cs
      .deleteCard(id)
      .subscribe(
        res => {
          this.deleteRow(id);
          //this.showFlash("Card deleted", true);

        },
        error => {
          console.log(error);
        });
  }

}
