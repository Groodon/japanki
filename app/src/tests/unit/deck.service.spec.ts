import { DeckService } from "../../app/_services/deck.service";
import * as moment from 'moment';
import { exampleDeck1, exampleDeck2, exampleDeck3 } from './example-decks';
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from '../../app/_services/authentication.service';
import {CookieService} from "ngx-cookie-service";
import { CardOrders } from 'src/app/_models/app-enums';

// Straight Jasmine testing without Angular's testing support
describe('DeckService', () => {
    let injector: TestBed;
    let service: DeckService;
    let httpMock: HttpTestingController;
    let now = moment("2020-07-29T00:00:00");

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [DeckService, AuthenticationService, CookieService],
        });
    
        injector = getTestBed();
        service = injector.get(DeckService);
        httpMock = injector.get(HttpTestingController);
      });
  
    it('#study decks should contain the correct amount of cards', () => {
        let exampleDeck = exampleDeck1;
        let decks = service.getSeperateStudyDecks(exampleDeck);
        expect(Object.keys(decks['newCards']).length).toEqual(1);
        expect(Object.keys(decks['repCards']).length).toEqual(1);
        expect(Object.keys(decks['failedCards']).length).toEqual(1);
    });

    it('#study decks with dual order should contain the correct amount of cards', () => {
        let exampleDeck = exampleDeck2;
        let decks = service.getSeperateStudyDecks(exampleDeck);
        expect(Object.keys(decks['newCards']).length).toEqual(2);
        expect(Object.keys(decks['repCards']).length).toEqual(2);
        expect(Object.keys(decks['failedCards']).length).toEqual(2);
    });

    it('#study decks with dual order should contain the correct amount of cards, new card limit is reached', () => {
      let exampleDeck = exampleDeck3;
      let decks = service.getSeperateStudyDecks(exampleDeck);
      expect(Object.keys(decks['newCards']).length).toEqual(1);
      expect(Object.keys(decks['repCards']).length).toEqual(2);
      expect(Object.keys(decks['failedCards']).length).toEqual(2);
  });
});