import { Component, OnInit } from '@angular/core';
import Card from '../Card';
import { CardService } from '../card.service';

@Component({
  selector: 'app-gst-get',
  templateUrl: './gst-get.component.html',
  styleUrls: ['./gst-get.component.css']
})
export class GstGetComponent implements OnInit {

  businesses: Card[];

  constructor(private bs: CardService) { }

  ngOnInit() {
    this.bs
      .getBusinesses()
      .subscribe((data: Card[]) => {
        this.businesses = data;
      });
  }

  deleteBusiness(id) {
    this.bs.deleteBusiness(id).subscribe(res => {
      console.log(res);
      console.log('Deleted');
    });
  }
}
