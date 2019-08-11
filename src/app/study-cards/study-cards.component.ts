import {Component, OnInit} from '@angular/core';
import Card from "../Card";
import {DeckService} from "../_services/deck.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as moment from 'moment';
import {CardService} from "../_services/card.service";
import {CardOrders} from "../_models/app-enums"

enum DIFFICULTY {
  Fail,
  Hard,
  Easy
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

@Component({
  selector: 'app-study-cards',
  templateUrl: './study-cards.component.html',
  styleUrls: ['./study-cards.component.css']
})
export class StudyCardsComponent implements OnInit {

  cards: Card[] = [];
  current_card: Card = Object.create(Card);
  currentOrder: number;
  current_card_index: number;
  revealed: boolean = false;
  DIFFICULTY = DIFFICULTY;
  STATUS = STATUS;
  SHOW_OPTIONS = SHOW_OPTIONS;
  CARD_ORDERS = CardOrders;
  status: number = STATUS.Loading;
  showing: number = SHOW_OPTIONS.Both;
  last_wait_time: number;
  edit: boolean = false;

  constructor(private ds: DeckService, private route: ActivatedRoute, private cs: CardService, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.ds
      .getDeck(id)
      .subscribe((cards: Card[]) => {
        this.createStudyDeck(cards);
      });
  }

  // This function is to make a deck of cards that is easier to manage for this application
  // When a card has "both" orders, we make two cards out of it, one with each order; "JapEng" and "EngJap".
  // Some parameters are deleted from the card so this information does not change when card is sent to update on server.
  createStudyDeck(cards) {
    let now = moment().startOf('day');
    for (let card of cards) {
      if ((card.order === CardOrders.Both || card.order === CardOrders.JapEng) && moment(card.jap_eng_next_study_time,'MM/DD/YYYY')  <= now) {
        let copy1 = Object.assign({}, card);
        copy1.order = CardOrders.JapEng;
        delete copy1.eng_jap_last_wait_time;
        delete copy1.eng_jap_next_study_time;
        this.cards.push(copy1)
      }
      if ((card.order == CardOrders.Both || card.order === CardOrders.EngJap) && moment(card.eng_jap_next_study_time,'MM/DD/YYYY')  <= now) {
        let copy2 = Object.assign({}, card);
        copy2.order = CardOrders.EngJap;
        delete copy2.jap_eng_last_wait_time;
        delete copy2.jap_eng_next_study_time;
        this.cards.push(copy2);
      }
    }
    this.changeCard();
  }

  getNewWaitTime(difficulty, lastWaitTime) {
    switch(difficulty) {
      case DIFFICULTY.Easy: {
        return (lastWaitTime === 0 ? 4 : lastWaitTime * 4);
      }
      case DIFFICULTY.Hard: {
        return (lastWaitTime === 0 ? 1 : lastWaitTime * 2);
      }
      case DIFFICULTY.Fail: {
        return 0;
        break;
      }
    }
  }

  setNextStudyTime(newWaitTime) {
    if (this.currentOrder === CardOrders.EngJap) {
      this.current_card.eng_jap_last_wait_time = newWaitTime;
      this.current_card.eng_jap_next_study_time = moment(this.current_card.eng_jap_next_study_time,'MM/DD/YYYY')
        .add(newWaitTime, 'days').toString();
    } else {
      this.current_card.jap_eng_last_wait_time = newWaitTime;
      this.current_card.jap_eng_next_study_time = moment(this.current_card.jap_eng_next_study_time,'MM/DD/YYYY')
        .add(newWaitTime, 'days').toString();
    }
  }

  // Update the new wait time on card the user answered on, this is the time that the user will wait until this card will appear again.
  updateCardTime(difficulty) {
    // Get the new amount of days until the next study session with this card and update the current card
    let lastWaitTime = (this.currentOrder === CardOrders.EngJap ? this.current_card.eng_jap_last_wait_time : this.current_card.jap_eng_last_wait_time);
    let newWaitTime = this.getNewWaitTime(difficulty, lastWaitTime);
    this.setNextStudyTime(newWaitTime);

    // Delete this parameter so wrong information is not updated on cards on server
    delete this.current_card.order;

    this.cs.updateCard(this.current_card);
    this.cards.splice(this.current_card_index, 1);
  }

  changeCard(difficulty?) {
    // Update the last cards progress
    if (difficulty)
      this.updateCardTime(difficulty);

    let size = this.cards.length;
    if (size === 0) {
      this.status = STATUS.Finished;
      return;
    } else {
      this.status = STATUS.Studying;
    }

    // Select random card
    this.current_card_index = Math.floor(Math.random()*size);
    this.current_card = this.cards[this.current_card_index];

    // So we can easily access these values in the html
    this.currentOrder = this.current_card.order;
    this.last_wait_time = (this.currentOrder === CardOrders.JapEng ? this.current_card.jap_eng_last_wait_time : this.current_card.eng_jap_last_wait_time);

    this.revealed = false;
  }

  updateCard(english_word, japanese_reading, kanji) {
    let newCard = {};
    newCard['_id'] = this.current_card._id;
    newCard['english_word'] = english_word;
    newCard['japanese_reading'] = japanese_reading;
    newCard['kanji'] = kanji;
    this.current_card.english_word = english_word;
    this.current_card.japanese_reading = japanese_reading;
    this.current_card.kanji = kanji;
    this.cs.updateCard(newCard);
    this.edit = !this.edit;
  }

}


