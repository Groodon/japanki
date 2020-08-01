import {Component, OnInit} from '@angular/core';
import Card from "../_models/Card";
import {DeckService} from "../_services/deck.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as moment from 'moment';
import {CardService} from "../_services/card.service";
import {CardOrders} from "../_models/app-enums"
import Deck from '../_models/Deck';

enum DIFFICULTY {
  Fail = 1,
  Hard = 2,
  Easy = 3
}

enum STATUS {
  Loading,
  Studying,
  Finished
}

enum CARD_STATUS {
  New = 0,
  CompletedOnce = 1,
  Completed = 2
}

@Component({
  selector: 'app-study-cards',
  templateUrl: './study-cards.component.html',
  styleUrls: ['./study-cards.component.css']
})
export class StudyCardsComponent implements OnInit {

  cards: Card[] = [];
  currentCard: Card = Object.create(Card);
  currentOrder: number;
  currentCardIndex: number;
  waitTimes: Object;
  revealed: boolean = false;
  DIFFICULTY = DIFFICULTY;
  STATUS = STATUS;
  CARD_STATUS = CARD_STATUS;
  CARD_ORDERS = CardOrders;
  status: number = STATUS.Loading;
  hideHiragana: boolean;
  last_wait_time: number;
  edit: boolean = false;
  deckId: string;
  deck: Deck;
  currentCardStatus: number;

  constructor(private ds: DeckService, private route: ActivatedRoute, private cs: CardService, public router: Router) { }

  ngOnInit() {
    this.deckId = this.route.snapshot.paramMap.get('id');
    this.ds
      .getDeck(this.deckId)
      .subscribe((deck: any) => {
        this.deck = deck;
        this.hideHiragana = deck.hide_hiragana;
        this.createStudyDeck(deck);
        console.log(deck);
      });
  }


  // This function is to make a deck of cards that is easier to manage for this application
  // When a card has "both" orders, we make two cards out of it, one with each order; "JapEng" and "EngJap".
  // Some parameters are deleted from the card so this information does not change when card is sent to update on server.
  createStudyDeck(deck) {
    this.cards = this.ds.getCompleteStudyDeck(deck);
    this.changeCard();
  }

  changeCard(difficulty?) {
    // Update the last cards progress, if such exists
    if (difficulty) {
      let newCard = this.cs.getUpdatedCard(this.currentCard, difficulty);
      this.cs.updateStudiedCard(this.currentCard, difficulty, this.deckId);
      
      // Remove card from study deck
      this.cards = this.cards.filter((card) => {
        return card._id !== this.currentCard._id && this.currentCard.order === card.order;
      })
      
      // Add the new version if we did not finish it
      if (!this.cs.shouldBeRemoved(this.currentCard, difficulty)) {
        this.cards.push(newCard);
      }
    }
    
    let size = this.cards.length;
    if (size === 0) {
      this.status = STATUS.Finished;
      return;
    } else {
      this.status = STATUS.Studying;
    }

    // Select random card
    this.currentCard = this.cs.getNextStudyCard(this.cards);
    console.log(this.currentCard);

    // So we can easily access these values in the html
    this.currentOrder = this.currentCard.order;
    this.currentCardStatus = (this.currentOrder === CardOrders.JapEng ? this.currentCard.jap_eng_status : this.currentCard.eng_jap_status);
    this.last_wait_time = (this.currentOrder === CardOrders.JapEng ? this.currentCard.jap_eng_last_wait_time : this.currentCard.eng_jap_last_wait_time);

    this.revealed = false;
  }

  updateCard(english_word, japanese_reading, kanji) {
    this.currentCard.english_word = english_word;
    this.currentCard.japanese_reading = japanese_reading;
    this.currentCard.kanji = kanji;
    this.cs.updateCard(this.currentCard, this.deckId).subscribe();
    this.edit = !this.edit;
  }

}


