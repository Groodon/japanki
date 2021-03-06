import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DeckService} from "../_services/deck.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-add-deck',
  templateUrl: './add-deck.component.html',
  styleUrls: ['./add-deck.component.css']
})
export class AddDeckComponent implements OnInit {

  returnUrl: string;
  angForm: FormGroup;
  constructor(private fb: FormBuilder, private ds: DeckService, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      deck_name: ['', Validators.required ]
    });
  }

  addDeck(name) {
    this.ds.addDeck({name: name})
      .pipe(first())
      .subscribe(data => {
          this.router.navigate([this.returnUrl]);
      },
      error => {
        console.log(error);
      });
  }

  ngOnInit() {
    this.returnUrl = '/decks/all';
  }

}
