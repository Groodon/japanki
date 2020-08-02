import { Component, OnInit } from '@angular/core';
import {DeckService} from "../_services/deck.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CardOrders} from "../_models/app-enums";
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import Deck from '../_models/Deck';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { UserSharedDeckService } from '../_services/user-shared-deck.service';

@Component({
  selector: 'app-deck-options',
  templateUrl: './deck-options.component.html',
  styleUrls: ['./deck-options.component.css']
})
export class DeckOptionsComponent implements OnInit {

  deckId: string;
  deck: Deck;
  editForm;
  CardOrders = CardOrders;

  constructor(private ds: DeckService, private usds: UserSharedDeckService, private route: ActivatedRoute, private formBuilder: FormBuilder, public dialog: MatDialog, public router: Router) {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      new_max: [0, Validators.required],
      rep_max: [0, Validators.required],
      order: 0,
      hide_hiragana: false
    })
   }

  ngOnInit() {
    this.deckId = this.route.snapshot.paramMap.get('id');

    this.ds
      .getDeck(this.deckId)
      .subscribe((deck: any) => {
        this.editForm.controls['name'].setValue(deck.name);
        this.editForm.controls['new_max'].setValue(deck.new_max);
        this.editForm.controls['rep_max'].setValue(deck.rep_max);
        this.editForm.controls['order'].setValue(deck.order);
        this.editForm.controls['hide_hiragana'].setValue(deck.hide_hiragana);
        this.deck = deck;
      });
  }

  showDialog(deckData) {
    const text = `Are you sure you want to update the deck ${this.deck.name}?`
    const title = 'Update';
    const cancelButtonText = 'Cancel';
    const acceptButtonText = 'Update';
    const confirmIsRed = false;

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {text, title, cancelButtonText, acceptButtonText, confirmIsRed}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onSubmit(deckData);
      }
    });
  }

  onSubmit(deckData) {
    console.log(deckData);
    if (this.deck.shared) {
      this.usds.updateSharedDeck(this.deckId, deckData).subscribe();
    } else {
      this.ds
      .updateDeck(this.deckId, deckData)
      .subscribe(() => {
      });
    }
  }

}
