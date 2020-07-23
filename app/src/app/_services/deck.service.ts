// card.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  uri = 'decks';

  constructor(private http: HttpClient, private as: AuthenticationService) { }

  addDeck(deck) {
    return this.http
      .post<any>(`${this.uri}/`, {deck, id: this.as.currentUserValue.id});
  }

  getDecks() {
    return this
      .http
      .get(`${this.uri}/`);
  }

  getDeck(id) {
    return this
      .http
      .get(`${this.uri}/${id}`);
  }

  deleteDeck(id) {
    return this
      .http
      .delete(`${this.uri}/${id}`);
  }
}
