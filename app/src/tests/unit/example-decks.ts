import { CardOrders } from 'src/app/_models/app-enums';

// deck with order "Jap -> Eng"
// 1 card is new
// 1 card should be repeated
// 1 card should be repeated in the future
// 1 card is failed

let exampleDeck1 = {
    "_id": {
        "$oid": "5f215519fa84cb11d43c6168"
    },
    "order": CardOrders.JapEng,
    "hide_hiragana": false,
    "new_studied": 3,
    "rep_studied": 0,
    "new_max": 30,
    "rep_max": 100,
    "owner": "110262797796532652970",
    "name": "testing",
    "cards": [
        {
            // failed card
            "english_word": "acute stress disorder; ASD",
            "japanese_reading": "きゅうせいストレスしょうがい",
            "kanji": "急性ストレス障害",
            "jap_eng_last_wait_time": 0,
            "eng_jap_last_wait_time": 0,
            "eng_jap_status": 0,
            "jap_eng_status": 0,
            "jap_eng_failed": true,
            "eng_jap_failed": false,
            "jap_eng_seen": true,
            "eng_jap_seen": false,
            "_id": {
                "$oid": "5f215524fa84cb11d43c6169"
            },
            "jap_eng_next_study_time": "2020-07-29T00:00:00",
            "eng_jap_next_study_time": "2020-07-29T00:00:00"
        },
        {
            // Should be repeated in future
            "english_word": "Japan Air Self-Defense Force; JASDF",
            "japanese_reading": "こうくうじえいたい",
            "kanji": "航空自衛隊",
            "jap_eng_last_wait_time": 0,
            "eng_jap_last_wait_time": 0,
            "eng_jap_status": 0,
            "jap_eng_status": 2,
            "jap_eng_failed": false,
            "eng_jap_failed": false,
            "jap_eng_seen": true,
            "eng_jap_seen": false,
            "_id": {
                "$oid": "5f215524fa84cb11d43c616b"
            },
            "jap_eng_next_study_time": "2020-07-30T00:00:00",
            "eng_jap_next_study_time": "2020-07-29T00:00:00"
        },
        {
            // Should be repeated today
            "english_word": "Japan Air Self-Defense Force; JASDF",
            "japanese_reading": "こうくうじえいたい",
            "kanji": "航空自衛隊",
            "jap_eng_last_wait_time": 0,
            "eng_jap_last_wait_time": 1,
            "eng_jap_status": 0,
            "jap_eng_status": 2,
            "jap_eng_failed": false,
            "eng_jap_failed": false,
            "jap_eng_seen": true,
            "eng_jap_seen": false,
            "_id": {
                "$oid": "5f215524fa84cb11d43c616b"
            },
            "jap_eng_next_study_time": "2020-07-29T00:00:00",
            "eng_jap_next_study_time": "2020-07-29T00:00:00"
        },
        {
            // new card
            "english_word": "Air Self-Defense Force; ASDF",
            "japanese_reading": "くうじ",
            "kanji": "空自",
            "jap_eng_last_wait_time": 0,
            "eng_jap_last_wait_time": 0,
            "eng_jap_status": 0,
            "jap_eng_status": 0,
            "jap_eng_failed": false,
            "eng_jap_failed": false,
            "jap_eng_seen": false,
            "eng_jap_seen": false,
            "_id": {
                "$oid": "5f215525fa84cb11d43c616d"
            },
            "jap_eng_next_study_time": "2020-07-29T00:00:00",
            "eng_jap_next_study_time": "2020-07-29T00:00:00"
        }
    ],
    "__v": 0
}

// deck with order "Both"
// 2 card is new
// 2 card should be repeated
// 2 card should be repeated in the future
// 2 card is failed

let exampleDeck2 = {
    "_id": {
        "$oid": "5f215519fa84cb11d43c6168"
    },
    "order": CardOrders.Both,
    "hide_hiragana": false,
    "new_studied": 3,
    "rep_studied": 0,
    "new_max": 30,
    "rep_max": 100,
    "owner": "110262797796532652970",
    "name": "testing",
    "cards": [
        {
            // failed card
            "english_word": "acute stress disorder; ASD",
            "japanese_reading": "きゅうせいストレスしょうがい",
            "kanji": "急性ストレス障害",
            "jap_eng_last_wait_time": 0,
            "eng_jap_last_wait_time": 0,
            "eng_jap_status": 0,
            "jap_eng_status": 0,
            "jap_eng_failed": true,
            "eng_jap_failed": true,
            "jap_eng_seen": true,
            "eng_jap_seen": true,
            "_id": {
                "$oid": "5f215524fa84cb11d43c6169"
            },
            "jap_eng_next_study_time": "2020-07-29T00:00:00",
            "eng_jap_next_study_time": "2020-07-29T00:00:00"
        },
        {
            // Should be repeated in future
            "english_word": "Japan Air Self-Defense Force; JASDF",
            "japanese_reading": "こうくうじえいたい",
            "kanji": "航空自衛隊",
            "jap_eng_last_wait_time": 0,
            "eng_jap_last_wait_time": 0,
            "eng_jap_status": 2,
            "jap_eng_status": 2,
            "jap_eng_failed": false,
            "eng_jap_failed": false,
            "jap_eng_seen": true,
            "eng_jap_seen": true,
            "_id": {
                "$oid": "5f215524fa84cb11d43c616b"
            },
            "jap_eng_next_study_time": "2020-07-30T00:00:00",
            "eng_jap_next_study_time": "2020-07-30T00:00:00"
        },
        {
            // Should be repeated today
            "english_word": "Japan Air Self-Defense Force; JASDF",
            "japanese_reading": "こうくうじえいたい",
            "kanji": "航空自衛隊",
            "jap_eng_last_wait_time": 1,
            "eng_jap_last_wait_time": 1,
            "eng_jap_status": 2,
            "jap_eng_status": 2,
            "jap_eng_failed": false,
            "eng_jap_failed": false,
            "jap_eng_seen": true,
            "eng_jap_seen": true,
            "_id": {
                "$oid": "5f215524fa84cb11d43c616b"
            },
            "jap_eng_next_study_time": "2020-07-29T00:00:00",
            "eng_jap_next_study_time": "2020-07-29T00:00:00"
        },
        {
            // new card
            "english_word": "Air Self-Defense Force; ASDF",
            "japanese_reading": "くうじ",
            "kanji": "空自",
            "jap_eng_last_wait_time": 0,
            "eng_jap_last_wait_time": 0,
            "eng_jap_status": 0,
            "jap_eng_status": 0,
            "jap_eng_failed": false,
            "eng_jap_failed": false,
            "jap_eng_seen": false,
            "eng_jap_seen": false,
            "_id": {
                "$oid": "5f215525fa84cb11d43c616d"
            },
            "jap_eng_next_study_time": "2020-07-29T00:00:00",
            "eng_jap_next_study_time": "2020-07-29T00:00:00"
        }
    ],
    "__v": 0
}

let exampleDeck3 = {
    "_id": {
        "$oid": "5f215519fa84cb11d43c6168"
    },
    "order": CardOrders.Both,
    "hide_hiragana": false,
    "new_studied": 0,
    "rep_studied": 0,
    "new_max": 1,
    "rep_max": 100,
    "owner": "110262797796532652970",
    "name": "testing",
    "cards": [
        {
            // failed card
            "english_word": "acute stress disorder; ASD",
            "japanese_reading": "きゅうせいストレスしょうがい",
            "kanji": "急性ストレス障害",
            "jap_eng_last_wait_time": 0,
            "eng_jap_last_wait_time": 0,
            "eng_jap_status": 0,
            "jap_eng_status": 0,
            "jap_eng_failed": true,
            "eng_jap_failed": true,
            "jap_eng_seen": true,
            "eng_jap_seen": true,
            "_id": {
                "$oid": "5f215524fa84cb11d43c6169"
            },
            "jap_eng_next_study_time": "2020-07-29T00:00:00",
            "eng_jap_next_study_time": "2020-07-29T00:00:00"
        },
        {
            // Should be repeated in future
            "english_word": "Japan Air Self-Defense Force; JASDF",
            "japanese_reading": "こうくうじえいたい",
            "kanji": "航空自衛隊",
            "jap_eng_last_wait_time": 0,
            "eng_jap_last_wait_time": 0,
            "eng_jap_status": 2,
            "jap_eng_status": 2,
            "jap_eng_failed": false,
            "eng_jap_failed": false,
            "jap_eng_seen": true,
            "eng_jap_seen": true,
            "_id": {
                "$oid": "5f215524fa84cb11d43c616b"
            },
            "jap_eng_next_study_time": "2020-07-30T00:00:00",
            "eng_jap_next_study_time": "2020-07-30T00:00:00"
        },
        {
            // Should be repeated today
            "english_word": "Japan Air Self-Defense Force; JASDF",
            "japanese_reading": "こうくうじえいたい",
            "kanji": "航空自衛隊",
            "jap_eng_last_wait_time": 1,
            "eng_jap_last_wait_time": 1,
            "eng_jap_status": 2,
            "jap_eng_status": 2,
            "jap_eng_failed": false,
            "eng_jap_failed": false,
            "jap_eng_seen": true,
            "eng_jap_seen": true,
            "_id": {
                "$oid": "5f215524fa84cb11d43c616b"
            },
            "jap_eng_next_study_time": "2020-07-29T00:00:00",
            "eng_jap_next_study_time": "2020-07-29T00:00:00"
        },
        {
            // new card
            "english_word": "Air Self-Defense Force; ASDF",
            "japanese_reading": "くうじ",
            "kanji": "空自",
            "jap_eng_last_wait_time": 0,
            "eng_jap_last_wait_time": 0,
            "eng_jap_status": 0,
            "jap_eng_status": 0,
            "jap_eng_failed": false,
            "eng_jap_failed": false,
            "jap_eng_seen": false,
            "eng_jap_seen": false,
            "_id": {
                "$oid": "5f215525fa84cb11d43c616d"
            },
            "jap_eng_next_study_time": "2020-07-29T00:00:00",
            "eng_jap_next_study_time": "2020-07-29T00:00:00"
        }
    ],
    "__v": 0
}

export { exampleDeck1, exampleDeck2, exampleDeck3 };