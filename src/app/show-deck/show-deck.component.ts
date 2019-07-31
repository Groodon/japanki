import { Component, OnInit } from '@angular/core';
import Deck from "../_models/Deck";
import {CardService} from "../_services/card.service";
import Card from "../Card";
import {DeckService} from "../_services/deck.service";
import {ActivatedRoute} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-show-deck',
  templateUrl: './show-deck.component.html',
  styleUrls: ['./show-deck.component.css']
})
export class ShowDeckComponent implements OnInit {

  cards: Card[];

  constructor(private ds: DeckService, private cs: CardService, private route: ActivatedRoute, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.ds
      .getDeck(id)
      .subscribe((data: Card[]) => {
        console.log(data);
        this.cards = data;
      });
  }

  showFlash(message, success) {
    let alertClass: string = (success ? "alert-success" : "alert-danger");
    // 1st parameter is a flash message text
    // 2nd parameter is optional. You can pass object with options.
    this.flashMessage.show(message, { cssClass: alertClass, timeout: 4000 });
  }

  deleteRow(id){
    for(let i = 0; i < this.cards.length; ++i){
      if (this.cards[i]._id === id) {
        this.cards.splice(i,1);
      }
    }
  }

  deleteCard(id) {
    this.cs
      .deleteCard(id)
      .subscribe(
        res => {
          this.deleteRow(id);
          //this.showFlash("Card deleted", true);

        },
        error => {
          this.showFlash(error, false)
        });
  }

}
