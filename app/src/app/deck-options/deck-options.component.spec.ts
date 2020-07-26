import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckOptionsComponent } from './deck-options.component';

describe('DeckOptionsComponent', () => {
  let component: DeckOptionsComponent;
  let fixture: ComponentFixture<DeckOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
