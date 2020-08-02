// card.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Card from '../_models/Card'
import {CardOrders} from "../_models/app-enums"
import * as moment from 'moment';
import {DeckService} from "../_services/deck.service";

enum CARD_STATUS {
  New = 0,
  CompletedOnce = 1,
  Completed = 2
}

enum DIFFICULTY {
  Fail = 1,
  Hard = 2,
  Easy = 3
}

@Injectable({
  providedIn: 'root'
})
export class CardService {

  uri = 'card';

  constructor(private http: HttpClient, private ds: DeckService) { }

  addCard(card, deckId) {
    return this.http.post(`deck/${deckId}/card/`, {card});
  }

  updateCard(card, deckId) {
    return this
      .http
      .put(`deck/${deckId}/card/${card._id}`, {card});
  }

  deleteCard(cardId, deckId) {
    return this
      .http
      .delete(`deck/${deckId}/card/${cardId}`);
  }

  getNextStudyCard(cards: Card[]) {
    let index = Math.floor(Math.random() * cards.length);
    return cards[index];
  }

  updateStudiedCard(oldCard: Card, difficulty, deckId) {
    // increment new_studied if card is not seen
    // increment rep_studied if card is not failed and seen
    let updatedCard = this.getUpdatedCard(oldCard, difficulty);
    let shouldIncrementNew = (oldCard.order === CardOrders.JapEng ? !oldCard.jap_eng_seen : !oldCard.eng_jap_seen);
    let shouldIncrementRep = (oldCard.order === CardOrders.JapEng ? (oldCard.jap_eng_seen && !oldCard.jap_eng_failed) : 
      (oldCard.eng_jap_seen && !oldCard.eng_jap_failed));
    let increments = {new_studied: (shouldIncrementNew ? 1 : 0), rep_studied: (shouldIncrementRep ? 1 : 0)}
    this.updateCard(updatedCard, deckId).subscribe(() => {
      if (shouldIncrementNew || shouldIncrementRep) {
        this.ds.incrementDeck(deckId, increments).subscribe();
      }
    })
  }

  getUpdatedCard(card: Card, difficulty) {
    let updatedCard = Object.assign({}, card);
    if (card.order === CardOrders.EngJap) {
      let newStatus = this.getNewCardStatus(difficulty, card.eng_jap_status);
      let newWaitTime = this.getNewWaitTime(difficulty, card.eng_jap_status, card.eng_jap_last_wait_time);
      let newStudyDate = this.getNewStudyDate(newWaitTime);
      let failStatus = (newWaitTime === 0);
      updatedCard.eng_jap_status = newStatus;
      updatedCard.eng_jap_last_wait_time = newWaitTime;
      updatedCard.eng_jap_next_study_time = newStudyDate;
      updatedCard.eng_jap_failed = failStatus;
      updatedCard.eng_jap_seen = true;
    } else {
      let newStatus = this.getNewCardStatus(difficulty, card.jap_eng_status);
      let newWaitTime = this.getNewWaitTime(difficulty, card.jap_eng_status, card.jap_eng_last_wait_time);
      let newStudyDate = this.getNewStudyDate(newWaitTime);
      let failStatus = (newWaitTime === 0);
      updatedCard.jap_eng_status = newStatus;
      updatedCard.jap_eng_next_study_time = newStudyDate;
      updatedCard.jap_eng_failed = failStatus;
      updatedCard.jap_eng_seen = true;
    }

    return updatedCard;
  }

  shouldBeRemoved(card: Card, difficulty) {
    let lastWaitTime = (card.order === CardOrders.EngJap ? card.eng_jap_last_wait_time : card.jap_eng_last_wait_time);
    let cardStatus = (card.order === CardOrders.EngJap ? card.eng_jap_status : card.jap_eng_status);
    let newWaitTime = this.getNewWaitTime(difficulty, cardStatus, lastWaitTime);
    return newWaitTime > 0;
  }

  getNewCardStatus(difficulty, cardStatus) {
    switch (difficulty) {
      case DIFFICULTY.Easy: {
        return CARD_STATUS.Completed;
      }
      case DIFFICULTY.Hard: {
        // If it is a new card and it was hard, let it come up once more until it delays a day.
        return (cardStatus === CARD_STATUS.New ? CARD_STATUS.CompletedOnce : CARD_STATUS.Completed)
      }
      case DIFFICULTY.Fail: {
        return (cardStatus === CARD_STATUS.CompletedOnce ? CARD_STATUS.New : cardStatus);
      }
    }
  }

  getNewWaitTimes(cardStatus, lastWaitTime) {
    let newWaitTimes = {};
    newWaitTimes[DIFFICULTY.Easy] = (cardStatus === CARD_STATUS.Completed && lastWaitTime === 0 ? 1 : (lastWaitTime === 0 ? 4 : lastWaitTime * 4));
    newWaitTimes[DIFFICULTY.Hard] = (cardStatus === CARD_STATUS.New ? 0 : Math.floor(lastWaitTime*1.5 + 1));
    newWaitTimes[DIFFICULTY.Fail] = 0;
    return newWaitTimes; 
  }

  getNewWaitTime(difficulty, cardStatus, lastWaitTime) {
    return this.getNewWaitTimes(cardStatus, lastWaitTime)[difficulty];
  }

  getNewStudyDate(newWaitTime) {
    const now = moment().startOf('day');
    return now.add(newWaitTime, 'days').format('YYYY-MM-DD[T]HH:mm:ss').toString();
  }

  studiedRepCard(failed, cardStatus) {
    
  }

}
