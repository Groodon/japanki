import { Component, OnInit } from '@angular/core';
import { SharedDeckService } from '../_services/shared-deck.service';
import { DeckService } from '../_services/deck.service';
import SharedDeck from '../_models/SharedDeck';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-shared-decks',
  templateUrl: './shared-decks.component.html',
  styleUrls: ['./shared-decks.component.scss']
})
export class SharedDecksComponent implements OnInit {

  constructor(private ds: DeckService, private sds: SharedDeckService, public dialog: MatDialog) { }
  sharedDecks: SharedDeck[];

  ngOnInit() {
    this.sds
      .getSharedDecks()
      .subscribe((decks: SharedDeck[]) => {
        this.sharedDecks = decks;
      });
  }

  showSaveDialog(id: string) {
    const text = `Are you sure you want to add the deck "${this.sharedDecks.find(deck => deck.deck_id === id).name}" to your collection?`
    const title = 'Save';
    const cancelButtonText = 'Cancel';
    const acceptButtonText = 'Save';
    const confirmIsRed = false;

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {text, title, cancelButtonText, acceptButtonText, confirmIsRed}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveSharedDeck(id);
      }
    });
  }

  saveSharedDeck(id) {
    this.ds.addSharedDeck(id).subscribe(() => {
    },
      error => {
        console.log(error);
    });
  }
}
