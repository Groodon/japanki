import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from "./authentication.service";
import { CardOrders } from "../_models/app-enums"
import * as moment from 'moment';
import Deck from '../_models/Deck';
import Card from '../_models/Card';


@Injectable({
  providedIn: 'root'
})
export class SharedDeckService {

  uri = 'share';

  constructor(private http: HttpClient, private as: AuthenticationService) { }

  addSharedDeck(deckId) {
    return this.http
      .post<any>(`${this.uri}/`, {deckId});
  }

  getSharedDecks() {
    return this
      .http
      .get(`${this.uri}/`);
  }

  getSharedDeck(deckId) {
    return this
      .http
      .get(`${this.uri}/${deckId}`);
  }

  deleteSharedDeck(deckId) {
    return this
      .http
      .delete(`${this.uri}/${deckId}`);
  }
}
