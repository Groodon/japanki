import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DeckService} from "../_services/deck.service";
import {AuthenticationService} from "../_services";

@Component({
  selector: 'app-add-deck',
  templateUrl: './add-deck.component.html',
  styleUrls: ['./add-deck.component.css']
})
export class AddDeckComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private ds: DeckService, private as: AuthenticationService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      deck_name: ['', Validators.required ]
    });
  }

  addDeck(deck_name) {
    this.ds.addDeck({deck_name: deck_name});
  }

  ngOnInit() {
  }

}
