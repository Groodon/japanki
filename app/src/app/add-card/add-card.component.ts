// add-card.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { CardService } from '../_services/card.service';
import {ActivatedRoute, Router} from "@angular/router";
import {JishoService} from "../_services/jisho.service";
import { CardOrders } from "../_models/app-enums";
import * as moment from 'moment';
import JishoCard from "../_models/JishoCard";

@Component({
  selector: 'app-gst-add',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {

  angForm: FormGroup;
  deckId: string;
  suggestionCards: Array<JishoCard>;
  CardOrders = CardOrders;
  customAdded: boolean = false;
  dropdownSettings = {};

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private cs: CardService,
              private js: JishoService, public router: Router) {
    this.createForm();
  }

  createForm() {
   this.angForm = this.fb.group({
     search_word: ['', Validators.required ]
    });
  }

  getSuggestions(word) {
    this.js.getJapaneseWord(word).subscribe(
      res => {
        this.suggestionCards = res.data;
        this.suggestionCards.map((card) => {
          card['added'] = false;
          card['edit'] = false;
          if (card.senses.length > 1) {
            card['dropdown'] = true;
            card['data'] = [];
            for (let meaning of card.senses) {
              card['data'].push(meaning.english_definitions.join("; "));
            }
            card['selected'] = [card['data'][0]];
          } else {
            card['dropdown'] = false;
          }

        });
      }
    )
  }

  addCard(english_word, japanese_reading, kanji, added_card?) {
    let now = moment().startOf('day').format('YYYY-MM-DD[T]HH:mm:ss').toString();

    let card = {english_word, japanese_reading, kanji, jap_eng_next_study_time: now, eng_jap_next_study_time: now, deck: this.deckId};
    this.cs.addCard(card, this.deckId)
      .subscribe(
        res => {
          added_card.added = true;
        },
          error => console.log(error));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.deckId = params['id'];
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'meaning',
      textField: 'meaning',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3
    };

  }



  onItemSelect(card) {
    card.added = false;
  }
  onSelectAll(card) {
    card.added = false;
  }

  onDeSelect(card) {
    card.added = false;
  }

}
