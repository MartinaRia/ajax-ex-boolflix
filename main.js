$( document ).ready(function() {
    console.log( "1,2,3 ciack!" );

    /* FUNZIONI ============================================*/

    // 1. Click sul cerca (per azione 1 e 2)---------------
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

          });
        }, // fine success

        error: function(richiesta,stato,error){
          $('.main-container').append('Ops! si è verificato un errore')
        }, //fine error

      }); // fine ajax

    } //fine click


    /* AZIONI ============================================*/

    // 1. Click sul cerca ---------------
    $('#search-button').click(
      displaySearchedMovie
    );

    // 2. Invio sul cerca ---------------
    $("#search-input").keypress(
      function() {
        if (event.keyCode === 13) { //il 13 corrisponde al tasto Enter
          displaySearchedMovie();
        }
    });



});
