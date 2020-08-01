import Card from './Card';

export default class Deck {
  _id: string;
  name: string;
  cards: Card[];
  order: number;
  new_studied: number;
  rep_studied: number;
  new_max: number;
  rep_max: number;
  shared: boolean;
  owner: string;
}
