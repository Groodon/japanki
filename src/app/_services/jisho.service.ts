import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class JishoService {
  constructor(private http: HttpClient) { }

  uri = 'search';

  getJapaneseWord(searchWord) {
    let s: string = `${this.uri}/` + searchWord;
    return this.http.get<any>(`${this.uri}/` + searchWord);
  }
}
