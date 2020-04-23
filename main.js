$( document ).ready(function() {
    console.log( "1,2,3 ciack!" );

    /* FUNZIONI ============================================*/

    // 1. centralizzazione stampa risultati chiamata ajax (PER AZIONE 1 e 2) -----
    function displaySearchedMovieAndTvSeries(){
      var textInserito = $('#search-input').val();

      $.ajax({
        url: 'https://api.themoviedb.org/3/search/multi?',
        method: 'GET',
        data:{
          'api_key': '2bc1f8fafceba215b365b7a528d7e216',
          'language' : 'it-IT',
          'query' : textInserito
        },
        success: function(data,stato){
          //istruzione condizionale per stabilire se la ricerca ha dato risultati
          if (data.results.length === 0) { //le sa ricerca non ha dato risultati perchè la lunghezza dell'ogetto 'results' è pari a 0
              $('.main-container').append("Siamo spiacenti ma la ricerca non ha fornito risultati. <br> Controlla eventuali errori di battitura o prova con un'altra parola<br>");
          } else {
            $.each(data.results, //in ogni proprietà dell'oggetto 'results', dell'oggetto 'data' [alternativa a ciclo for]
              function(i, movieFound){ //ì= itteratore, movieFound = data.results

                // variabili
                /* ----- differenzia var movie da var tv ------*/
                if (movieFound.media_type == 'movie') {
                  var title = movieFound.title; //chiave title dell'oggetto movieFound
                  var originalTitle = movieFound.original_title;
                  var type = 'Film';
                } else if(movieFound.media_type == 'tv'){
                  var title = movieFound.name;
                  var originalTitle = movieFound.original_name;
                  var type = 'Serie TV';
                }
                var language = movieFound.original_language;
                var score = movieFound.vote_average;
                var copertina = 'https://image.tmdb.org/t/p/w185'+ movieFound.poster_path;

                /* ---- assegnazione stelline ---- */
                var score1to5 = Math.round(score / 2); // arrotondamento voto

                var stars = []; //array stelline
                // assegna tante stelline piene per quanto è il voto score1to5...
                for (var i = 0; i < score1to5 ; i++) {
                  var fullStar = '<i class="fas fa-star "></i>';
                  stars.push(fullStar);
                }
                // ...la differenze tra 5 e score1to5 riempila di stelline vuote
                for (var i = 0; i < 5-score1to5 ; i++) {
                  var empyStar = '<i class="far fa-star"></i>';
                  stars.push(empyStar);
                }

                /* ---- assegnazione bandiere a lingua ---- */
                var flags = {
                  'it': 'img/it.png',
                  'en': 'img/uk.png',
                  'es': 'img/spain.png',
                  'pt': 'img/portugal.png',
                  'fr': 'img/france.png'
                };
                for (var key in flags) { //scorri nell'oggetto...
                  if ([key] == language) { // ...se trovi una chiave dell'ogetto uguale alla lingua...
                   var langInFlag = flags[key]; //...allora prendi il valore della chiave e inseriscila nella chiave 'lingua' di handlebars...
                 }
               }
                if (langInFlag == undefined) { // ...se non hai trovato una chiave uguale alla lingua ...
                  langInFlag = 'img/unknown-flag.png'; // ...allora assegna una bandiere 'lingua non specificata'
                }

                /* ---- handlebars ---- */
                var source = $("#template-movie-handlebars").html();
                var template = Handlebars.compile(source);

                var context = {
                  'copertina': copertina,
                  'titolo': title,
                  'titolo_originale': originalTitle,
                  'lingua': langInFlag,
                  'voto' : stars[0]+stars[1]+stars[2]+stars[3]+stars[4],
                  'tipo': type
                };
                var html = template(context);
                $('.main-container').append(html);
                /* ---- /handlebars ---- */

                /* ---- azzera input ricerca ---- */
                $('#search-input').val('');
            }); //fine each

          } //fine else

        }, // fine success

        error: function(richiesta,stato,error){
          console.log('Risultato in caso di errore richiesta: ' + richiesta);
          //---Errore 1. Clck o invio con input vuoto
          if (richiesta.status === 422) {
            $('.main-container').append('Non è stato inserito nessun parametro nella ricerca');
          }


        }, //fine error

      }); // fine ajax

    } //fine displaySearchedMovie

    // 2. Resetta main prima di ogni inserimento ricerca (PER AZIONE 1 e 2)-----------
    function clearHTMLfromResults(){
      $('.main-container').html('');
    } //clearHTMLfromResults



    /* AZIONI ============================================*/

    // 1. Click sul cerca ---------------
    $('#search-button').click(
      function(){
        clearHTMLfromResults();
        displaySearchedMovieAndTvSeries();
      }

    );

    // 2. Invio sul cerca ---------------
    $("#search-input").keypress(
        function() {
          if (event.keyCode === 13) { //il 13 corrisponde al tasto Enter
            clearHTMLfromResults();
            displaySearchedMovieAndTvSeries();
          }
    });

    // 3. Hover su copertina ---------------
    $('.main-container').on('mouseenter', '.search-result-container',
      function(){
        $('.copertina', this).fadeOut();
      });
    $('.main-container').on('mouseleave', '.search-result-container',
      function(){
        $('.copertina', this).fadeIn();
      });





}); //fine doc ready

/*
Size options
"backdrop_sizes": [
  "w300",
  "w780",
  "w1280",
  "original"
],
"logo_sizes": [
  "w45",
  "w92",
  "w154",
  "w185",
  "w300",
  "w500",
  "original"
],
"poster_sizes": [
  "w92",
  "w154",
  "w185",
  "w342",
  "w500",
  "w780",
  "original"
],
"profile_sizes": [
  "w45",
  "w185",
  "h632",
  "original"
],
"still_sizes": [
  "w92",
  "w185",
  "w300",
  "original"
]*/
