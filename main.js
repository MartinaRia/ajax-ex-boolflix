$( document ).ready(function() {
    console.log( "1,2,3 ciack!" );

    /* FUNZIONI ============================================*/

    // 1. Cerca e inserisci risultati nel main (per azione 1 e 2)---------------
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
          $.each(data.results,
            function(i, movieFound){
              // variabili
              var title = movieFound.title;
              var originalTitle = movieFound.original_title;
              var language = movieFound.original_language;
              var score = movieFound.vote_average;

              /* ---- handlebars ---- */
              var source = $("#template-movie-handlebars").html();
              var template = Handlebars.compile(source);

              var context = {
                'titolo': title,
                'titolo_originale': originalTitle,
                'lingua': language,
                'voto' : score
              };
              var html = template(context);
              $('.main-container').append(html);
              /* ---- /handlebars ---- */

              //azzera input ricerca
              $('#search-input').val('');

          });
        }, // fine success

        error: function(richiesta,stato,error){
          console.log(richiesta);
          //---Errore 1. Clck o invio con input vuoto
          if (richiesta.status === 422) {
            $('.main-container').append('Non è stato inserito nessun parametro nella ricerca');
          }


        }, //fine error

      }); // fine ajax

    } //fine displaySearchedMovie

    // 2. Resetta main prima di ogni inserimento ricerca (per azione 1 e 2)-----------
    function clearHTMLfromResults(){
      $('.main-container').html('')
    } //clearHTMLfromResults

    /* AZIONI ============================================*/

    // 1. Click sul cerca ---------------
    $('#search-button').click(
      function(){
        clearHTMLfromResults();
        displaySearchedMovie();
      }

    );

    // 2. Invio sul cerca ---------------
    $("#search-input").keypress(
        function() {
          if (event.keyCode === 13) { //il 13 corrisponde al tasto Enter
            clearHTMLfromResults();
            displaySearchedMovie();
          }
    });



});
