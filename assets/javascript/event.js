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
var ticketmasterCountries = [
    {"code":"US","name":"united states of america"},		
    {"code":"AD","name":"andorra"},		
    {"code":"AI","name":"anguilla"},		
    {"code":"AR","name":"argentina"},		
    {"code":"AU","name":"australia"},		
    {"code":"AT","name":"austria"},		
    {"code":"AZ","name":"azerbaijan"},		
    {"code":"BS","name":"bahamas"},		
    {"code":"BH","name":"bahrain"},		
    {"code":"BB","name":"barbados"},		
    {"code":"BE","name":"belgium"},		
    {"code":"BM","name":"bermuda"},		
    {"code":"BR","name":"brazil"},		
    {"code":"BG","name":"bulgaria"},		
    {"code":"CA","name":"Canada"},		
    {"code":"CL","name":"Chile"},		
    {"code":"CN","name":"China"},		
    {"code":"CO","name":"Colombia"},		
    {"code":"CR","name":"Costa rica"},		
    {"code":"HR","name":"Croatia"},		
    {"code":"CY","name":"Cyprus"},		
    {"code":"CZ","name":"Czech republic"},		
    {"code":"DK","name":"denmark"},		
    {"code":"DO","name":"dominican republic"},		
    {"code":"EC","name":"ecuador"},		
    {"code":"EE","name":"estonia"},		
    {"code":"FO","name":"faroe islands"},		
    {"code":"FI","name":"finland"},		
    {"code":"FR","name":"france"},		
    {"code":"GE","name":"georgia"},		
    {"code":"DE","name":"germany"},		
    {"code":"GH","name":"ghana"},		
    {"code":"GI","name":"gibraltar"},		
    {"code":"GB","name":"great britain"},		
    {"code":"GR","name":"greece"},		
    {"code":"HK","name":"hong kong"},		
    {"code":"HU","name":"hungary"},		
    {"code":"IS","name":"iceland"},		
    {"code":"IN","name":"india"},		
    {"code":"IE","name":"ireland"},		
    {"code":"IL","name":"israel"},		
    {"code":"IT","name":"italy"},		
    {"code":"JM","name":"jamaica"},		
    {"code":"JP","name":"japan"},		
    {"code":"KR","name":"korea"},
    {"code":"LV","name":"latvia"},		
    {"code":"LB","name":"lebanon"},		
    {"code":"LT","name":"lithuania"},		
    {"code":"LU","name":"luxembourg"},		
    {"code":"MY","name":"malaysia"},		
    {"code":"MT","name":"malta"},		
    {"code":"MX","name":"mexico"},		
    {"code":"MC","name":"monaco"},		
    {"code":"ME","name":"montenegro"},		
    {"code":"MA","name":"morocco"},		
    {"code":"NL","name":"netherlands"},		
    {"code":"AN","name":"netherlands antilles"},		
    {"code":"NZ","name":"new zealand"},		
    {"code":"ND","name":"northern ireland"},		
    {"code":"NO","name":"norway"},		
    {"code":"PE","name":"peru"},		
    {"code":"PL","name":"poland"},		
    {"code":"PT","name":"portugal"},		
    {"code":"RO","name":"romania"},		
    {"code":"RU","name":"russian federation"},		
    {"code":"LC","name":"saint lucia"},		
    {"code":"SA","name":"saudi arabia"},		
    {"code":"RS","name":"serbia"},		
    {"code":"SG","name":"singapore"},		
    {"code":"SK","name":"slovakia"},		
    {"code":"SI","name":"slovenia"},		
    {"code":"ZA","name":"south africa"},		
    {"code":"ES","name":"spain"},		
    {"code":"SE","name":"sweden"},		
    {"code":"CH","name":"switzerland"},		
    {"code":"TW","name":"taiwan"},		
    {"code":"TH","name":"thailand"},		
    {"code":"TT","name":"trinidad and tobago"},		
    {"code":"TR","name":"turkey"},		
    {"code":"UA","name":"ukraine"},		
    {"code":"AE","name":"united arab emirates"},		
    {"code":"UY","name":"uruguay"},		
    {"code":"VE","name":"venezuela"},		
]



 //grab fb data
 var database=firebase.database();
 database.ref("/countries/country_list").on("child_added",function(snapshot){


    var option= document.createElement("option")
    option.setAttribute("value",snapshot.val().code)
    option.setAttribute("class", "list")
    option.textContent=snapshot.val().name
    document.getElementById("eventCountry").append(option)

   }) 
//2. Search Event listeners

$("#eventSearch").on("click",function(){
    $("#eventDisplay").empty();
    captureSearch();
    getEvents();
    $("#country").val("");
    $("#state").val("");
    $("#city").val("");

}); //end of event search by country, state, city

$("#search-bar").on("click",function(){
    $("#eventDisplay").empty();
    keywordSearch();
    getEvents();
    $("#key-word").val("");
}); //end of key word search

//3. Functions

// Generate dynamic search URL
function captureSearch(){
    event.preventDefault();
   
    console.log("you clicked event search!");
     
    //capture search values
 
     eventCountry = $("#country").val().trim().toLowerCase();
     console.log("Event Country is: " + eventCountry);
 
     var code = document.getElementById("country").value;
     console.log("Code is"+ code);
 
     eventState = $("#state").val().trim().toLowerCase();
     console.log(eventState);
 
     eventCity = $("#city").val().trim().toLowerCase();
     console.log(eventCity);
 
     //Get search URL
     
     /* //Examples 
     Get a list of all events in the United States https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=GRovhZWESxeRpkyVqNiWvG5iDGeyFBTp

    Search for events sourced by Universe in the United States with keyword “devjam” https://app.ticketmaster.com/discovery/v2/events.json?keyword=devjam&source=universe&countryCode=US&apikey=GRovhZWESxeRpkyVqNiWvG5iDGeyFBTp

    Search for music events in the Los Angeles area https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=324&apikey=GRovhZWESxeRpkyVqNiWvG5iDGeyFBTp

    Get a list of all events for Adele in Canada https://app.ticketmaster.com/discovery/v2/events.json?attractionId=K8vZ917Gku7&countryCode=CA&apikey=GRovhZWESxeRpkyVqNiWvG5iDGeyFBTp */

     searchURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=GRovhZWESxeRpkyVqNiWvG5iDGeyFBTp&city=" + eventCity +"&countryCode=" + countryCode + "&stateCode=" + stateCode;

     console.log(searchURL);
    };

function keywordSearch(){
    event.preventDefault();
   
    console.log("you key word search!");
     
    //capture search values
 
     keywordSearch = $("#country").val().trim().toLowerCase();
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

        
        for(var i=0; i<eventResults.length; i++){

            if(Array.isArray(eventResults[i].priceRanges)){
                
                console.log("Explore " + eventResults.length + " events");
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






/*
 /*   //firebase config
    var config = {
        apiKey: "AIzaSyAm2DX2UmnZ1-IG1fWL4lFJWPvx2eXV5PU",
        authDomain: "rps-game-ce388.firebaseapp.com",
        databaseURL: "https://rps-game-ce388.firebaseio.com",
        projectId: "rps-game-ce388",
        storageBucket: "rps-game-ce388.appspot.com",
        messagingSenderId: "138684371598"
      };
      firebase.initializeApp(config);

   

   
 
  
      
  /*  // searchURL = "//https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=GRovhZWESxeRpkyVqNiWvG5iDGeyFBTp&city=" + eventCity + "&" + countryCode ""=&stateCode="

       searchURL = "//https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=GRovhZWESxeRpkyVqNiWvG5iDGeyFBTp&city=" + eventCity

       console.log(searchURL);

$("#eventSearch").on("click", function(){

  event.preventDefault();
   
   console.log("you clicked me!");
    
   //capture search values

    eventCountry = $("#country").val().trim().toLowerCase();
    console.log(eventCountry);

    var code = document.getElementById("country").value;
    console.log("Code is"+ code);

    eventState = $("#state").val().trim().toLowerCase();
    console.log(eventState);

    eventCity = $("#city").val().trim().toLowerCase();
    console.log(eventCity);

    

    //Ticketmaster API
 $.ajax({
        type:"GET",

        url:searchURL,
        //url:"https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=GRovhZWESxeRpkyVqNiWvG5iDGeyFBTp",
        //url: "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=324&apikey=GRovhZWESxeRpkyVqNiWvG5iDGeyFBTp",
        async:true,
        dataType: "json",
        success: function(json) {
                    console.log(json._embedded.events);
                    // Parse the response.
                    // Do other things.
        // store the data from the AJAX request in the results variable
                    eventResults = json._embedded.events;

                    for(var i=0; i<eventResults.length; i++){

                        if(Array.isArray(eventResults[i].priceRanges)){
                          
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
                        eventName = eventResults[i].name;
                        eventImage = eventResults[i].images[0].url;
                        eventCurrency = eventResults[i].priceRanges[0].currency;
                        EventMinPrice = eventResults[i].priceRanges[0].min;
                        eventMaxPrice = eventResults[i].priceRanges[0].max;
                        eventDate = eventResults[i].dates.start.localDate;
                        eventTime = eventResults[i].dates.start.localTime ;
                        eventVenue = eventResults[i]._embedded.venues[0].city.name + " , " + eventResults[i]._embedded.venues[0].country.name;
                        eventURL = eventResults[i].url;
                        }

                        //display results on page.

                        var newEvent = $("<div>");
                        newEvent.addClass("card float-sm-left float-md-left float-lg-left");
                        newEvent.css("width", "18rem");

                        var newEventImage = $("<img>");
                        newEventImage.attr("src", eventResults[i].images[0].url);
                        newEventImage.addClass("card-img-top");

                        var newEventcardbody = $("<div>");
                        newEventcardbody.addClass("card-body");
                        newEventcardbody.attr("data-min", EventMinPrice);
                        newEventcardbody.attr("data-max", eventMaxPrice);

                        
                        var neweventTitle = $("<h5>");
                        neweventTitle.addClass("card-title");
                        neweventTitle.text(eventResults[i].name);

                        var neweventDetails = $("<p>");
                        neweventDetails.addClass("card-text");
                        neweventDetails.text(eventVenue);

                        var newEventPrice = $("<p>");
                        newEventPrice.addClass("card-text");
                        newEventPrice.text("Price range: " + EventMinPrice + " to " + eventMaxPrice + " " + eventCurrency);

                        var newEventDate
                        newEventDate = $("<p>");
                        newEventDate.addClass("card-body");
                        newEventDate.text(eventDate + " , " + eventTime);
    

                        var buyTickets = $("<a>");
                        buyTickets.addClass("btn btn-primary");
                        buyTickets.attr("href", eventResults[i].url);
                        buyTickets.text("Buy Tickets");

                        //append event details to card body    
                        
                        newEventcardbody.append(newEventPrice);
                        newEventcardbody.append(newEventDate);
                        newEventcardbody.append(neweventDetails);
                        newEventcardbody.append(buyTickets);

                        //append image and card body to card
                        newEvent.append(neweventTitle);
                        newEvent.append(newEventImage);
                        newEvent.append(newEventcardbody);
                        

                        //append card to html

                        $("#eventDisplay").append(newEvent);

                        //clear float

                        var clearFloat = $("<div>");
                        clearFloat.addClass("clearfix");

                    }

                    $("#eventDisplay").attr("data-currency", eventCurrency);



                    

                 },
        error: function(xhr, status, err) {
                    // This time, we do not end up here!
                 }

                  
    

      });

//       $('.flexdatalist').flexdatalist({
//         minLength: 1,
//         valueProperty:"value"
//    });
 

});

});*/