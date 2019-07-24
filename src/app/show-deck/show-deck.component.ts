import { Component, OnInit } from '@angular/core';
import Deck from "../_models/Deck";
import {CardService} from "../_services/card.service";
import Card from "../Card";
import {DeckService} from "../_services/deck.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-show-deck',
  templateUrl: './show-deck.component.html',
  styleUrls: ['./show-deck.component.css']
})
export class ShowDeckComponent implements OnInit {

  cards: Card[];

  constructor(private ds: DeckService, private cs: CardService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.ds
      .getDeck(id)
      .subscribe((data: Card[]) => {
        console.log(data);
        this.cards = data;
      });
  }

  deleteCard(id) {
    this.cs.deleteCard(id).subscribe(res => {
      console.log('Deleted');
      console.log(res);
    });
  }

}
