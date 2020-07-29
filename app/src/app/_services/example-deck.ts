// deck with order "Jap -> Eng"
// 1 card is new
// 1 card should be repeated
// 1 card should be repeated in the future
// 1 card is failed

let exampleDeck1 = {
    "_id": {
        "$oid": "5f1ff7e59213f731489ee8b3"
    },
    "order": 1,
    "hide_hiragana": false,
    "new_studied": 0,
    "rep_studied": 0,
    "new_max": 30,
    "rep_max": 100,
    "owner": "110262797796532652970",
    "name": "asd",
    "cards": [
        {
            "english_word": "acute stress disorder; ASD",
            "japanese_reading": "きゅうせいストレスしょうがい",
            "kanji": "急性ストレス障害",
            "jap_eng_last_wait_time": 0,
            "eng_jap_last_wait_time": 0,
            "eng_jap_status": 0,
            "jap_eng_status": 0,
            "jap_eng_failed": false,
            "eng_jap_failed": false,
            "jap_eng_seen": false,
            "eng_jap_seen": false,
            "_id": {
                "$oid": "5f1ff7e99213f731489ee8b4"
            },
            "jap_eng_next_study_time": "2020-07-28T00:00:00",
            "eng_jap_next_study_time": "2020-07-28T00:00:00"
        },
        {
            "english_word": "Japan Air Self-Defense Force; JASDF",
            "japanese_reading": "こうくうじえいたい",
            "kanji": "航空自衛隊",
            "jap_eng_last_wait_time": 0,
            "eng_jap_last_wait_time": 0,
            "eng_jap_status": 0,
            "jap_eng_status": 0,
            "jap_eng_failed": false,
            "eng_jap_failed": false,
            "jap_eng_seen": false,
            "eng_jap_seen": false,
            "_id": {
                "$oid": "5f1ff7ea9213f731489ee8b6"
            },
            "jap_eng_next_study_time": "2020-07-28T00:00:00",
            "eng_jap_next_study_time": "2020-07-28T00:00:00"
        },
        {
            "english_word": "Air Self-Defense Force; ASDF",
            "japanese_reading": "くうじ",
            "kanji": "空自",
            "jap_eng_last_wait_time": 4,
            "eng_jap_last_wait_time": 0,
            "eng_jap_status": 0,
            "jap_eng_status": 0,
            "jap_eng_failed": true,
            "eng_jap_failed": false,
            "jap_eng_seen": false,
            "eng_jap_seen": false,
            "_id": {
                "$oid": "5f1ff7eb9213f731489ee8b8"
            },
            "jap_eng_next_study_time": "Sat Aug 01 2020 00:00:00 GMT+0200",
            "eng_jap_next_study_time": "2020-07-28T00:00:00"
        }
    ],
    "__v": 0
}

export { exampleDeck1 };