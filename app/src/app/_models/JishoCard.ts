export default class JishoCard {
  slug: string;
  is_common: boolean;
  tags: Array<string>;
  jlpt: Array<string>;
  japanese: Array<object>;
  attribution: object;
  senses: Array<Sense>;
}

class Sense {
  english_definitions: Array<string>;
}
