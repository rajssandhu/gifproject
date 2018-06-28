$(document).ready(function() {

	var topics = ["The Hulk", "Iron Man", "Captain America", "Black Panther", "Spider Man", "Gurdians of the Galaxy", "Doctor Strange", "Thor"];	
  
	function renderButtons(){
	  $('#buttons-view').empty();
  
	  for (var i = 0; i < topics.length; i++) {
	
			  var a = $('<button>');
			  a.addClass('marvel');
			  a.attr('data-name', topics[i]);
			  a.text(topics[i]);
			  $('#buttons-view').append(a);
			}
		  }    
		  renderButtons();
  
  $(document).on('click', '.marvel', function() {
  
	  var avengers = $(this).html(); 
  
	  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + avengers + "&api_key=41AxY3ZDG4YsLeocFDNHPk4yGBpGGf32&limit=10";
  
	  $.ajax({
		url: queryURL,
		method: "GET"
	  }).done(function(response) {
  
		var results = response.data;
		  
		  $('#movies-view').empty();
		  for ( var j=0; j < results.length; j++) {
					  var imageDiv = $('<div>');
					  var imageView = results[j].images.fixed_height.url;
					  var still = results[j].images.fixed_height_still.url; 
  
		  var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
					  gifImage.attr('data-state', 'still');
					  $('#movies-view').prepend(gifImage);
					  gifImage.on('click', playGif);
  
		  var rating = results[j].rating;

		  var displayRated= $('<p>').text("Rating: " + rating);
		  $('#movies-view').prepend(displayRated);
	} 
  
  }); 
  
		  function playGif() { 
					  var state = $(this).attr('data-state');
					  
				   if (state == 'still'){
					   $(this).attr('src', $(this).data('animate'));
						$(this).attr('data-state', 'animate');
				   } else{
					   $(this).attr('src', $(this).data('still'));
					   $(this).attr('data-state', 'still');
					  }
  
				  } 
  
		}); 
  
		  $(document).on('click', '#add-movie', function(){
			  if ($('#movie-input').val().trim() == ''){
				alert('Please Add Something!?!?!');
			 }
			 else {
			  var movies = $('#movie-input').val().trim();
			  topics.push(movies);
			  $('#movie-input').val('');
			  renderButtons();
			  return false;
  
			  }
  
		  });
						 
		  });
  