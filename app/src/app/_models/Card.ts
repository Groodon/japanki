// Card
export default class Card {
  _id: string;
  english_word: string;
  japanese_reading: string;
  kanji: string;
  jap_eng_next_study_time: string;
  eng_jap_next_study_time: string;
  jap_eng_last_wait_time: number;
  eng_jap_last_wait_time: number;
  order: number;
  comment: string;
  jap_eng_status: number;
  eng_jap_status: number;
}
