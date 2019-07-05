// add-card.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { CardService } from '../card.service';

@Component({
  selector: 'app-gst-add',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {

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
