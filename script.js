"use strict"

const fadingTemps=250;

var data = `[
    { 
        "question":"À quoi sert un aria-label?",
        "réponses":[
            "Ajouter du contenu textuel sur une balise pour aider les lecteurs d'écran",
            "À rien", 
            "Je ne sais pas"
        ], 
        "réponse":0
    },
    { 
        "question":"HTML vient de :",
        "réponses":[
            "Hyper Typo Meta Lol",
            "Hypertext markup language", 
            "Je ne sais pas"
        ], 
        "réponse":1
    },
    { 
        "question":"Qui est le meilleur falcon du Québec",
        "réponses":[
            "Alex",
            "Hubert", 
            "Tony"
        ], 
        "réponse":2
    }
]`;

$(document).ready(function () {
    // create data table
    $('#myTable').DataTable();

    $('#progress').hide();
    $('#myData').hide();

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
            date_form: {
                required: true,
            },
            occupation_form: {
                required: true,
            }
        },
        submitHandler: function (form) { // for demo

            $("#resultatsNom").html($("#nom").val())
            $("#resultatsPrenom").html($("#prenom").val())
            $("#resultatsDate").html($("#date").val())
            $("#resultatsOccupation").html($("#occupation").val())


            $('#myform').fadeOut(fadingTemps,function(){
                $('#progress').fadeIn(fadingTemps);
                $('#myData').fadeIn(fadingTemps);
            });
            
            return false; // for demo
        }
        
    });

    //Convert the data into JS arrays & objects
    let readyData = JSON.parse(data);

    // index de la question actuelle
    let question=0;

    // mélanger les questions
    readyData.sort(function(){
        return 0.5 - Math.random();
    });

    // la question actuelle
    let obj=readyData[question];

    // réponses de toutes les questions
    let reponses = [];
    let questionsCorrectes = 0;
    let questionsTotal = readyData.length;

    // progress bar
    let progress=0;

    // btn active
    let btnActive=true;

    // progress bar commence à 0
    $('#progress').css("width", progress+"%");

    // créer le template de l'interface des questions
    afficherQuestion(obj);

    // cliquer sur le bouton pour passer à la question suivante
    $("#btn").click(function(){
        if($('input[name="fav_language"]:checked').length>0 && btnActive){
            // récupérer la réponse de la question actuelle
            let reponse = parseInt($('input[name="fav_language"]:checked').val());

            if(obj.réponse == reponse){
                reponses.push({
                    reponse:obj.réponses[reponse],
                    status: true,
                });
                questionsCorrectes++;
            }else{
                reponses.push({
                    reponse: obj.réponses[reponse],
                    status: false,
                });
            }

            // Ajouter la question à la table de données
            let derniereReponse=reponses[reponses.length-1];
            $('#myTable').DataTable().row.add([question+1, obj.question, derniereReponse.status]).draw();

            // Ajouter la question à l'accordéon
            $("#accordion").append(`
                <h3>Question ${question+1} - ${obj.question} </h3>
                <div>
                    <ul>
                        <li>${obj.réponses[0]}</li>
                        <li>${obj.réponses[1]}</li>
                        <li>${obj.réponses[2]}</li>
                    </ul>
                </div>
            `);

            btnActive=false;

            if(question < readyData.length-1){
                question++;
                obj=readyData[question];
                
                $("#myData").fadeOut(fadingTemps,function(){
                    afficherQuestion(obj);
                    $("#myData").fadeIn(fadingTemps,function(){
                        btnActive=true;
                    });
                });
                
            }else{
                question++;
                
                // créer l'alerte
                let ratio=questionsCorrectes/questionsTotal;
                if(ratio>0.7){
                    $("#alert").addClass("alert-success");
                    $("#alert").html("Bravo vous êtes un champion du code !");
                }else if(ratio>=0.6){
                    $("#alert").addClass("alert-warning");
                    $("#alert").html("Vous êtes un peu moyen !");
                }else{
                    $("#alert").addClass("alert-danger");
                    $("#alert").html("Vous êtes un peu nul !");
                }

                // create accordion for questions
                $( "#accordion" ).show();
                $("#accordion").accordion({
                    collapsible: true,
                    active:false,
                });
                

                $('#myData').fadeOut(fadingTemps,function(){
                    $("#progress").delay(fadingTemps).fadeOut(fadingTemps,function(){
                        $("#resultats").fadeIn(fadingTemps);
                    })
                });
            }

            if(progress < 100){
                let ratio=question/readyData.length;
                progress = ratio*100;
            }
            
            $('#progress').css("width", progress+"%");
        }
    });

});


function afficherQuestion(obj){
    $('input[name="fav_language"]:checked').prop("checked", false);
    $("#titre").html(obj.question);
    $("#label0").html(obj.réponses[0]);
    $("#label1").html(obj.réponses[1]);
    $("#label2").html(obj.réponses[2]);
}
