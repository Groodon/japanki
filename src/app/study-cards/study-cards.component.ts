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
  known_word: string;
  unknown_word: string;
  current_card: Card;
  currentOrder: number;
  current_card_index: number;
  revealed: boolean = false;
  done: boolean = false;
  DIFFICULTY = DIFFICULTY;
  STATUS = STATUS;
  SHOW_OPTIONS = SHOW_OPTIONS;
  CARD_ORDERS = CardOrders;
  status: number = STATUS.Loading;
  showing: number = SHOW_OPTIONS.Both;
  last_wait_time: number;

  constructor(private ds: DeckService, private route: ActivatedRoute, private cs: CardService, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.ds
      .getDeck(id)
      .subscribe((data: Card[]) => {
        let now = moment().startOf('day');
        console.log(now);
        for (let card of data) {
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
        console.log("cards", this.cards);
        this.changeCard();
      });
  }

  onChange() {
    console.log("changed");
  }

  updateCard(difficulty) {
    console.log(this.current_card);
    let newWaitTime;
    let lastWaitTime = (this.currentOrder === CardOrders.EngJap ? this.current_card.eng_jap_last_wait_time : this.current_card.jap_eng_last_wait_time);
    switch(difficulty) {
      case DIFFICULTY.Easy: {
        if (lastWaitTime === 0)
          newWaitTime = 4;
        else
          newWaitTime = lastWaitTime * 4;
        break;
      }
      case DIFFICULTY.Hard: {
        if (lastWaitTime === 0)
          newWaitTime = 1;
        else
          newWaitTime = lastWaitTime * 2;
        break;
      }
      case DIFFICULTY.Fail: {
        newWaitTime = 0;
        break;
      }
    }
    let newCard = Object.assign({}, this.current_card);
    if (this.currentOrder === CardOrders.EngJap) {
      newCard.eng_jap_last_wait_time = newWaitTime;
      newCard.eng_jap_next_study_time = moment(this.current_card.eng_jap_next_study_time,'MM/DD/YYYY').add(newWaitTime, 'days').toString();
    } else {
      newCard.jap_eng_last_wait_time = newWaitTime;
      newCard.jap_eng_next_study_time = moment(this.current_card.jap_eng_next_study_time,'MM/DD/YYYY').add(newWaitTime, 'days').toString();
    }

    delete newCard.order;
    this.cs.updateCard(newCard);
    this.cards.splice(this.current_card_index, 1);
  }

  changeCard(difficulty?) {
    // Update the last cards progress
    if (difficulty)
      this.updateCard(difficulty);

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

    this.currentOrder = this.current_card.order;
    if (this.currentOrder === CardOrders.JapEng) {
      this.known_word = this.current_card.japanese_reading;
      this.unknown_word = this.current_card.english_word;
      this.last_wait_time = this.current_card.jap_eng_last_wait_time;

    } else {
      this.known_word = this.current_card.english_word;
      this.unknown_word = this.current_card.japanese_reading;
      this.last_wait_time = this.current_card.eng_jap_last_wait_time;
    }



    this.revealed = false;
  }

}


