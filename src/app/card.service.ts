// card.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  uri = 'http://localhost:4000/business';

  constructor(private http: HttpClient) { }

  addCard(english_word, japanese_word, comment) {
    const obj = {
      english_word: english_word,
      japanese_word: japanese_word,
      comment: comment
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
      .subscribe(res => console.log('Done'));
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

  updateCard(english_word, japanese_word, comment, id) {

    const obj = {
      english_word: english_word,
      japanese_word: japanese_word,
      comment: comment
    };
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }

  deleteCard(id) {
    return this
      .http
      .get(`${this.uri}/delete/${id}`);
  }
}
