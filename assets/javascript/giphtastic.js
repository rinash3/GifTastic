   //initial array of super heroes
                var superheroes = [
                    "Superman",
                    "Batman",
                    "The Flash",
                    "Iron Man",
                    "Halk Smash",
                    "Spider Man"
                ];

                function heroName() {
                    var heroName = $(this).attr("data-name");
                  
                }
                // Function for displaying  data
                function renderButtons() {

                    // Deleting buttons prior to adding new buttons (this is necessary otherwise we will
                    // have repeat buttons)
                    $("#buttons-view").empty();

                    // Looping through the array 
                    for (var i = 0; i < superheroes.length; i++) {

                        // Then dynamicaly generating buttons for each superhero in the array 
                       
                        var a = $("<button>");
                        // Adding a class of superHero to our button
                        a.addClass("superHero");
                        // Adding a data-attribute
                        a.attr("data-name", superheroes[i]);
                        // Providing the initial button text
                        a.text(superheroes[i]);
                        // Adding the button to the HTML
                        $("#buttons-view").append(a);
                    }
                }
             
                // Calling the renderButtons function to display the intial buttons
                renderButtons();
        


                $(document).on('click', 'button',  function() {
            // "this" keyword refers to the button that was clicked
            var name = $(this).data("name");

            // Constructing a URL to search Giphy for the name of the superhero
            var queryURL = "https:api.giphy.com/v1/gifs/search?q=" +
                name + "&api_key=3dwh2EP3xMJbXZDMq6x5DEVIJ5aE4l7z&limit=10";

         
            $.ajax({
                    url: queryURL,
                    method: "GET"
                })
                // After the data comes back from the API
                .then(function(response) {
                    // Storing an array of results in the results variable
                    var results = response.data;

                    // Looping over every result item
                    for (var i = 0; i < results.length; i++) {

                      
                        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                            // Creating a div for the gif
                            var gifDiv = $("<div>");

                            // Storing the result item's rating
                            var rating = results[i].rating;

                            // Creating a paragraph tag with the result item's rating
                            var p = $("<p>").text("Rating: " + rating);

                            // Creating an image tag
                            var superHeroImage = $("<img>");

                            // Giving the image tag  src attribute of a proprty pulled off the
                            // result item - getting the still images 
                            superHeroImage.attr("src", results[i].images.fixed_height_still.url);
                            superHeroImage.attr("data-still", results[i].images.fixed_height_still.url);
                            superHeroImage.attr("data-animate", results[i].images.fixed_height.url)
                            superHeroImage.attr("data-state", "still")
                            superHeroImage.addClass("gif");

                            // Appending the paragraph and superHeroImage we created to the "gifDiv" div 
                            gifDiv.append(p);
                            gifDiv.append(superHeroImage);

                            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                            $("#gifs-appear-here").prepend(gifDiv);
                        }
                    }
                });
            });

            //click event on the gif to switch between still and animate
            $("#gifs-appear-here").on("click", ".gif", function(event){
                //prevents submit
	event.preventDefault();
	// gets the current state of the clicked gif
    var state = $(this).attr("data-state");
    //on click we check what is the state of the image
    // if still we animate on click
    // if animated we pause on click
	if (state === "still") {
	$(this).attr("src", $(this).attr("data-animate"));
	$(this).attr("data-state", "animate");
	} else {
	$(this).attr("src", $(this).attr("data-still"));
	$(this).attr("data-state", "still");
	}
    }) 

    $("#add-hero").on("click", function(event){
	event.preventDefault();

	console.log("#add-hero");
	// sets the value of input to new added super hero
	var heroList = $("#hero-input").val().trim();
	// new added superhero is added to the array
    superheroes.push(heroList);
    console.log(superheroes);
    //clear input field
    $("#hero-input").val('');
	// call the function that creates the new button
	renderButtons();
});



renderButtons();
    