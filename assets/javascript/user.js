//after page loads
$(document).ready(function(){

//1. Declare variables


var eventResults;
var eventName;
var eventCurrency;
var EventMinPrice;
var eventMaxPrice;
var eventDate;
var eventTime;
var eventImage;
var eventVenue;
var eventURL;
var eventCountry = "";
var countryCode = "";
var eventState = "";
var stateCode = "";
var eventCity="";
var searchURL="";
var keyWord = "";
var eventId;

 //grab fb data
 var database=firebase.database();
 database.ref("/countries/country_list").on("child_added",function(snapshot){


    var option= document.createElement("option")
    option.setAttribute("value",snapshot.val().code)
    option.setAttribute("class", "list")
    option.textContent=snapshot.val().name
    document.getElementById("eventCountry").append(option)

   });

//2. Search Event listeners

//get eventId

//Key Word search
$(".search-bar").on("click",function(){
    $("#eventDisplay").empty();
    keywordSearch();
    getEvents();
    $(".key-word").val("");
}); //end of key word search

//3. Functions

// Generate dynamic search URL
function captureSearch(){

        //retrieve eventId
        
     //Get search URL
 

    //  searchURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=GRovhZWESxeRpkyVqNiWvG5iDGeyFBTp&city=" + eventCity +"&countryCode=" + countryCode + "&stateCode=" + stateCode;

     searchURL = "https://app.ticketmaster.com/discovery/v2/events.json?&apikey=GRovhZWESxeRpkyVqNiWvG5iDGeyFBTp&id=" + eventId;

     console.log(searchURL);
    };

function keywordSearch(){
    event.preventDefault();
   
    console.log("you key word search!");
     
    //capture search values
 
     keywordSearch = $("#search-bar").val().trim().toLowerCase();
     console.log("Key word is: " + keywordSearch);

     searchURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=GRovhZWESxeRpkyVqNiWvG5iDGeyFBTp&keyWord=" + keywordSearch;



     
     console.log(searchURL);
    };

//3. Call Event API and display data

function getEvents(){
    $.ajax({
        type:"GET",

        url:searchURL,
        async:true,
        dataType: "json",
        success: function(json) {
        console.log(json._embedded.events);
        // Parse the response.
        // store the data from the AJAX request in the results variable
        eventResults = json._embedded.events;

        console.log(eventResults.length);
        var eventSummary = $("#summary-info");
        eventSummary.addClass("text-center");
        eventSummary.text("We found " + eventResults.length + " events");
        
        for(var i=0; i<eventResults.length; i++){

            if(Array.isArray(eventResults[i].priceRanges)){
                
                console.log("Explore " + eventResults.length + " events");
                console.log("EventID is " + eventResults[i].id);
                console.log("Event number is: " +i);
                console.log("Event name is :" + eventResults[i].name);//1
                console.log("Event image :" + eventResults[i].images[3].url);//2
                console.log("Event Currency  :" + eventResults[i].priceRanges[0].currency);//3
                console.log("Event Min Price :" + eventResults[i].priceRanges[0].min);//4
                console.log("Event Max Price :" + eventResults[i].priceRanges[0].max);//5
                console.log("Event Local Date :" + eventResults[i].dates.start.localDate);//6
                console.log("Event Local Time :" + eventResults[i].dates.start.localTime);//7
                console.log("Event Venue - City :" + eventResults[i]._embedded.venues[0].city.name);//8
                console.log("Event Venue - Country:" + eventResults[i]._embedded.venues[0].country.name);//9
                console.log("Buy Tickets " + eventResults[i].url);

                //assign event variables based on data
                eventId = eventResults[i].id;
                eventName = eventResults[i].name;
                eventImage = eventResults[i].images[0].url;
                eventCurrency = eventResults[i].priceRanges[0].currency;
                EventMinPrice = eventResults[i].priceRanges[0].min;
                eventMaxPrice = eventResults[i].priceRanges[0].max;
                eventDate = eventResults[i].dates.start.localDate;
                eventTime = eventResults[i].dates.start.localTime ;
                eventVenue = eventResults[i]._embedded.venues[0].city.name + " , " + eventResults[i]._embedded.venues[0].country.name;
                eventURL = eventResults[i].url;
                
                } //close if statement

                //display results on page.

                       
                // Ramon edit added the header for the card and the button to fav something
                var newEvent = $("<div>");
                newEvent.attr("id",eventResults[i].id)
                newEvent.addClass("card float-sm-left float-md-left float-lg-left");
                newEvent.css("width", "22rem");
                newEvent.css("height", "30rem");
                newEvent.css("margin-right", "10px");
                newEvent.css("margin-bottom", "10px");

                var newEventImage = $("<img>");
                newEventImage.attr("src", eventResults[i].images[0].url);
                newEventImage.addClass("card-img-top");

                var newEventcardbody = $("<div>");
                newEventcardbody.addClass("card-body");

                var newEventcardhead=$("<div>");
                newEventcardhead.addClass("card-head");
                        
                var neweventTitle = $("<h5>");
                neweventTitle.addClass("card-title");
                newEvent.css("font-size", "20px");
                neweventTitle.text(eventResults[i].name);

                var fav=$("<button>");
                fav.addClass("btn btn-primary favorite");
                fav.attr("event_id",eventResults[i].id)
                fav.text("fav")

                var neweventDetails = $("<p>");
                neweventDetails.addClass("card-text");
                neweventDetails.css("font-size", "16px");
                neweventDetails.text(eventVenue);
                  // Ramon edit added the attributes for the currency converter here and for the div that holds the cards in the button
                var newEventPrice = $("<p>");
                newEventPrice.addClass("card-text");
                newEventPrice.css("font-size", "16px");
                newEventPrice.addClass("price-range")
                newEventPrice.attr("data-min", EventMinPrice);
                newEventPrice.attr("data-max", eventMaxPrice);
                newEventPrice.text("Price range: " + EventMinPrice + " to " + eventMaxPrice + " " + eventCurrency);

                var newEventDate
                newEventDate = $("<p>");
                newEventDate.addClass("card-text");
                newEventDate.css("font-size", "16px");
                newEventDate.text(moment(eventDate).format('LL') + " , " + eventTime);
                

                var buyTickets = $("<a>");
                buyTickets.addClass("btn btn-primary buyBtn");
                buyTickets.attr("href", eventResults[i].url);
                buyTickets.text("Buy Tickets");



                //append to head
                newEventcardhead.append(neweventTitle)
                newEventcardhead.append(fav)
                //append event details to card body    
                        
                newEventcardbody.append(neweventDetails);
                newEventcardbody.append(newEventDate);
                newEventcardbody.append(newEventPrice);
                newEventcardbody.append(buyTickets);

                //append image and card body to card
                newEvent.append(newEventcardhead);
                newEvent.append(newEventImage);
                newEvent.append(newEventcardbody);
                        

                //append card to html

                $("#eventDisplay").append(newEvent);
                /// currency for convertion
                $("#eventDisplay").attr("data-currency", eventCurrency);
                //clear float

                var clearFloat = $("<div>");
                clearFloat.addClass("clearfix");

            }//close for loop

        },
        error: function(xhr, status, err) {
            // This time, we do not end up here!
         }
        }); //close AJAX call

    }// close function


}); //End of Document ready