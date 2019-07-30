import { Component, OnInit } from '@angular/core';
import Card from '../Card';
import { CardService } from '../_services/card.service';
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-gst-get',
  templateUrl: './get-card.component.html',
  styleUrls: ['./get-card.component.css']
})
export class GetCardComponent implements OnInit {

  cards: Card[];

  constructor(private cs: CardService, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.cs
      .getCards()
      .subscribe((data: Card[]) => {
        this.cards = data;
      });
  }

  showFlash(message, success) {
    let alertClass: string = (success ? "alert-success" : "alert-danger");
    console.log("asdasdasdasd");
    // 1st parameter is a flash message text
    // 2nd parameter is optional. You can pass object with options.
    this.flashMessage.show(message, { cssClass: alertClass, timeout: 4000 });
  }

  deleteCard(id) {
    this.cs
      .deleteCard(id)
      .subscribe(
      res => {
        console.log("did it");
        this.showFlash("Card deleted", true);

      },
      error => {
        console.log("did it not");
        this.showFlash(error, false)
      });
  }
}
