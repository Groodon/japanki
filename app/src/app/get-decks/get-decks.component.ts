import { Component, OnInit } from '@angular/core';
import Deck from '../_models/Deck'
import {DeckService} from "../_services/deck.service";
import {ConfirmDialogService} from "../confirm-dialog/confirm-dialog.service";
import * as moment from 'moment';
import {CardOrders} from "../_models/app-enums";
import {MatDialog} from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-get-decks',
  templateUrl: './get-decks.component.html',
  styleUrls: ['./get-decks.component.css']
})
export class GetDecksComponent implements OnInit {

  decks: Deck[];
  cards: Object = {};

  constructor(private ds: DeckService, private confirmDialogService: ConfirmDialogService, public dialog: MatDialog) { }

  ngOnInit() {
    this.ds
      .getDecks()
      .subscribe((data: Deck[]) => {
        this.decks = data;
        this.getCardNumbers();
      });
  }

  getCardNumbers() {
    let now = moment().startOf('day');
    for (let deck of this.decks) {
      let studyDecks = this.ds.getSeperateStudyDecks(deck);
      
      this.cards[deck._id] = deck;
      this.cards[deck._id].total_cards = deck.cards.length;
      this.cards[deck._id].study_cards = 0;
      this.cards[deck._id].newCards = studyDecks['newCards'].length;
      this.cards[deck._id].failedCards = studyDecks['failedCards'].length;
      this.cards[deck._id].repCards = studyDecks['repCards'].length;
      console.log("hej", this.cards[deck._id]);
    }
  }

  showDialog(id: string) {
    const text = `Are you sure you want to delete the deck ${this.decks.find(deck => deck._id === id).name}?`
    const title = 'Delete';
    const cancelButtonText = 'Cancel';
    const acceptButtonText = 'Delete';

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {text: text, title: title, cancelButtonText: cancelButtonText, acceptButtonText: acceptButtonText}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteDeck(id);
      }
    });
  }

  deleteDeck(id: string) {
    this.ds.deleteDeck(id).subscribe(() => {
      this.deleteRow(id);
    },
      error => {
        console.log(error);
      });
  }

  deleteRow(id: string) {
    for (let i = 0; i < this.decks.length; ++i) {
      if (this.decks[i]._id === id) {
        this.decks.splice(i, 1);
      }
    }
  }
}
