
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
$(document).ready(function(){


$("#eventSearch").on("click", function(){

    event.preventDefault();
   
   console.log("you clicked me!");
    //capture search values

    //Generate URL
    //https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=GRovhZWESxeRpkyVqNiWvG5iDGeyFBTp&city=Toronto&countryCode=&stateCode=

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
});
