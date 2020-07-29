// card.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from "./authentication.service";
import { CardOrders } from "../_models/app-enums"
import * as moment from 'moment';
import Deck from '../_models/Deck';
import Card from '../_models/Card';

enum CARD_STATUS {
  New = 0,
  CompletedOnce = 1,
  Completed = 2
}

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  uri = 'deck';

  constructor(private http: HttpClient, private as: AuthenticationService) { }

  addDeck(deck) {
    return this.http
      .post<any>(`${this.uri}/`, {deck});
  }

  getDecks() {
    return this
      .http
      .get(`${this.uri}/`);
  }

  getDeck(deckId) {
    return this
      .http
      .get(`${this.uri}/${deckId}`);
  }

  deleteDeck(deckId) {
    return this
      .http
      .delete(`${this.uri}/${deckId}`);
  }

  updateDeck(deckId, data) {
    return this
      .http
      .put(`${this.uri}/${deckId}`, {data})
  }

  incrementDeck(deckId, data) {
    return this
      .http
      .put(`${this.uri}/increment/${deckId}`, {data})
  }

  updateDecks(data) {
    return this
      .http
      .put(`${this.uri}`, {data})
  }

  // Takes a deck and creates duplicate of card if the card-order is both, and adds the order to all cards.
  getOrderCards(deck) {
    let orderCards = [];
    // First, find the first "not seen" cards found in the deck, sorted in original order
    // Second, find the first "seen" and "not failed" cards in the deck, sorted in next study time
    // Third, find all failed cards and include them

    for (const card of deck.cards) {
      if (deck.order === CardOrders.JapEng || deck.order === CardOrders.Both) {
        const japEngCard = Object.assign({}, card);
        japEngCard.order = CardOrders.JapEng;
        orderCards.push(japEngCard);
      }

      if (deck.order === CardOrders.EngJap || deck.order === CardOrders.Both) {
        const engJapCard = Object.assign({}, card);
        engJapCard.order = CardOrders.EngJap;
        orderCards.push(engJapCard);
      }
    }

    return orderCards;
  }

  // Get the new cards out of cards
  // Cards should have "order"
  getNewCards(cards) {
    let newCards = []
    for (const card of cards) {
      if (card.order === CardOrders.JapEng && !card.jap_eng_seen) {
        newCards.push(card);
      } else if (card.order === CardOrders.EngJap && !card.eng_jap_seen) {
        newCards.push(card);
      }
    }

    return newCards;
  }

  // Get the cards to be reviewed out of cards
  // Cards should have "order"
  getRepCards(cards) {
    let repCards = []
    const now = moment().startOf('day');

    for (const card of cards) {
      if (card.order === CardOrders.JapEng && !card.jap_eng_failed && card.jap_eng_status === CARD_STATUS.Completed && moment(card.jap_eng_next_study_time)  <= now) {
        repCards.push(card);
      } else if (card.order === CardOrders.EngJap && !card.eng_jap_failed && card.eng_jap_status === CARD_STATUS.Completed && moment(card.eng_jap_next_study_time)  <= now) {
        repCards.push(card);
      }
    }

    return repCards;
  }

  // Get cards with an "order", sorted by (order)_next_study_time depending on the order
  getCardsSortedByTime(cards: Card[]) {
    let orderedCards = cards.sort((a: Card, b: Card) => {
      let aTime = (a.order === CardOrders.JapEng ? a.jap_eng_next_study_time : a.eng_jap_next_study_time);
      let bTime = (b.order === CardOrders.JapEng ? b.jap_eng_next_study_time : b.eng_jap_next_study_time);
      // Should it be the reverse?
      return moment(aTime).valueOf() - moment(bTime).valueOf();
    })
    return orderedCards;
  }

  // Get all the new (unseen) cards that should be studied
  // Cards should have "order"
  getNewCardsToStudy(cards, alreadyStudied, maxStudied) {
    let newCards = this.getNewCards(cards);
    let cardsToBeAdded = maxStudied - alreadyStudied;

    return cardsToBeAdded > 0 ? newCards.slice(0, cardsToBeAdded) : [];
  }

  getRepCardsToStudy(cards, alreadyStudied, maxStudied) {
    let repCards = this.getRepCards(cards);
    let sortedCards = this.getCardsSortedByTime(repCards);
    let cardsToBeAdded = maxStudied - alreadyStudied;

    return cardsToBeAdded > 0 ? sortedCards.slice(0, cardsToBeAdded) : [];
  }

  // Get all cards that failed last time
  // Cards should have "order"
  getFailedCards(cards) {
    return cards.filter(card => (card.order === CardOrders.EngJap && card.eng_jap_failed) || 
      (card.order === CardOrders.JapEng && card.jap_eng_failed));
  }
  
  getCompleteStudyDeck(deck: Deck) {
    let orderCards = this.getOrderCards(deck);
    let newCards = this.getNewCardsToStudy(orderCards, deck.new_studied, deck.new_max);
    let repCards = this.getRepCardsToStudy(orderCards, deck.rep_studied, deck.rep_max);
    let failedCards = this.getFailedCards(orderCards);
    
    return newCards.concat(repCards, failedCards);
  }

  getSeperateStudyDecks(deck) {
    let orderCards = this.getOrderCards(deck);
    let completeStudyDeck = {};
    completeStudyDeck['newCards'] = this.getNewCardsToStudy(orderCards, deck.new_studied, deck.new_max);
    completeStudyDeck['repCards'] = this.getRepCardsToStudy(orderCards, deck.rep_studied, deck.rep_max);
    completeStudyDeck['failedCards'] = this.getFailedCards(orderCards);
    
    return completeStudyDeck;
  }
}
