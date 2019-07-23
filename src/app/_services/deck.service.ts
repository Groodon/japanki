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
    this.http
      .post<any>(`${this.uri}/add`, deck).
      subscribe(res => console.log(res),
      error => console.log(error));
  }

  getDecks() {
    return this
      .http
      .get(`${this.uri}/all`);
  }

  deleteDeck(id) {
    return this
      .http
      .get(`${this.uri}/delete/${id}`);
  }
}
