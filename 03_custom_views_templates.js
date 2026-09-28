// In this file you can create your own custom view templates


// A view template is a function that returns a view,
// this functions gets some config (e.g. trial_data, name, etc.) information as input
// A view is an object, that has a name, CT (the counter of how many times this view occurred in the experiment),
// trials the maximum number of times this view is repeated
// and a render function, the render function gets CT and the magpie-object as input
// and has to call magpie.findNextView() eventually to proceed to the next view (or the next trial in this view),
// if it is an trial view it also makes sense to call magpie.trial_data.push(trial_data) to save the trial information

const custom_posttest_generator = {
  stimulus_container_gen: function(config, CT) {
    return `<div class='magpie-view magpie-post-test-view'>
                    <h1 class='magpie-view-title'>${config.title}</h1>
                    <section class="magpie-text-container">
                        <p class="magpie-view-text">${config.text}</p>
                    </section>
                </div>`;
  },

  answer_container_gen: function(config, CT) {
    const quest = magpieUtils.view.fill_defaults_post_test(config);
    return `<form>
                    <p class='magpie-view-text'>
                        <label for="age">${quest.age.title}:</label>
                        <input type="number" name="age" min="18" max="110" id="age" />
                    </p>
                    <p class='magpie-view-text'>
                        <label for="gender">${quest.gender.title}:</label>
                        <select id="gender" name="gender">
                            <option></option>
                            <option value="${quest.gender.male}">${quest.gender.male}</option>
                            <option value="${quest.gender.female}">${quest.gender.female}</option>
                            <option value="${quest.gender.other}">${quest.gender.other}</option>
                        </select>
                    </p>
                    <p class='magpie-view-text'>
                        <label for="education">${quest.edu.title}:</label>
                        <select id="education" name="education">
                            <option></option>
                            <option value="${quest.edu.graduated_high_school}">${quest.edu.graduated_high_school}</option>
                            <option value="${quest.edu.graduated_college}">${quest.edu.graduated_college}</option>
                            <option value="${quest.edu.higher_degree}">${quest.edu.higher_degree}</option>
                            <option value="Berufsausbildung">Berufsausbildung</option>
                            <option value="Realschulabschluss">Realschulabschluss</option>
                            <option value="Hauptschulabschluss">Hauptschulabschluss</option>
                        </select>
                    </p>

                    <p class='magpie-view-text'>
                    <label for="education2">Falls Sie studieren, beantworten Sie bitte die folgenden Fragen:</label>
                    <br>
                      <label for="Fachrichtung">Fachrichtung(en) des Studiums (bspw. Philosophischer, Naturwissenschaftlicher, Sozialwissenschaftlicher, Theologischer etc.):</label>
                      <input type="text" id="Fachrichtung"/>
                      <label for="Studiengang">Studiengang (B.A./M.A./Phd):</label>
                      <input type="text" id="Studiengang"/>
                      <label for="Studienabschluss">Höchster Studienabschluss bisher:</label>
                        <select id="Studienabschluss" name="Studienabschluss">
                            <option></option>
                            <option value="B.A.">B.A.</option>
                            <option value="M.A.">M.A.</option>
                            <option value="PHD">PhD</option>
                        </select>
                    </p>

                    <p class='magpie-view-text'>
                        <label for="handedness">Händigkeit:</label>
                        <select id="handedness" name="handedness">
                            <option></option>
                            <option value="rechtshändig">rechtshändig</option>
                            <option value="linkshändig">linkshändig</option>
                            <option value="beidhändig">beidhändig</option>
                        </select>
                    </p>

                    <p class='magpie-view-text'>
                        <label for="languages" name="languages">${quest.langs.title}:<br /><span>${quest.langs.text}</</span></label>
                        <input type="text" id="languages"/>
                    </p>

                    <p class='magpie-view-text'>
                        <label for="languages2" name="weitere Muttersprachen">Weitere Muttersprachen (ja/nein):<br /><span></</span></label>
                        <input type="text2" id="languages2"/>
                    </p>

                    <p class="magpie-view-text">
                        <label for="aufgefallen">Was ist Ihnen aufgefallen?</label>
                        <textarea name="aufgefallen" id="aufgefallen" rows="6" cols="40"></textarea>
                        <p class="magpie-ai-notice">Bitte antworten Sie mit Ihren eigenen Worten. Benutzen Sie keine AI/KI oder externe Webseiten; wir sind an Ihrer eigenen Meinung interessiert. Die Beantwortung mit Bots würde unsere Ergebnisse verfälschen und uns nicht weiterhelfen.</p>
                    </p>

                    <p class="magpie-view-text">
                        <label for="anmerkung">Worum ging es in dem Experiment? (Wenn Sie nicht sicher sind, raten Sie)</label>
                        <textarea name="anmerkung" id="anmerkung" rows="6" cols="40"></textarea>
                        <p class="magpie-ai-notice">Bitte antworten Sie mit Ihren eigenen Worten. Benutzen Sie keine AI/KI oder externe Webseiten; wir sind an Ihrer eigenen Meinung interessiert. Die Beantwortung mit Bots würde unsere Ergebnisse verfälschen und uns nicht weiterhelfen.</p>
                    </p>

                    <p class="magpie-view-text">
                        <label for="comments">${quest.comments.title}</label>
                        <textarea name="comments" id="comments" rows="6" cols="40"></textarea>
                        <p class="magpie-ai-notice">Bitte antworten Sie mit Ihren eigenen Worten. Benutzen Sie keine AI/KI oder externe Webseiten; wir sind an Ihrer eigenen Meinung interessiert. Die Beantwortung mit Bots würde unsere Ergebnisse verfälschen und uns nicht weiterhelfen.</p>
                    </p>
                    <button id="next" class='magpie-view-button'>${config.button}</button>
            </form>`;
  },

  handle_response_function: function(
    config,
    CT,
    magpie,
    answer_container_generator,
    startingTime
  ) {
    $(".magpie-view").append(answer_container_generator(config, CT));

    $("#next").on("click", function(e) {
      // prevents the form from submitting
      e.preventDefault();

      // records the post test info
      // magpie.global_data.mainTrialList = list; // not needed for the pilot; likely needed again for the full experiment later
      magpie.global_data.age = $("#age").val();
      magpie.global_data.gender = $("#gender").val();
      magpie.global_data.education = $("#education").val();
      magpie.global_data.Fachrichtung = $("#Fachrichtung").val();
      magpie.global_data.Studiengang = $("#Studiengang").val();
      magpie.global_data.Studienabschluss = $("#Studienabschluss").val();
      magpie.global_data.handedness = $("#handedness").val();
      magpie.global_data.languages = $("#languages").val();
      magpie.global_data.languages2 = $("#languages2").val();
      magpie.global_data.aufgefallen = $("#aufgefallen").val();
      magpie.global_data.anmerkung = $("#anmerkung").val();
      magpie.global_data.comments = $("#comments")
        .val()
        .trim();
      magpie.global_data.endTime = Date.now();
      magpie.global_data.timeSpent =
        (magpie.global_data.endTime - magpie.global_data.startTime) / 60000;

      // moves to the next view
      magpie.findNextView();
    });
  }
};

const custom_consentform_generator = {
  stimulus_container_gen: function(config, CT) {
    return `<div class='magpie-view magpie-post-test-view'>
                    <h1 class='magpie-view-title'>${config.title}</h1>
                    <section class="magpie-text-container">
                        <p class="magpie-view-text">${config.text}</p>
                    </section>
                </div>`;
  },

  answer_container_gen: function(config, CT) {
    const quest = magpieUtils.view.fill_defaults_post_test(config);
    return `<form>
    				  <p class='magpie-view-text'>
    				      <div class="checkbox">
    				          <label for="1">
        	             <input type="checkbox" class="box" name="erste" value="checked" unchecked onclick="handler" id="1"/>
        	              Ich bin schriftlich über das Experiment und den Versuchsablauf aufgeklärt worden.</label>
                  </div>
					    </p>
					    <p class='magpie-view-text'>
					         <div class="checkbox">
    				           <label for="2" >
        	              <input type="checkbox" class="box" name="zweite" value="checked" unchecked onclick="handler" id="2"/>
        	               Ich willige ein, am Sentence-Evaluation-Experiment V teilzunehmen.
                       </label>
					         </div>
					    </p>
					    <p class='magpie-view-text'>
					         <div class="checkbox">
    				           <label for="3" >
        	              <input type="checkbox" class="box" name="dritte" value="checked" unchecked onclick="handler" id="3"/>
                        Ich bin damit einverstanden, dass die vollständig anonymisierten Daten dieses Experimentes zudem als offene Daten im Internet in einem Datenarchiv
                        zugänglich gemacht werden.
                        Ein solches Vorgehen bedeutet, dass auch andere Forscherinnen und Forscher auf die anonymisierten Daten zugreifen können,
                        um diese ggf. neu auszuwerten und weiterführende eigene Fragestellungen zu untersuchen.
        	              </label>
					         </div>
					    </p>
              <p class='magpie-view-text'>
					         <div class="checkbox">
    				           <label for="4" >
        	              <input type="checkbox" class="box" name="vierte" value="checked" unchecked onclick="handler" id="4"/>
                        Mir ist bekannt, dass ich mein Einverständnis auch während des Experimentes vor Betätigen des letzten Buttons „CONFIRM“ widerrufen kann.
                        Wenn ich vor Betätigung dieses Buttons das Experiment abbreche, werden meinen Daten nicht gespeichert.
                        Ich weiß, dass ich in diesem Fall Anspruch auf eine Vergütung für die bis dahin erbrachte Zeit habe.
                        Es gilt der Stundensatz von 12 £. Falls ich vorzeitig abbreche, melde ich mich per E-Mail oder über Prolific beim Versuchsdurchführenden.
        	              </label>
					         </div>
					    </p>
              <p class='magpie-view-text'>
                 <div class="checkbox">
                     <label for="5" >
                      <input type="checkbox" class="box" name="fuenfte" value="checked" unchecked onclick="handler" id="5"/>
                      Sobald ich auf den Button „CONFIRM“ geklickt habe, werden meine Daten an einen Server gesendet
                      und zunächst mit meiner Prolific ID gespeichert.
                      </label>
                 </div>
             </p>
					    <p class='magpie-view-text'>
    				      <div class="checkbox">
    				          <label for="6">
        	             <input type="checkbox" class="box" name="sechste" value="checked" unchecked onclick="handler" id="6"/>
                       Ich bin damit einverstanden, im Rahmen des Experimentes personenbezogene Fragen, wie Alter, Händigkeit, sprachlicher Hintergrund und Bildungsgrad zu beantworten.
                       Zudem bin ich mit der in den Teilnahmeinformationen beschriebenen Handhabung dieser Daten einverstanden.
                      </label>
                  </div>
					    </p>
					     <p class='magpie-view-text'>
    				      <div class="checkbox">
    				          <label for="7" >
        	             <input type="checkbox" class="box" name="siebte" value="checked" unchecked onclick="handler" id="7"/>
        	              Bis zur Datenauswertung und der darin anschließenden Löschung meiner Prolific ID, die spätestens am 31.12.2027 erfolgt,
                        habe ich die Möglichkeit, jederzeit die Löschung meiner Daten durch das Senden einer E-Mail an oder einer Nachricht über Prolific zu verlangen.
                      </label>
                  </div>
					    </p>
					    <p class='magpie-view-text'>
    				      <div class="checkbox">
    				          <label for="8">
        	             <input type="checkbox" class="box" name="achte" value="checked" unchecked onclick="handler" id="8"/>
        	              Sobald meine Prolific ID aus meinen Daten gelöscht wurde, was spätestens am 31.12.2027 erfolgt,
                        sind meine Daten anonymisiert und nicht mehr identifizierbar.
                        Ich kann dann keine Löschung meiner Daten mehr verlangen.
                      </label>
                  </div>
					    </p>
					     <p class='magpie-view-text'>
    				      <div class="checkbox">
    				          <label for="9" >
        	             <input type="checkbox" class="box" name="neunte" value="checked" unchecked onclick="handler" id="9"/>
        	              Ich bin damit einverstanden, dass meine anonymisierten Daten zu Forschungszwecken weiterverwendet werden können und mindestens zehn Jahre gespeichert werden.
                      </label>
                  </div>
					    </p>
					     <p class='magpie-view-text'>
    				      <div class="checkbox">
    				          <label for="10" >
        	             <input type="checkbox" class="box" name="zehnte" value="checked" unchecked onclick="handler" id="10"/>
        	              Ich hatte genügend Zeit für eine Entscheidung und bin bereit, an dem o.g. Experiment teilzunehmen.
                      </label>
                  </div>
					    </p>
              <p class='magpie-view-text'  >
                <div class="checkbox">
                <b>Rückmeldung von Ergebnissen</b>
                  <br />
                  Wenn ich daran interessiert bin, etwas über die grundsätzlichen Ergebnisse des Experimentes zu erfahren,
                  kann ich durch Senden einer E-Mail an nadine.balbach@uni-tuebingen.de oder Nachricht über Prolific um Übersendung entsprechender Informationen hierzu bitten.
                </div>
              </p>
              <p class='magpie-view-text'  >
                <div class="tabelle">
                <p> Bei Fragen oder anderen Anliegen kann ich mich an folgende Personen wenden: </p>
                <p>Nadine Balbach<br/>
                Wissenschaftliche Mitarbeiterin<br/>
                Assoziiert mit SFB 1718 Common Ground<br/>
                Seminar für Sprachwissenschaft<br/>
                Universität Tübingen<br/>
                Keplerstr. 2, 72074, Tübingen<br/>
                (+49) 7071 29-75665<br/>
                nadine.balbach@uni-tuebingen.de</p>
                </div>
              </p>
              <p class='magpie-view-text'  >
                <div class="checkbox">
                <FONT COLOR="#FF0000"><b>Der „WEITER“ Button wird erst anklickbar, wenn alle oben aufgeführten Kästchen ausgewählt wurden!</b></FONT>
                <br />
                <br />
                </div>
              </p>
              <button id="next" class='magpie-view-button' disabled="disabled">${config.button}</button>

            </form>`;
  },

  handle_response_function: function(
    config,
    CT,
    magpie,
    answer_container_generator,
    startingTime
  ) {
    $(".magpie-view").append(answer_container_generator(config, CT));


    // $("#next").on("click", function(e) {
    //   // prevents the form from submitting
    //   e.preventDefault();

      // records the post test info
		// $('#1,#2').on( "click", function() {
    $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10').click(function () {
  		if($('#1:checked,#2:checked,#3:checked,#4:checked,#5:checked,#6:checked,#7:checked,#8:checked,#9:checked, #10:checked').length == 10)
      {
  	     $('#next').removeAttr('disabled');
       }
       else
       {
  	      $('#next').attr('disabled', 'disabled');
        }
      });

    $("#next").on("click", function(e) {
          // prevents the form from submitting
      e.preventDefault();
      // moves to the next view
        magpie.findNextView();
    });

  }
};

const custom_group_id_generator = {
  stimulus_container_gen: function(config, CT) {
    return `<div class='magpie-view magpie-post-test-view'>
                      <h1 class='magpie-view-title'>GROUP ID</h1>
                  </div>`;
  },
  answer_container_gen: function(config, CT) {
    const quest = magpieUtils.view.fill_defaults_post_test(config);
    return `<form>
                      <p class="magpie-view-text">
                          <label for="groupId">Enter a number between 1 and 4</label>
                          <textarea name="groupId" id="groupId" rows="1" cols="2"></textarea>
                      </p>
                      <button id="next" class='magpie-view-button'>${config.button}</button>
              </form>`;
  },

  handle_response_function: function(
    config,
    CT,
    magpie,
    answer_container_generator,
    startingTime
  ) {
    $(".magpie-view").append(answer_container_generator(config, CT));

    $("#next").on("click", function(e) {
      // prevents the form from submitting
      e.preventDefault();
      magpie.global_data.groupId = $("#groupId")
        .val()
        .trim();
      // magpie.global_data.mainTrialList = list; // not needed for the pilot; likely needed again for the full experiment later
      magpie.global_data.endTime = Date.now();
      magpie.global_data.timeSpent =
        (magpie.global_data.endTime - magpie.global_data.startTime) / 60000;

      // moves to the next view
      magpie.findNextView();
    });
  }
};

//answer_container_generator and handler in order to present the several
//questions belonging to one and the same item/filler (same stimulus/QUD)
//one after another, before moving on to the next item/filler.
//
//Whether the *next* trial in config.data still belongs to the same item as
//the current one determines the button text ("Nächste Frage" vs. "Weiter").
//A small stack-of-sheets widget (bottom right) shows progress *within* the
//current item's own questions (e.g. "2 von 3"), separate from the overall
//experiment progress bar provided by magpie itself.
function nextTrialIsSameItem(config, CT) {
  const nextTrial = config.data[CT + 1];
  return !!nextTrial && nextTrial.item === config.data[CT].item;
}

// Renders a small stack of "sheets", one per question belonging to the
// current item, plus a "Frage X von Y" label. Positioned just below
// magpie's built-in (top right) experiment-wide progress bar; separate
// from that bar, this shows progress through the current item's own
// question set only.
function item_progress_stack_gen(config, CT) {
    const current = config.data[CT];
    const total = current.totalQuestionsInItem;
    const idx = current.questionIndexInItem;

    if (!total || total <= 1) {
        return '';
    }

    let sheetsHtml = '';
    // Draw the sheets back-to-front so the current one ends up on top.
    for (let i = total; i >= 1; i--) {
        const offset = (total - i) * 3; // px, creates the fanned-out stack look
        const isCurrent = i === idx;
        const style = `right:${offset}px; top:${offset}px; z-index:${100 - i};`;
        sheetsHtml += `<div class="magpie-item-progress-sheet${isCurrent ? ' current' : ''}" style="${style}">${isCurrent ? idx : ''}</div>`;
    }

    return `<div class="magpie-item-progress">
                <div class="magpie-item-progress-stack">${sheetsHtml}</div>
                <div class="magpie-item-progress-label">${idx} von ${total}</div>
            </div>`;
}

// Renders an open comment box, shown on the last question of items that
// were randomly picked (see selectCommentItems() in 02_custom_functions.js)
// for a brief "why did you answer this way" prompt.
function comment_box_gen(config, CT) {
    if (!config.data[CT].showComment) {
        return '';
    }
    return `<div class="magpie-comment-container magpie-nodisplay" id="commentContainer">
                <p class="magpie-view-question">Warum haben Sie bei dieser Frage so bewertet? Was ist Ihnen durch den Kopf gegangen?</p>
                <textarea id="itemComment" class="magpie-comment-textarea" rows="4" placeholder="Ihre Gedanken"></textarea>
                <p class="magpie-ai-notice">Bitte antworten Sie mit Ihren eigenen Worten. Benutzen Sie keine AI/KI oder externe Webseiten; wir sind an Ihrer eigenen Meinung interessiert. Die Beantwortung mit Bots würde unsere Ergebnisse verfälschen und uns nicht weiterhelfen.</p>
            </div>`;
}

const custom_answer_container_generators = {
slider_rating: function(config, CT) {
    const option1 = config.data[CT].optionLeft;
    const option2 = config.data[CT].optionRight;
    const buttonText = nextTrialIsSameItem(config, CT) ? "Nächste Frage" : "Weiter";

    return `<p class='magpie-view-question'>${config.data[CT].question}</p>
            <div class='magpie-view-answer-container'>
                <span class='magpie-response-slider-option'>${option1}</span>
                <input type='range' id='response' class='magpie-response-slider' min='0' max='100' value='50'/>
                <span class='magpie-response-slider-option'>${option2}</span>
                <p class='magpie-view-question magpie-view-qud magpie-nodisplay' id='explanation'> ${config.data[CT].explanation}</p>
            </div>
            ${item_progress_stack_gen(config, CT)}
            <button id="next" class='magpie-view-button magpie-nodisplay'>${buttonText}</button>`;
},
slider_rating_main: function(config, CT) {
    const option1 = config.data[CT].optionLeft;
    const option2 = config.data[CT].optionRight;
    const buttonText = nextTrialIsSameItem(config, CT) ? "Nächste Frage" : "Weiter";

    return `<p class='magpie-view-question'>${config.data[CT].question}</p>
            <div class='magpie-view-answer-container'>
                <span class='magpie-response-slider-option'>${option1}</span>
                <input type='range' id='response' class='magpie-response-slider' min='0' max='100' value='50'/>
                <span class='magpie-response-slider-option'>${option2}</span>
            </div>
            ${comment_box_gen(config, CT)}
            ${item_progress_stack_gen(config, CT)}
            <button id="next" class='magpie-view-button magpie-nodisplay'>${buttonText}</button>`;
},
};

const custom_handle_response_functions = {
slider_rating: function(config, CT, magpie, answer_container_generator, startingTime){
    let response;

    $(".magpie-view").append(answer_container_generator(config, CT));


    response = $("#response");
    // checks if the slider has been changed
    response.on("change", function() {
        $("#explanation").removeClass("magpie-nodisplay");
        $("#next").removeClass("magpie-nodisplay");
    });
    response.on("click", function() {
        $("#next").removeClass("magpie-nodisplay");
    });


    $("#next").on("click", function() {
        const RT = Date.now() - startingTime; // measure RT before anything else
        let trial_data = {
            trial_name: config.name,
            trial_number: CT + 1,
            response: response.val(),
            RT: RT
        };

        trial_data = magpieUtils.view.save_config_trial_data(config.data[CT], trial_data);

        magpie.trial_data.push(trial_data);
        magpie.findNextView();

    });
},

attention_check: function(config, CT, magpie, answer_container_generator, startingTime){
    let response;

    $(".magpie-view").append(answer_container_generator(config, CT));

    response = $("#response");
    response.on("change", function() {
        $("#next").removeClass("magpie-nodisplay");
    });
    response.on("click", function() {
        $("#next").removeClass("magpie-nodisplay");
    });

    $("#next").on("click", function() {
        const RT = Date.now() - startingTime;
        const val = parseFloat(response.val());
        const passed = val >= config.data[CT].checkMin && val <= config.data[CT].checkMax;

        let trial_data = {
            trial_name: config.name,
            trial_number: CT + 1,
            response: response.val(),
            RT: RT,
            attention_check_passed: passed
        };

        trial_data = magpieUtils.view.save_config_trial_data(config.data[CT], trial_data);
        magpie.trial_data.push(trial_data);

        // Only evaluate once both attention checks have been answered.
        // Prolific policy: screen out only if BOTH (two different) checks failed.
        if (CT === config.trials - 1) {
            const relevant = magpie.trial_data.filter(d => d.trial_name === config.name);
            const failedCount = relevant.filter(d => d.attention_check_passed === false).length;
            if (failedCount >= config.trials) {
                window.location.href = "PROLIFIC_FAILED_ATTENTION_CHECK_URL";
                return;
            }
        }
        magpie.findNextView();
    });
},

slider_rating_main: function(config, CT, magpie, answer_container_generator, startingTime){
    let response;

    $(".magpie-view").append(answer_container_generator(config, CT));


    response = $("#response");
    // checks if the slider has been changed
    response.on("change", function() {
        $("#next").removeClass("magpie-nodisplay");
        $("#commentContainer").removeClass("magpie-nodisplay");
    });
    response.on("click", function() {
        $("#next").removeClass("magpie-nodisplay");
        $("#commentContainer").removeClass("magpie-nodisplay");
    });


    $("#next").on("click", function() {
        const RT = Date.now() - startingTime; // measure RT before anything else
        let trial_data = {
            trial_name: config.name,
            trial_number: CT + 1,
            response: response.val(),
            RT: RT
        };
        if (config.data[CT].showComment) {
            trial_data.comment = $("#itemComment").val();
        }

        trial_data = magpieUtils.view.save_config_trial_data(config.data[CT], trial_data);

        magpie.trial_data.push(trial_data);
        magpie.findNextView();

    });
},
};


//answer_container_generator and handler in order to present both conditions of an item (also for the practice trials) on one slide
// const custom_answer_container_generators = {
//     slider_rating: function(config, CT) {
//         const itemData = config.data[CT];
//         const qud = itemData.QUD;
//
//         // Determine whether the current item is different from the previous one
//         const isNewItem = config.data[CT - 2]?.item !== itemData.item;
//
//         // Display the QUD only once per item
//         const qudHtml = isNewItem ? `<p class='magpie-view-question' id='qud'>${qud}</p>` : '';
//
//         const question1 = itemData.question;
//         const optionLeft1 = itemData.optionLeft;
//         const optionRight1 = itemData.optionRight;
//         const explanation1 = itemData.explanation;
//
//         return `
//             ${qudHtml}
//             <p class='magpie-view-question' id='question1'>${question1}</p>
//             <div class='magpie-view-answer-container'>
//                 <span class='magpie-response-slider-option'>${optionLeft1}</span>
//                 <input type='range' id='response1' class='magpie-response-slider' min='0' max='100' value='50'/>
//                 <span class='magpie-response-slider-option'>${optionRight1}</span>
//                 <p class='magpie-view-question magpie-nodisplay' id='explanation1'>${explanation1}</p>
//             </div>
//             <p class='magpie-view-question' id='question2'>${config.data[CT + 1].question}</p>
//             <div class='magpie-view-answer-container'>
//                 <span class='magpie-response-slider-option'>${config.data[CT + 1].optionLeft}</span>
//                 <input type='range' id='response2' class='magpie-response-slider' min='0' max='100' value='50'/>
//                 <span class='magpie-response-slider-option'>${config.data[CT + 1].optionRight}</span>
//                 <p class='magpie-view-question magpie-nodisplay' id='explanation2'>${config.data[CT + 1].explanation}</p>
//             </div>
//             <button id="next" class='magpie-view-button magpie-nodisplay'>Weiter</button>
//         `;
//     },
//     slider_rating_main: function(config, CT) {
//         const itemData = config.data[CT];
//         const qud = itemData.QUD;
//
//         // Determine whether the current item is different from the previous one
//         const isNewItem = config.data[CT - 2]?.item !== itemData.item;
//
//         // Display the QUD only once per item
//         const qudHtml = isNewItem ? `<p class='magpie-view-question' id='qud'>${qud}</p>` : '';
//
//         const question1 = itemData.question;
//         const optionLeft1 = itemData.optionLeft;
//         const optionRight1 = itemData.optionRight;
//
//         return `
//             ${qudHtml}
//             <p class='magpie-view-question' id='question1'>${question1}</p>
//             <div class='magpie-view-answer-container'>
//                 <span class 'magpie-response-slider-option'>${optionLeft1}</span>
//                 <input type 'range' id='response1' class='magpie-response-slider' min='0' max='100' value='50'/>
//                 <span class='magpie-response-slider-option'>${optionRight1}</span>
//             </div>
//             <p class='magpie-view-question' id='question2'>${config.data[CT + 1].question}</p>
//             <div class='magpie-view-answer-container'>
//                 <span class='magpie-response-slider-option'>${config.data[CT + 1].optionLeft}</span>
//                 <input type='range' id='response2' class='magpie-response-slider' min='0' max='100' value='50'/>
//                 <span class='magpie-response-slider-option'>${config.data[CT + 1].optionRight}</span>
//             </div>
//         `;
//     },
// };
//
// const custom_handle_response_functions = {
//     slider_rating: function(config, CT, magpie, answer_container_generator, startingTime) {
//         let response1;
//         let response2;
//
//         $(".magpie-view").append(answer_container_generator(config, CT));
//
//         response1 = $("#response1");
//         response2 = $("#response2");
//
//         response1.on("change", function() {
//             $("#explanation1").removeClass("magpie-nodisplay");
//             if (!$("#explanation2").hasClass("magpie-nodisplay") && !$("#next").hasClass("magpie-nodisplay")) {
//                 $("#next").removeClass("magpie-nodisplay");
//             }
//         });
//
//         response2.on("change", function() {
//             $("#explanation2").removeClass("magpie-nodisplay");
//           //  if (!$("#explanation1").hasClass("magpie-nodisplay") && !$("#next").hasClass("magpie-nodisplay")) {
//                 $("#next").removeClass("magpie-nodisplay");
//           //  }
//         });
//
//          // response.on("click", function() {
//          //     $("#next").removeClass("magpie-nodisplay");
//          // });
//
//         $("#next").on("click", function() {
//             const RT = Date.now() - startingTime;
//             let trial_data = {
//                 trial_name: config.name,
//                 trial_number: CT + 1,
//                 response1: response1.val(),
//                 response2: response2.val(),
//                 RT: RT,
//                 question1: config.data[CT].question,
//                 optionLeft1: config.data[CT].optionLeft,
//                 optionRight1: config.data[CT].optionRight,
//                 question2: config.data[CT + 1].question,
//                 optionLeft2: config.data[CT + 1].optionLeft,
//                 optionRight2: config.data[CT + 1].optionRight,
//             };
//
//             trial_data = magpieUtils.view.save_config_trial_data(config.data[CT], trial_data);
//
//             magpie.trial_data.push(trial_data);
//             magpie.findNextView();
//         });
//     },
//     slider_rating_main: function(config, CT, magpie, answer_container_generator, startingTime) {
//         // Handle condition 2 (if you have separate slides for conditions)
//     },
// };
