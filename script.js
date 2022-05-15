
"use strict"
$(document).ready(function () {
    $.validator.addMethod(
        "date",
        function(value, element) {
              var currentDate = new Date();
              var selectedDate = new Date(value);
              return (currentDate >= selectedDate);
        },
        "You cannot select a date greater than today."
    );

    $('#myform').validate({ // initialize the plugin
        rules: {
            nom_form: {
                required: true,
                minlength: 5
            },
            prenom_form: {
                required: true,
                minlength: 5
            },
            date_form : {
                required: true,
            }
        },
        submitHandler: function (form) { // for demo
            $('#myform').hide();
            $('#progress').show();
            $('.card').show();
            return false; // for demo
        }
        
    });
});
var tableQuestions =[
    {"question":"À quoi sert un aria-label?", "reponse1":"Ajouter du contenu textuel sur une balise pour aider les lecteurs d'écran","reponses2":"À rien","reponse3":"Je ne sais pas","réponse":0},
    {"question":"HTML vient de :", "reponse1":"Hyper Typo Meta Lol","reponses2":"Hypertext markup language","reponse3":"Je ne sais pas","réponse":0}
];
jQuery(document).ready(($) => {
            //Create variable to store the JSON 
            var data = `[
                { 
                    "id": 1,
                    "question":"À quoi sert un aria-label?",
                    "réponses":[
                        "Ajouter du contenu textuel sur une balise pour aider les lecteurs d'écran",
                        "À rien", 
                        "Je ne sais pas"
                    ], 
                    "réponse":0
                },
                { 
                    "id": 2,
                    "question":"HTML vient de :",
                    "réponses":[
                        "Hyper Typo Meta Lol",
                        "Hypertext markup language", 
                        "Je ne sais pas"
                    ], 
                    "réponse":1
                }
            ]`;
            //Convert the data into JS arrays & objects
            let readyData = JSON.parse(data);
            // Just for testing 
            console.log(readyData);
            //Use a loop function or for loop with append function inside it 
            let answers = '';
            // Genereates a number between 0 to 1;
            Math.random();

            // to gerate a randome rounded number between 1 to 10;
            const rndInt = Math.floor(Math.random() * 2) + 1;
            console.log(rndInt);
            readyData.map((obj) => {
                if(obj.id === rndInt){
                    $("#myData").append(`
                    <div class="card" id="${'card'+obj.id}" style="display: none;">
                        <h3>${obj.question}</h3>
                        <input class="radio_qst" type="radio" name="fav_language"><span>${obj.réponses[0]}</span>
                        <input class="radio_qst" type="radio" name="fav_language"><span>${obj.réponses[1]}</span>
                        <input class="radio_qst" type="radio" name="fav_language"><span>${obj.réponses[2]}</span>
                        <button class="btn btn-primary" id="${'btn'+obj.id}">Prochain</button>
                        ${answers}
                    <div>
                `);
                }
                
            });

        });

