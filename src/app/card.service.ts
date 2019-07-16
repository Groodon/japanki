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
    this.http.post(`${this.uri}/add`, card)
      .subscribe(res => console.log('Done'),
      error => console.log(error));
  }

  getCards() {
    return this
      .http
      .get(`${this.uri}`);
  }

  editCard(id) {
    return this
      .http
      .get(`${this.uri}/edit/${id}`);
  }

  // TODO: error handling
  updateCard(card, id) {
    this
      .http
      .post(`${this.uri}/update/${id}`, card)
      .subscribe(res => console.log('Done'),
        error => console.log(error));
  }

  deleteCard(id) {
    return this
      .http
      .get(`${this.uri}/delete/${id}`);
  }
}
