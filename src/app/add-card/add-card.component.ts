// add-card.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { CardService } from '../_services/card.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-gst-add',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {

  angForm: FormGroup;
  deck: number;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private cs: CardService) {
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
    this.cs.addCard(card);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.deck = params['id'];
    });
  }

}
