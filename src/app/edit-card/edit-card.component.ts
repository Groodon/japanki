import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { CardService } from '../_services/card.service';

@Component({
  selector: 'app-gst-edit',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent implements OnInit {

  business: any = {};
  angForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cs: CardService,
              private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      english_word: ['', Validators.required ],
      japanese_word: ['', Validators.required ],
      comment: ['', Validators.required ]
    });
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cs.editCard(params['id']).subscribe(res => {
        this.business = res;
      });
    });
  }

  updateCard(english_word, japanese_word, comment) {
    this.route.params.subscribe(params => {
      const card = {
        english_word: english_word,
        japanese_word: japanese_word,
        comment: comment
      };
      this.cs.updateCard(card, params['id']);
      this.router.navigate(['card']);
    });
  }
}
