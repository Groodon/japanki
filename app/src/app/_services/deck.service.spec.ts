// import { DeckService } from "./deck.service";
// import * as moment from 'moment';
// import {exampleDeck1} from './example-deck';

// // Straight Jasmine testing without Angular's testing support
// describe('DeckService', () => {
//     let service: DeckService;
//     let now = moment("2020-07-28T00:00:00");

//     let exampleDeck = exampleDeck1;
  
//     it('#getValue should return real value', () => {
//       expect(service.getValue()).toBe('real value');
//     });
  
//     it('#getObservableValue should return value from observable',
//       (done: DoneFn) => {
//       service.getObservableValue().subscribe(value => {
//         expect(value).toBe('observable value');
//         done();
//       });
//     });
  
//     it('#getPromiseValue should return value from a promise',
//       (done: DoneFn) => {
//       service.getPromiseValue().then(value => {
//         expect(value).toBe('promise value');
//         done();
//       });
//     });
//   });