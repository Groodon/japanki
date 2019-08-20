import { Component, OnInit } from '@angular/core';
import {CardService} from "../_services/card.service";
import Card from "../Card";
import {DeckService} from "../_services/deck.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CardOrders} from "../_models/app-enums";

@Component({
  selector: 'app-show-deck',
  templateUrl: './show-deck.component.html',
  styleUrls: ['./show-deck.component.css']
})
export class ShowDeckComponent implements OnInit {

  cards: Card[];
  CardOrders = CardOrders;
  deckId: string;
  newLineHtml(str) {
    return str.replace(/(?:\r\n|\r|\n)/g, '<br>');
  }

  constructor(private ds: DeckService, private cs: CardService, private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.deckId = this.route.snapshot.paramMap.get('id');
    this.ds
      .getDeck(this.deckId)
      .subscribe((data: Card[]) => {
        this.cards = data;
        this.cards.map((card) => {
          card['edit'] = false;
        });

        console.log(this.cards);
      });
  }

  deleteRow(id){
    for(let i = 0; i < this.cards.length; ++i){
      if (this.cards[i]._id === id) {
        this.cards.splice(i,1);
      }
    }
  }

  updateCard(card,  english_word, japanese_reading, kanji) {
    if (card.edit) {
      card.english_word = english_word;
      card.japanese_reading = japanese_reading;
      card.kanji = kanji;
      this.cs.updateCard(card);
    }
    card.edit = !card.edit;
  }

  deleteCard(id) {
    this.cs
      .deleteCard(id)
      .subscribe(
        res => {
          this.deleteRow(id);

        },
        error => {
          console.log(error);
        });
  }

  changeOrder(card, newOrder) {
    if (card.order !== newOrder) {
      card.order = newOrder;
      console.log(card);
      this.cs.updateCard(card);
    }
  }

}
