// add-card.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { CardService } from '../_services/card.service';
import {ActivatedRoute, Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import {JishoService} from "../_services/jisho.service";
import * as moment from 'moment';

@Component({
  selector: 'app-gst-add',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {

  angForm: FormGroup;
  deck: number;
  suggestionCards: Array<Object>[];

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private cs: CardService,
              private flashMessage: FlashMessagesService, private js: JishoService) {
    this.createForm();
  }

  //createForm() {
   // this.angForm = this.fb.group({
    //  english_word: ['', Validators.required ],
     // japanese_reading: ['', Validators.required ],
      //kanji: ['', Validators.required ],
      //comment: ['']
    //});
  //}

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

  addCard(english_word, japanese_reading, kanji, comment, added_card?) {
    let now = moment().format('MM/DD/YYYY').toString();

    let card = {english_word, japanese_reading, kanji, next_study_time: now, comment, deck: this.deck};
    this.cs.addCard(card)
      .subscribe(
        res => {
          this.angForm.reset();
          if (added_card) {
            added_card.added = true;
            console.log(added_card);
          }
        },
          error => this.showFlash(error, false));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.deck = params['id'];
    });
  }

  showFlash(message, success) {
    let alertClass: string = (success ? "alert-success" : "alert-danger");
    // 1st parameter is a flash message text
    // 2nd parameter is optional. You can pass object with options.
    this.flashMessage.show(message, { cssClass: alertClass, timeout: 4000 });
  }

}
