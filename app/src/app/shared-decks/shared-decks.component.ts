import { Component, OnInit } from '@angular/core';
import { SharedDeckService } from '../_services/shared-deck.service';
import { DeckService } from '../_services/deck.service';
import {UserSharedDecksComponent} from '../user-shared-decks/user-shared-decks.component'
import SharedDeck from '../_models/SharedDeck';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shared-decks',
  templateUrl: './shared-decks.component.html',
  styleUrls: ['./shared-decks.component.scss']
})
export class SharedDecksComponent implements OnInit {

  constructor(private ds: DeckService, private sds: SharedDeckService, public dialog: MatDialog, private route: ActivatedRoute) { }
  sharedDecks: SharedDeck[];
  activeTab = 0;

  ngOnInit() {
    let optionalRoute = this.route.snapshot.paramMap.get('tab');
    this.activeTab = (optionalRoute ? Number(optionalRoute) : 0);
    this.sds
      .getSharedDecks()
      .subscribe((decks: SharedDeck[]) => {
        this.sharedDecks = decks;
      });
  }

  loadDeck() {
    this.sds
      .getSharedDecks()
      .subscribe((decks: SharedDeck[]) => {
        this.sharedDecks = decks;
      });
  }

  tabChanged(tab) {
    if (tab === 0) {
      this.sds
        .getSharedDecks()
        .subscribe((decks: SharedDeck[]) => {
          this.sharedDecks = decks;
        });
    }
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
