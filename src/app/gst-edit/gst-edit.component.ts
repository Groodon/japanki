import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { CardService } from '../card.service';

@Component({
  selector: 'app-gst-edit',
  templateUrl: './gst-edit.component.html',
  styleUrls: ['./gst-edit.component.css']
})
export class GstEditComponent implements OnInit {

  business: any = {};
  angForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private bs: CardService,
              private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      english_word: ['', Validators.required ],
      japanese_word: ['', Validators.required ],
      business_gst_number: ['', Validators.required ]
    });
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bs.editBusiness(params['id']).subscribe(res => {
        this.business = res;
      });
    });
  }

  updateBusiness(person_name, business_name, business_gst_number) {
    this.route.params.subscribe(params => {
      this.bs.updateBusiness(person_name, business_name, business_gst_number, params['id']);
      this.router.navigate(['business']);
    });
  }
}
