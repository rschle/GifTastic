
//adding a new show button to the array when we type and submit
var shows = ["Stranger Things", "Orange is the New Black", "House of Cards", "Arrested Development", "Umbrella Academy", "Black Mirror", "Jessica Jones"]

function renderButtons(){

    $("#button-view").empty();

    for(var i = 0; i < shows.length; i++){
        var a = $("<button>");
        a.addClass("show");
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
})

renderButtons();


$("button").on("click", function(){
    var show = $(this).attr("data-name")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=o3PAEwYAONHFsq5wlEb3PuiE5qWGm4PP";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
    var results = response.data;


    for (var i = 0; i < results.length; i++){
        var showDiv = $("<div>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
    
        var showImage = $("<img>");
        showImage.attr("src", results[i].images.fixed_height.url);
    
        showDiv.append(p);
        showDiv.append(showImage);
    
        $("#gifs-appear-here").prepend(showDiv);
    }
});




})

