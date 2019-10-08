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
    console.log(`${this.uri}/add`);
    return this.http
      .post<any>(`${this.uri}/add`, deck);
  }

  getDecks() {
    return this
      .http
      .get(`${this.uri}/all`);
  }

  getDeck(id) {
    return this
      .http
      .get(`${this.uri}/get/${id}`)
  }

  deleteDeck(id) {
    return this
      .http
      .get(`${this.uri}/delete/${id}`);
  }
}
