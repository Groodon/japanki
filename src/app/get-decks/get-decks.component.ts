import { Component, OnInit } from '@angular/core';
import Deck from '../_models/Deck'
import {DeckService} from "../_services/deck.service";

@Component({
  selector: 'app-get-decks',
  templateUrl: './get-decks.component.html',
  styleUrls: ['./get-decks.component.css']
})
export class GetDecksComponent implements OnInit {

  decks: Deck[];

  constructor(private ds: DeckService) { }

  ngOnInit() {
    this.ds
      .getDecks()
      .subscribe((data: Deck[]) => {
        console.log(data);
        this.decks = data;
      });
  }

  deleteDeck(id) {

    this.ds.deleteDeck(id).subscribe(res => {
      console.log('Deleted');
      console.log(res);
    });
  }
}
