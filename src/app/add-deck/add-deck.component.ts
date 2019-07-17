import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CardService} from "../card.service";

@Component({
  selector: 'app-add-deck',
  templateUrl: './add-deck.component.html',
  styleUrls: ['./add-deck.component.css']
})
export class AddDeckComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private cs: CardService) {
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
    let card = {english_word: english_word, japanese_word: japanese_word, comment: comment};
    this.cs.addCard(card);
  }

  ngOnInit() {
  }

}
