// =====================================================================
// EINSTELLUNGEN
// =====================================================================
// Antwortformat der Fragen an die Proband:innen:
//
//   "scale"  ->  „Wie sehr legt sich X mit ihrer/seiner Äußerung darauf fest, ...?“
//                Regler: „gar nicht“ ... „voll und ganz“        (Standard)
//   "binary" ->  „Legt sich X mit ihrer/seiner Äußerung darauf fest, ...?“
//                Regler: „nein“ ... „ja“
//
// >>> Zum Umschalten NUR die folgende Zeile ändern <<<
const QUESTION_FORMAT_DEFAULT = "scale";
//
// Optional, ohne die Datei zu ändern: ?format=binary bzw. ?format=scale an die
// URL anhängen (bei Prolific z. B. index.html?format=binary&PROLIFIC_PID=...).
// Die URL hat dann Vorrang vor der Zeile oben. Das tatsächlich verwendete
// Format wird in jeder Zeile der Daten als Spalte "question_format" gespeichert.
const QUESTION_FORMAT = (function() {
  const valid = ["scale", "binary"];
  const fromUrl = new URLSearchParams(window.location.search).get("format");
  if (fromUrl !== null) {
    if (valid.indexOf(fromUrl) !== -1) { return fromUrl; }
    console.error("Ungültiger URL-Parameter format=" + fromUrl + " - wird ignoriert.");
  }
  if (valid.indexOf(QUESTION_FORMAT_DEFAULT) === -1) {
    console.error("Ungültiger Wert bei QUESTION_FORMAT_DEFAULT: " + QUESTION_FORMAT_DEFAULT + " - verwende \"scale\".");
    return "scale";
  }
  return QUESTION_FORMAT_DEFAULT;
})();

// Beschriftungen/Formulierungen, die von den Instruktionen (05_views.js) mitbenutzt werden
const SCALE_LEFT    = (QUESTION_FORMAT === "binary") ? "nein" : "gar nicht";
const SCALE_RIGHT   = (QUESTION_FORMAT === "binary") ? "ja"   : "voll und ganz";
const RATING_PHRASE = (QUESTION_FORMAT === "binary") ? "ob sich" : "wie sehr sich";

// Wandelt Trials in das gewählte Format um (Kopien, Originale bleiben unverändert).
// Bei "binary": „Wie sehr legt sich X mit ...“ -> „Legt sich X mit ...“, Regler nein/ja,
// und „gar nicht“/„voll und ganz“ in den Erklärungen der Übungstrials -> „nein“/„ja“.
function applyQuestionFormat(trials) {
  return trials.map(function(t) {
    const copy = Object.assign({}, t, { question_format: QUESTION_FORMAT });
    if (QUESTION_FORMAT === "binary") {
      const m = copy.question.match(/^Wie sehr legt sich (.+?) mit (ihrer|seiner) Äußerung darauf fest,([\s\S]*)$/);
      if (m) {
        copy.question = "Legt sich " + m[1] + " mit " + m[2] + " Äußerung darauf fest," + m[3];
      } else {
        console.error("Frage konnte nicht ins Format 'binary' umgewandelt werden: " + copy.question);
      }
      copy.optionLeft = SCALE_LEFT;
      copy.optionRight = SCALE_RIGHT;
      if (copy.explanation) {
        copy.explanation = copy.explanation
          .split("„gar nicht“").join("„" + SCALE_LEFT + "“")
          .split("„voll und ganz“").join("„" + SCALE_RIGHT + "“");
      }
    }
    return copy;
  });
}

const practice_trials = {
    sliderRating: [
        {
            item: "998",
            QUD: "<b>Angelika</b>: <I>„Trägt Kilian häufig schwarz, so wie gestern?“</I>",
            question: "Wie sehr legt sich Angelika mit ihrer Äußerung darauf fest, dass es auf Kilian zutrifft, dass er häufig schwarz trägt?",
            optionLeft: "gar nicht",
            optionRight: "voll und ganz",
            explanation: "Da Angelika dies nur fragt, legt sie sich damit nicht darauf fest, ob es auf Kilian zutrifft, dass er häufig schwarz trägt. Der Regler müsste daher weit nach links, zu „gar nicht“.",
            trigger: "practice",
            condition: "1",
            questionIndexInItem: 1,
            totalQuestionsInItem: 2,
            question_type: "PJ",
            inference_type: "none",
            lexicalisation: "none"
        },
        {
            item: "998",
            QUD: "<b>Angelika</b>: <I>„Trägt Kilian häufig schwarz, so wie gestern?“</I>",
            question: "Wie sehr legt sich Angelika mit ihrer Äußerung darauf fest, dass es auf Kilian zutrifft, dass er gestern schwarz getragen hat?",
            optionLeft: "gar nicht",
            optionRight: "voll und ganz",
            explanation: "Da Angelika mit ihrem Zusatz „so wie gestern“ eine Aussage macht, legt sie sich damit darauf fest, dass es auf Kilian zutrifft, dass er gestern schwarz getragen hat. Der Regler müsste daher nah zu „voll und ganz“.",
            trigger: "practice",
            condition: "2",
            questionIndexInItem: 2,
            totalQuestionsInItem: 2,
            question_type: "PJ",
            inference_type: "none",
            lexicalisation: "none"
        },
        {
            item: "999",
            QUD: "<b>Torsten</b>: <I>„Ist Miriam heute so schlecht gelaunt wie letzte Woche?“</I>",
            question: "Wie sehr legt sich Torsten mit seiner Äußerung darauf fest, dass es auf Miriam zutrifft, dass sie heute schlecht gelaunt ist?",
            optionLeft: "gar nicht",
            optionRight: "voll und ganz",
            explanation: "Da Torsten dies nur fragt, legt er sich damit nicht darauf fest, ob es auf Miriam zutrifft, dass sie heute schlecht gelaunt ist. Der Regler müsste daher weit nach links, zu „gar nicht“.",
            trigger: "practice",
            condition: "1",
            questionIndexInItem: 1,
            totalQuestionsInItem: 2,
            question_type: "PJ",
            inference_type: "none",
            lexicalisation: "none"
        },
        {
            item: "999",
            QUD: "<b>Torsten</b>: <I>„Ist Miriam heute so schlecht gelaunt wie letzte Woche?“</I>",
            question: "Wie sehr legt sich Torsten mit seiner Äußerung darauf fest, dass es auf Miriam zutrifft, dass sie letzte Woche schlechte Laune hatte?",
            optionLeft: "gar nicht",
            optionRight: "voll und ganz",
            explanation: "Da Torsten mit seinem Zusatz „wie letzte Woche“ eine Aussage macht, legt er sich damit darauf fest, dass es auf Miriam zutrifft, dass sie letzte Woche schlechte Laune hatte. Der Regler müsste daher nah zu „voll und ganz“.",
            trigger: "practice",
            condition: "2",
            questionIndexInItem: 2,
            totalQuestionsInItem: 2,
            question_type: "PJ",
            inference_type: "none",
            lexicalisation: "none"
        }
    ]
};
practice_trials.sliderRating = applyQuestionFormat(practice_trials.sliderRating);

/* generate the main trials for this participant: groups all questions
belonging to the same item/filler together, randomises the order of
items (respecting the Außer-gap constraint) and randomises the order of
each item's own questions. See create_trials() in 02_custom_functions.js */
var main_trial_new = applyQuestionFormat(create_trials(maintrials_PJ));

const attention_check_trials = [
    {
        item: "attention_check_1",
        QUD: "<b>Kontrollfrage</b>",
        question: "Wählen Sie die korrekte Antwort.",
        optionLeft: "Nicht mich",
        optionRight: "Mich, Sie Schlitzohr",
        explanation: "",
        checkMin: 85,
        checkMax: 100,
        trigger: "attention_check",
        condition: "1"
    },
    {
        item: "attention_check_2",
        QUD: "<b>Kontrollfrage</b>",
        question: "Ich werde jeden Monat von Kobolden bezahlt. Wie sehr trifft diese Aussage auf Sie zu?",
        optionLeft: "gar nicht",
        optionRight: "voll und ganz",
        explanation: "",
        checkMin: 0,
        checkMax: 15,
        trigger: "attention_check",
        condition: "2"
    }
];
