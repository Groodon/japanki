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
export class UserSharedDeckService {

  uri = 'usershare';

  constructor(private http: HttpClient, private as: AuthenticationService) { }

  getUserSharedDecks() {
    return this
      .http
      .get(`${this.uri}/`);
  }

  deleteUserSharedDeck(deckId) {
    return this
      .http
      .delete(`${this.uri}/${deckId}`);
  }
}