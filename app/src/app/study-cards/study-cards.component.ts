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

enum SHOW_OPTIONS {
  Reading,
  Kanji,
  Both
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
  revealed: boolean = false;
  DIFFICULTY = DIFFICULTY;
  STATUS = STATUS;
  CARD_STATUS = CARD_STATUS;
  SHOW_OPTIONS = SHOW_OPTIONS;
  CARD_ORDERS = CardOrders;
  status: number = STATUS.Loading;
  showing: number = SHOW_OPTIONS.Both;
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
        console.log(this.deck);
        this.createStudyDeck(deck.cards);
      });
  }

  // This function is to make a deck of cards that is easier to manage for this application
  // When a card has "both" orders, we make two cards out of it, one with each order; "JapEng" and "EngJap".
  // Some parameters are deleted from the card so this information does not change when card is sent to update on server.
  createStudyDeck(cards) {
    const now = moment().startOf('day');
    for (const card of cards) {
      if ((this.deck.order === CardOrders.Both || this.deck.order === CardOrders.JapEng) && moment(card.jap_eng_next_study_time)  <= now) {
        const copy1 = Object.assign({}, card);
        copy1.order = CardOrders.JapEng;
        this.cards.push(copy1);
      }
      if ((this.deck.order === CardOrders.Both || this.deck.order === CardOrders.EngJap) && moment(card.eng_jap_next_study_time)  <= now) {
        const copy2 = Object.assign({}, card);
        copy2.order = CardOrders.EngJap;
        this.cards.push(copy2);
      }
    }
    this.changeCard();
  }

  setNextStudyTime(newWaitTime) {
    const now = moment().startOf('day');
    if (this.currentOrder === CardOrders.EngJap) {
      this.currentCard.eng_jap_last_wait_time = newWaitTime;
      this.currentCard.eng_jap_next_study_time = now.add(newWaitTime, 'days').toString();
    } else {
      this.currentCard.jap_eng_last_wait_time = newWaitTime;
      this.currentCard.jap_eng_next_study_time = now.add(newWaitTime, 'days').toString();
    }
  }

  getNewWaitTime(difficulty, lastWaitTime) {
    switch (difficulty) {
      case DIFFICULTY.Easy: {
        return (this.currentCardStatus === this.CARD_STATUS.Completed && lastWaitTime === 0 ? 1 : (lastWaitTime === 0 ? 4 : lastWaitTime * 4));
      }
      case DIFFICULTY.Hard: {
        // If it is a new card and it was hard, let it come up once more until it delays a day.
        if (lastWaitTime === 0 && this.currentCardStatus === this.CARD_STATUS.New) {
          return 0;
        } else {
          return Math.floor(lastWaitTime*1.5 + 1);
        }
      }
      case DIFFICULTY.Fail: {
        return 0;
      }
    }
  }

  // Update the new wait time on card the user answered on, this is the time that the user will wait until this card will appear again.
  updateCardTime(newWaitTime) {
    this.setNextStudyTime(newWaitTime);
    this.cs.updateCard(this.currentCard, this.deckId);
  }
  

  updateCardStatus(difficulty) {
    switch (difficulty) {
      case DIFFICULTY.Easy: {
        if (this.currentOrder === this.CARD_ORDERS.EngJap) {
          this.currentCard.eng_jap_status = CARD_STATUS.Completed;
        } else {
          this.currentCard.jap_eng_status = CARD_STATUS.Completed;
        }
        break;
      }
      case DIFFICULTY.Hard: {
        // If it is a new card and it was hard, let it come up once more until it delays a day.
        if (this.currentOrder === this.CARD_ORDERS.EngJap && this.currentCardStatus === CARD_STATUS.New) {
          this.currentCard.eng_jap_status = CARD_STATUS.CompletedOnce;
        } else if (this.currentOrder === this.CARD_ORDERS.JapEng && this.currentCardStatus === CARD_STATUS.New) {
          this.currentCard.jap_eng_status = CARD_STATUS.CompletedOnce;
        }
        break;
      }
      case DIFFICULTY.Fail: {
        if (this.currentCardStatus === CARD_STATUS.CompletedOnce) {
          if (this.currentOrder === this.CARD_ORDERS.EngJap) {
            this.currentCard.eng_jap_status = CARD_STATUS.New;
          } else {
            this.currentCard.jap_eng_status = CARD_STATUS.New;
          }
        }
        break;
      }
    }
  }

  changeCard(difficulty?) {
    // Update the last cards progress, if such exists
    if (difficulty) {
      // Get the new amount of days until the next study session with this card and update the current card
      const lastWaitTime = (this.currentOrder === CardOrders.EngJap ? this.currentCard.eng_jap_last_wait_time : this.currentCard.jap_eng_last_wait_time);
      const newWaitTime = this.getNewWaitTime(difficulty, lastWaitTime);
      this.updateCardTime(newWaitTime);
      this.updateCardStatus(difficulty);
      this.cards[this.currentCardIndex] = this.currentCard;
      // Remove card from study deck if the new time is more than 0
      if (newWaitTime > 0) {
        this.cards.splice(this.currentCardIndex, 1);
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
    this.currentCardIndex = Math.floor(Math.random() * size);
    this.currentCard = this.cards[this.currentCardIndex];

    // So we can easily access these values in the html
    this.currentOrder = this.currentCard.order;
    this.currentCardStatus = (this.currentOrder === CardOrders.JapEng ? this.currentCard.jap_eng_status : this.currentCard.eng_jap_status);
    this.last_wait_time = (this.currentOrder === CardOrders.JapEng ? this.currentCard.jap_eng_last_wait_time : this.currentCard.eng_jap_last_wait_time);

    this.revealed = false;
  }

  updateCard(english_word, japanese_reading, kanji) {
    let newCard = {};
    newCard['_id'] = this.currentCard._id;
    newCard['english_word'] = english_word;
    newCard['japanese_reading'] = japanese_reading;
    newCard['kanji'] = kanji;
    this.currentCard.english_word = english_word;
    this.currentCard.japanese_reading = japanese_reading;
    this.currentCard.kanji = kanji;
    this.cs.updateCard(newCard, this.deckId);
    this.edit = !this.edit;
  }

}


