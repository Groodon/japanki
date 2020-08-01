import { Component, OnInit } from '@angular/core';
import {CardService} from "../_services/card.service";
import Card from "../_models/Card";
import {DeckService} from "../_services/deck.service";
import {ActivatedRoute, Router} from "@angular/router";
import Deck from '../_models/Deck';

@Component({
  selector: 'app-show-deck',
  templateUrl: './show-deck.component.html',
  styleUrls: ['./show-deck.component.css']
})
export class ShowDeckComponent implements OnInit {

  cards: Card[];
  deckId: string;
  deck: Deck;
  newLineHtml(str) {
    return str.replace(/(?:\r\n|\r|\n)/g, '<br>');
  }

  constructor(private ds: DeckService, private cs: CardService, private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.deckId = this.route.snapshot.paramMap.get('id');
    this.ds
      .getDeck(this.deckId)
      .subscribe((deck: any) => {
        this.deck = deck;
        this.cards = deck.cards;
        this.cards.map((card) => {
          card['edit'] = false;
        });
      });
  }

  goBack() {
    console.log("d", this.deck);
    if (this.deck.shared) {
      this.router.navigate(['/shared']);
    } else {
      this.router.navigate(['/decks/all']);
    }
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
      this.cs.updateCard(card, this.deckId).subscribe();
    }
    card.edit = !card.edit;
  }

  deleteCard(cardId) {
    this.cs
      .deleteCard(cardId, this.deckId)
      .subscribe(
        res => {
          this.deleteRow(cardId);

        },
        error => {
          console.log(error);
        });
  }


}
