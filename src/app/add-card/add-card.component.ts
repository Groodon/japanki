// add-card.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { CardService } from '../_services/card.service';
import {ActivatedRoute, Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-gst-add',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {

  angForm: FormGroup;
  deck: number;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private cs: CardService, private flashMessage: FlashMessagesService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      english_word: ['', Validators.required ],
      japanese_word: ['', Validators.required ],
      comment: ['']
    });
  }

  addCard(english_word, japanese_word, comment) {
    let card = {english_word: english_word, japanese_word: japanese_word, comment: comment, deck: this.deck};
    this.cs.addCard(card)
      .subscribe(
        res => this.showFlash("Card added", true),
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
