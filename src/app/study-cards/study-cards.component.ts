import { Component, OnInit } from '@angular/core';
import Card from "../Card";
import {DeckService} from "../_services/deck.service";
import {ActivatedRoute} from "@angular/router";
import * as moment from 'moment';
import Diff = moment.unitOfTime.Diff;
import {CardService} from "../_services/card.service";
import {selector} from "rxjs-compat/operator/publish";

enum DIFFICULTY {
  Fail,
  Hard,
  Easy
}

@Component({
  selector: 'app-study-cards',
  templateUrl: './study-cards.component.html',
  styleUrls: ['./study-cards.component.css']
})
export class StudyCardsComponent implements OnInit {

  cards: Card[];
  known_word: string;
  unknown_word: string;
  current_card: Card;
  current_card_index: number;
  revealed: boolean = false;
  done: boolean = false;
  favoriteSeason: string = 'hejsan';
  DIFFICULTY = DIFFICULTY;
  selected: any;

  constructor(private ds: DeckService, private route: ActivatedRoute, private cs: CardService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.ds
      .getDeck(id)
      .subscribe((data: Card[]) => {
        let now = moment();
        this.cards = data.filter(card => moment(card.next_study_time,'MM/DD/YYYY')  <= now);
        this.changeCard();
      });
  }



  updateCard(difficulty) {
    let newWaitTime;
    switch(difficulty) {
      case DIFFICULTY.Easy: {
        if (this.current_card.last_wait_time === 0)
          newWaitTime = 4;
        else
          newWaitTime = this.current_card.last_wait_time * 4;
        break;
      }
      case DIFFICULTY.Hard: {
        if (this.current_card.last_wait_time === 0)
          newWaitTime = 1;
        else
          newWaitTime = this.current_card.last_wait_time * 2;
        break;
      }
      case DIFFICULTY.Fail: {
        newWaitTime = 0;
        break;
      }
    }
    let newCard = this.current_card;
    newCard.last_wait_time = newWaitTime;
    newCard.next_study_time = moment(this.current_card.next_study_time,'MM/DD/YYYY').add(newWaitTime, 'days').toString();
    this.cs.updateCard(newCard);
    this.cards.splice(this.current_card_index, 1);
  }

  changeCard(difficulty?) {
    // Update the last cards progress
    if (difficulty)
      this.updateCard(difficulty);

    let size = this.cards.length;
    if (size === 0) {
      this.done = true;
      return;
    }

    this.current_card_index = Math.floor(Math.random()*size);
    this.current_card = this.cards[this.current_card_index];
    this.known_word = this.current_card.english_word;
    this.unknown_word = this.current_card.japanese_reading;
    this.revealed = false;
  }

}


