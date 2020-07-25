import Card from './Card';

export default class Deck {
  _id: string;
  name: string;
  cards: Card[];
  order: number;
}
