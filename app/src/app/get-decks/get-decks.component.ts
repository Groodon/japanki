import { Component, OnInit } from '@angular/core';
import Deck from '../_models/Deck'
import {DeckService} from "../_services/deck.service";
import { SharedDeckService } from "../_services/shared-deck.service";
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

  constructor(private ds: DeckService, public dialog: MatDialog, private sds: SharedDeckService) { }

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
    }
  }

  showDeleteDialog(id: string) {
    const text = `Are you sure you want to delete the deck ${this.decks.find(deck => deck._id === id).name}?`
    const title = 'Delete';
    const cancelButtonText = 'Cancel';
    const acceptButtonText = 'Delete';
    const confirmIsRed = true;

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {text, title, cancelButtonText, acceptButtonText, confirmIsRed}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteDeck(id);
      }
    });
  }

  showShareDialog(id: string) {
    const text = `Are you sure you want to share the deck ${this.decks.find(deck => deck._id === id).name}?`
    const title = 'Share';
    const cancelButtonText = 'Cancel';
    const acceptButtonText = 'Share';
    const confirmIsRed = false;

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {text, title, cancelButtonText, acceptButtonText, confirmIsRed}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.shareDeck(id);
      }
    });
  }

  shareDeck(deckId: string) {
    console.log(deckId);
    this.sds.addSharedDeck(deckId).subscribe(() => {

    },
      error => {
        console.log(error);
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
