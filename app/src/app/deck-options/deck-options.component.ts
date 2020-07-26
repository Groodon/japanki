import { Component, OnInit } from '@angular/core';
import {DeckService} from "../_services/deck.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CardOrders} from "../_models/app-enums";
import { FormBuilder, FormControl } from '@angular/forms';
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
      name: '',
      order: '',
      both: 0,
      japeng: 0,
      engjap: 0
    })
   }

  ngOnInit() {
    this.deckId = this.route.snapshot.paramMap.get('id');

    this.ds
      .getDeck(this.deckId)
      .subscribe((deck: any) => {
        this.editForm.controls['name'].setValue(deck.name);
        this.deck = deck;
        console.log(this.editForm)
        console.log(this.deck, this.deck.order, CardOrders.JapEng);
      });
  }

  
  changeOrder(newOrder) {
    // if (card.order !== newOrder) {
    //   card.order = newOrder;
    //   this.ds.updateDeck(card, this.deckId);
    // }
  }

  onSubmit(customerData) {
    // Process checkout data here
    //this.items = this.cartService.clearCart();
    //this.checkoutForm.reset();
    console.log(this.editForm);
    console.log('Your order has been submitted', customerData);
  }

}
