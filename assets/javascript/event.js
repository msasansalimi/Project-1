
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


$("#eventSearch").on("click", function(){

    event.preventDefault();
   
   console.log("you clicked me!");
    //capture search values

    //Ticketmaster API
    $.ajax({
        type:"GET",
        //url:"https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=GRovhZWESxeRpkyVqNiWvG5iDGeyFBTp",
        url: "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=324&apikey=GRovhZWESxeRpkyVqNiWvG5iDGeyFBTp",
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
                        console.log("Event image :" + eventResults[i].images[0].url);//2
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

                        // <div class="card" style="width: 18rem;">
                        //     <img src="..." class="card-img-top" alt="...">
                        // <div class="card-body">
                        //     <h5 class="card-title">Card title</h5>
                        //     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        //     <a href="#" class="btn btn-primary">Go somewhere</a>
                        //     </div>
                        // </div>
                    }

                    $("#eventDisplay").attr("data-currency", eventCurrency);



                    

                 },
        error: function(xhr, status, err) {
                    // This time, we do not end up here!
                 }

                    
    

      });


});

