// In this file you initialize and configure your experiment using magpieInit

$("document").ready(function() {
    // prevent scrolling when space is pressed
    window.onkeydown = function(e) {
        if (e.keyCode === 32 && e.target === document.body) {
            e.preventDefault();
        }
    };

    // calls magpieInit
    // in debug mode this returns the magpie-object, which you can access in the console of your browser
    // e.g. >> window.magpie_monitor or window.magpie_monitor.findNextView()
    // in all other modes null will be returned
    window.magpie_monitor = magpieInit({
        // You have to specify all views you want to use in this experiment and the order of them
        views_seq: [
            intro,
            participantInfo,
            consentForm,
            attentionChecks,
            instructions,
            instructionsPracticeTrial,
            practiceSlider_rating,
            uebungsende,
            instructionsRatingScale,
            slider_rating,
            instructionsPostTest,
            post_test,
            thanks
            ],
        // Here, you can specify all information for the deployment
        deploy: {
            experimentID: "1",
            serverAppURL: "https://134.2.103.83/api/submit_experiment/",
            // Possible deployment methods are:
            // "debug" and "directLink"
            // As well as "MTurk", "MTurkSandbox" and "Prolific"
            deployMethod: "directLink",
            contact_email: "nadine.balbach@uni-tuebingen.de",
            prolificURL: ""
        },
        // Here, you can specify how the progress bar should look like
        progress_bar: {
            in: [
                // list the view-names of the views for which you want a progress bar
                "practice_trial",
                "slider_rating",
                "instructions_post_test",
            ],
             // Possible styles are "default", "separate" and "chunks"
            style: "separate",
            width: 100
        }
    });
});
