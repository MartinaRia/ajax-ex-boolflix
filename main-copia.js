$( document ).ready(function() {
    console.log( "1,2,3 ciack!" );

    /* FUNZIONI ============================================*/

    // 1. Cerca e inserisci risultati film nel main (PER AZIONE 1 e 2)---------------
    function displaySearchedMovie(){
      var textInserito = $('#search-input').val();

      $.ajax({
        url: 'https://api.themoviedb.org/3/search/movie?',
        method: 'GET',
        data:{
          'api_key': '2bc1f8fafceba215b365b7a528d7e216',
          'language' : 'it-IT',
          'query' : textInserito
        },
        success: function(data,stato){
          //istruzione condizionale per stabilire se la ricerca ha dato risultati
          if (data.results.length === 0) { //le sa ricerca non ha dato risultati perchè la lunghezza dell'ogetto 'results' è pari a 0
              $('.main-container').append("Siamo spiacenti ma la ricerca non ha fornito risultati nella categoria Film. <br> Controlla eventuali errori di battitura o prova con un'altra parola<br>");
          } else {
            $.each(data.results, //in ogni proprietà dell'oggetto 'results', dell'oggetto 'data' [alternativa a ciclo for]
              function(i, movieFound){ //ì= itteratore, movieFound = data.results
                // variabili
                var title = movieFound.title; //chiave title dell'oggetto movieFound
                var originalTitle = movieFound.original_title;
                var language = movieFound.original_language;
                var score = movieFound.vote_average;

                /* ---- assegnazione stelline ---- */
                var score1to5 = Math.round(score / 2); // arrotondamento voto

                var stars = [] //array stelline
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
                }
                for (var key in flags) { //scorri nell'oggetto...
                  if ([key] == language) { // ...se trovi una chiave dell'ogetto uguale alla lingua...
                   var langInFlag = flags[key]; //...allora prendi il valore della chiave e inseriscila nella chiave 'lingua' di handlebars...
                 }
               };
                if (langInFlag == undefined) { // ...se non hai trovato una chiave uguale alla lingua ...
                  langInFlag = 'img/unknown-flag.png' // ...allora assegna una bandiere 'lingua non specificata'
                };

                /* ---- handlebars ---- */
                var source = $("#template-movie-handlebars").html();
                var template = Handlebars.compile(source);

                var context = {
                  'titolo': title,
                  'titolo_originale': originalTitle,
                  'lingua': langInFlag,
                  'voto' : stars[0]+stars[1]+stars[2]+stars[3]+stars[4],
                  'tipo': 'Film'
                };
                var html = template(context);
                $('.main-container').append(html);
                /* ---- /handlebars ---- */

                //azzera input ricerca
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
      $('.main-container').html('')
    } //clearHTMLfromResults

    // 3. Cerca e inserisci risultati serie tv nel main (PER AZIONE 1 e 2)---------------
    function displaySearchedTvSeries(){
      var textInserito = $('#search-input').val();

      $.ajax({
        url: 'https://api.themoviedb.org/3/search/tv?',
        method: 'GET',
        data:{
          'api_key': '2bc1f8fafceba215b365b7a528d7e216',
          'language' : 'it-IT',
          'query' : textInserito
        },
        success: function(data,stato){
          //istruzione condizionale per stabilire se la ricerca ha dato risultati
          if (data.results.length === 0) { //le sa ricerca non ha dato risultati perchè la lunghezza dell'ogetto 'results' è pari a 0
              $('.main-container').append("Siamo spiacenti ma la ricerca non ha fornito risultati nella categoria Serie TV. <br> Controlla eventuali errori di battitura o prova con un'altra parola<br>");
          } else {
            $.each(data.results, //in ogni proprietà dell'oggetto 'results', dell'oggetto 'data' [alternativa a ciclo for]
              function(i, movieFound){ //ì= itteratore, movieFound = data.results
                // variabili
                var title = movieFound.name; //chiave title dell'oggetto movieFound
                var originalTitle = movieFound.original_name;
                var language = movieFound.original_language;
                var score = movieFound.vote_average;

                /* ---- assegnazione stelline ---- */
                var score1to5 = Math.round(score / 2); // arrotondamento voto

                var stars = [] //array stelline
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
                }
                for (var key in flags) { //scorri nell'oggetto...
                  if ([key] == language) { // ...se trovi una chiave dell'ogetto uguale alla lingua...
                   var langInFlag = flags[key]; //...allora prendi il valore della chiave e inseriscila nella chiave 'lingua' di handlebars...
                 }
               };
                if (langInFlag == undefined) { // ...se non hai trovato una chiave uguale alla lingua ...
                  langInFlag = 'img/unknown-flag.png' // ...allora assegna una bandiere 'lingua non specificata'
                }

                /* ---- handlebars ---- */
                var source = $("#template-movie-handlebars").html();
                var template = Handlebars.compile(source);

                var context = {
                  'titolo': title,
                  'titolo_originale': originalTitle,
                  'lingua': langInFlag,
                  'voto' : stars[0]+stars[1]+stars[2]+stars[3]+stars[4],
                  'tipo': 'Serie TV'
                };
                var html = template(context);
                $('.main-container').append(html);
                /* ---- /handlebars ---- */

                //azzera input ricerca
                $('#search-input').val('');
            }); //fine each

          } //fine else

        }, // fine success

        error: function(richiesta,stato,error){
          console.log('Risultato in caso di errore richiesta: ' + richiesta);
        }, //fine error

      }); // fine ajax

    } //fine displaySearchedTvSeries

    // 4. Trasformazione voto in stelline (PER FUNZIONI 1 e 3)---------------
    // function rounding(){
    //
    // }



    /* AZIONI ============================================*/

    // 1. Click sul cerca ---------------
    $('#search-button').click(
      function(){
        clearHTMLfromResults();
        displaySearchedMovie();
        displaySearchedTvSeries();
      }

    );

    // 2. Invio sul cerca ---------------
    $("#search-input").keypress(
        function() {
          if (event.keyCode === 13) { //il 13 corrisponde al tasto Enter
            clearHTMLfromResults();
            displaySearchedMovie();
            displaySearchedTvSeries();
          }
    });


    var num = 2
    var stars = []
    for (var i = 0; i < num; i++) {
      var fullStar = '<i class="fas fa-star"></i>';
      stars.push(fullStar);
    }
    for (var i = 0; i < 5-num; i++) {
      var fullStar = '<i class="far fa-star"></i>';
      stars.push(fullStar);
    }

    // $('.prova').append(stars)
    // console.log($('.prova').html());


    // $('.tablecontainer').html(stars);







}); //fine doc ready