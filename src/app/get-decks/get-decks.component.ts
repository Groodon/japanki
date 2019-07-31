import { Component, OnInit } from '@angular/core';
import Deck from '../_models/Deck'
import {DeckService} from "../_services/deck.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {ConfirmDialogService} from "../confirm-dialog/confirm-dialog.service";

@Component({
  selector: 'app-get-decks',
  templateUrl: './get-decks.component.html',
  styleUrls: ['./get-decks.component.css']
})
export class GetDecksComponent implements OnInit {

  decks: Deck[];

  constructor(private ds: DeckService, private confirmDialogService: ConfirmDialogService) { }

  ngOnInit() {
    this.ds
      .getDecks()
      .subscribe((data: Deck[]) => {
        this.decks = data;
      });
  }

  showDialog(id) {
    let temp = this;
    this.confirmDialogService.confirmThis("Confirm deletion", "Are you sure you want to delete the deck \"" + this.decks.find(deck => deck._id = id).deck_name + "\"?", function () {
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
