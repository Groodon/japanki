import { Component, OnInit } from '@angular/core';
import {DeckService} from "../_services/deck.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CardOrders} from "../_models/app-enums";
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import Deck from '../_models/Deck';

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

  constructor(private ds: DeckService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
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
        this.editForm.controls['order'].setValue(deck.order);
        this.editForm.controls['hide_hiragana'].setValue(deck.hide_hiragana);
        this.deck = deck;
      });
  }

  onSubmit(deckData) {
    console.log('Your order has been submitted', deckData);
    this.ds
      .updateDeck(this.deckId, deckData)
      .subscribe(() => {
        console.log("updated")
      });
  }

}
