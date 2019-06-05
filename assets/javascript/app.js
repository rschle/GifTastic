
//adding a new show button to the array when we type and submit
var shows = ["Stranger Things", "Orange is the New Black", "House of Cards", "Arrested Development", "Umbrella Academy", "Black Mirror", "Jessica Jones"]


$(document).ready(function(){
    renderButtons();
    
    function renderButtons(){
        
        $("#button-view").empty();
    
        for(var i = 0; i < shows.length; i++){
            var a = $("<button>");
            a.addClass("show-btn");
            a.attr("data-name", shows[i]);
            a.text(shows[i]);
            $("#button-view").append(a);
        }
    }
    
    $("#add-show").on("click", function(event){
        event.preventDefault();
    
        var show = $("#netflixInput").val().trim();
        shows.push(show);
    
        renderButtons();
    });
    
    $(document).on("click", ".show-btn", displayShowInfo);

function displayShowInfo(){
    var show = $(this).attr("data-name")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=o3PAEwYAONHFsq5wlEb3PuiE5qWGm4PP";
    
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
    $("#gifs-appear-here").html("");
    console.log(response);
    



    for (var i = 0; i < response.data.length; i++){
       
    
        var showImage = $("<img>");
        showImage.attr("src", response.data[i].images.fixed_height.url);
        showImage.attr("data-animate", response.data[i].images.fixed_height.url);
        showImage.attr("data-still", response.data[i].images.fixed_height_still.url);
        showImage.addClass("gif")
        showImage.attr("data-state", "still")
        
        

        var rating = response.data[i].rating;
        var p = $("<p>").text("Rating: " + rating);

        // showDiv.html(p);
        var pDiv = $("<div class='ratingDiv'>")
        pDiv.text("Rating: " + response.data[i].rating.toUpperCase());
        //showDiv.html(showImage);
        var allDiv = $("<div class='allDiv'>")
        allDiv.append(pDiv);
        allDiv.append(showImage);
        $("#gifs-appear-here").prepend(allDiv);


       

    
       
        }

    
     });
    }


    $("#gifs-appear-here").on("click", ".gif", function(){
        var state = $(this).attr("data-state");
        var animate = $(this).attr("data-animate");
        var still = $(this).attr("data-still")
        console.log(still);
    //     console.log(state);
    console.log(state);
    //setting conditional statements so we know when the gif is paused/animated etc.
        if(state === "animate"){
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
            
        }else if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
    
    });

})


















