// card.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  uri = 'card';

  constructor(private http: HttpClient) { }

  addCard(card, deckId) {
    return this.http.post(`deck/${deckId}/card/`, {card});
  }

  getCards() {
    return this
      .http
      .get(`${this.uri}`);
  }

  // TODO: error handling
  updateCard(card, deckId) {
    this
      .http
      .put(`deck/${deckId}/card/${card._id}`, {card})
      .subscribe();
  }

  deleteCard(cardId, deckId) {
    return this
      .http
      .delete(`deck/${deckId}/card/${cardId}`);
  }
}
