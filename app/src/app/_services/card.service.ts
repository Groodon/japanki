// card.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  uri = 'card';

  constructor(private http: HttpClient) { }

  addCard(card) {
    return this.http.post(`${this.uri}/`, card);
  }

  getCards() {
    return this
      .http
      .get(`${this.uri}`);
  }

  // TODO: error handling
  updateCard(card) {
    this
      .http
      .put(`${this.uri}/${card._id}`, card)
      .subscribe();
  }

  deleteCard(id) {
    return this
      .http
      .delete(`${this.uri}/${id}`);
  }
}
