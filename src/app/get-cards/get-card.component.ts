import { Component, OnInit } from '@angular/core';
import Card from '../Card';
import { CardService } from '../_services/card.service';

@Component({
  selector: 'app-gst-get',
  templateUrl: './get-card.component.html',
  styleUrls: ['./get-card.component.css']
})
export class GetCardComponent implements OnInit {

  cards: Card[];

  constructor(private cs: CardService) { }

  ngOnInit() {
    this.cs
      .getCards()
      .subscribe((data: Card[]) => {
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
