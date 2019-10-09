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
      .post<any>(`${this.uri}/add`, {deck, id: this.as.currentUserValue.id});
  }

  getDecks() {
    return this
      .http
      .post(`${this.uri}/all`, {id: this.as.currentUserValue.id});
  }

  getDeck(id) {
    return this
      .http
      .get(`${this.uri}/get/${id}`)
  }

  deleteDeck(id) {
    return this
      .http
      .post(`${this.uri}/delete/${id}`, {id: this.as.currentUserValue.id});
  }
}
