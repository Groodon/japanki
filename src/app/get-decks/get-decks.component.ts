import { Component, OnInit } from '@angular/core';
import Deck from '../_models/Deck'
import {DeckService} from "../_services/deck.service";
import {ConfirmDialogService} from "../confirm-dialog/confirm-dialog.service";
import Card from "../Card";
import * as moment from 'moment';

@Component({
  selector: 'app-get-decks',
  templateUrl: './get-decks.component.html',
  styleUrls: ['./get-decks.component.css']
})
export class GetDecksComponent implements OnInit {

  decks: Deck[];
  cards: Object = {};

  constructor(private ds: DeckService, private confirmDialogService: ConfirmDialogService) { }

  ngOnInit() {
    this.ds
      .getDecks()
      .subscribe((data: Deck[]) => {
        this.decks = data;
        this.getCardNumbers();
      });


  }

  getCardNumbers() {
    let now = moment();
    console.log("decks: ", this.decks);
    for (let deck of this.decks) {
      //console.log("deck: ", deck);
      this.ds
        .getDeck(deck._id)
        .subscribe((data: Card[]) => {
          this.cards[deck._id] = data;
          this.cards[deck._id].total_cards = data.length;
          this.cards[deck._id].study_cards = data.filter(card => moment(card.next_study_time,'MM/DD/YYYY')  <= now).length;
          console.log("deck: ", this.cards[deck._id]);
          console.log("done", this.cards);
        });

    }
  }

  showDialog(id) {
    let temp = this;
    console.log("id", id);
    console.log("decks: ", this.decks);
    this.confirmDialogService.confirmThis("Confirm deletion", "Are you sure you want to delete the deck \"" + this.decks.find(deck => deck._id === id).deck_name + "\"?", function () {
      temp.deleteDeck(id);
    }, function () {
    })
  }

  deleteDeck(id) {
    this.ds.deleteDeck(id).subscribe(res => {
      this.deleteRow(id);
    },
      error => {
        console.log(error);
      });
  }

  deleteRow(id){
    for(let i = 0; i < this.decks.length; ++i){
      if (this.decks[i]._id === id) {
        this.decks.splice(i,1);
      }
    }
  }
}
