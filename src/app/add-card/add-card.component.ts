// add-card.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { CardService } from '../_services/card.service';
import {ActivatedRoute, Router} from "@angular/router";
import {JishoService} from "../_services/jisho.service";
import { CardOrders } from "../_models/app-enums";
import * as moment from 'moment';

@Component({
  selector: 'app-gst-add',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {

  angForm: FormGroup;
  deckId: string;
  suggestionCards: Array<Object>[];
  CardOrders = CardOrders;
  currentOrder: number = CardOrders.Both;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private cs: CardService,
              private js: JishoService, private router: Router) {
    this.createForm();
  }

  createForm() {
   this.angForm = this.fb.group({
     search_word: ['', Validators.required ]
    });
  }

  getSuggestions(english_word) {
    this.js.getJapaneseWord(english_word).subscribe(
      res => {
        this.suggestionCards = res.data;
        this.suggestionCards.map((card) => {
          card['added'] = false;
          card['edit'] = false;
        });
      }
    )
  }

  setOrder(order) {
    this.currentOrder = order;
  }

  addCard(english_word, japanese_reading, kanji, comment, added_card?) {
    let now = moment().format('MM/DD/YYYY').toString();

    let card = {english_word, japanese_reading, kanji, jap_eng_next_study_time: now, eng_jap_next_study_time: now, comment, deck: this.deckId, order: this.currentOrder};
    this.cs.addCard(card)
      .subscribe(
        res => {
          if (added_card) {
            added_card.added = true;
          }
        },
          error => console.log(error));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.deckId = params['id'];
    });
  }

}
