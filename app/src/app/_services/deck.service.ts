// card.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthenticationService} from "./authentication.service";

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
}
