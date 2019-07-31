import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class JishoService {
  constructor(private http: HttpClient) { }

  getJapaneseWord(searchWord) {
    return this.http.get<any>(`https://jisho.org/api/v1/search/words?keyword=` + searchWord);
  }
}
