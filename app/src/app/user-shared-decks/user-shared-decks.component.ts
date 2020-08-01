import { Component, OnInit } from '@angular/core';
import SharedDeck from '../_models/SharedDeck';
import { UserSharedDeckService } from '../_services/user-shared-deck.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-shared-decks',
  templateUrl: './user-shared-decks.component.html',
  styleUrls: ['./user-shared-decks.component.scss']
})
export class UserSharedDecksComponent implements OnInit {

  constructor(private usds: UserSharedDeckService, public dialog: MatDialog) { }
  userSharedDecks: SharedDeck[];

  ngOnInit() {
    this.usds
      .getUserSharedDecks()
      .subscribe((decks: SharedDeck[]) => {
        this.userSharedDecks = decks;
        console.log(this.userSharedDecks);
      });
  }

  showDeleteDialog(id: string) {
    const text = `This deck will no longer be visible to other users. Are you sure you want to delete the deck ${this.userSharedDecks.find(deck => deck._id === id).name}?`
    const title = 'Delete';
    const cancelButtonText = 'Cancel';
    const acceptButtonText = 'Delete';
    const confirmIsRed = true;

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {text, title, cancelButtonText, acceptButtonText, confirmIsRed}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteSharedDeck(id);
      }
    });
  }

  deleteSharedDeck(id) {
    this.usds.deleteUserSharedDeck(id).subscribe(() => {
      this.deleteRow(id);
    },
      error => {
        console.log(error);
    });
  }

  deleteRow(id: string) {
    for (let i = 0; i < this.userSharedDecks.length; ++i) {
      if (this.userSharedDecks[i]._id === id) {
        this.userSharedDecks.splice(i, 1);
      }
    }
  }

}
