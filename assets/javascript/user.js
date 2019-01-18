//after page loads
$(document).ready(function () {

    //initialize firebase
    var config = {
        apiKey: "AIzaSyAm2DX2UmnZ1-IG1fWL4lFJWPvx2eXV5PU",
        authDomain: "rps-game-ce388.firebaseapp.com",
        databaseURL: "https://rps-game-ce388.firebaseio.com",
        projectId: "rps-game-ce388",
        storageBucket: "rps-game-ce388.appspot.com",
        messagingSenderId: "138684371598"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    var auth = firebase.auth()

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
    var eventCity = "";
    var searchURL = "";
    var keyWord = "";
    var eventId;
    var ticketmasterCountries = [{
            "code": "US",
            "name": "united states of america"
        },
        {
            "code": "AD",
            "name": "andorra"
        },
        {
            "code": "AI",
            "name": "anguilla"
        },
        {
            "code": "AR",
            "name": "argentina"
        },
        {
            "code": "AU",
            "name": "australia"
        },
        {
            "code": "AT",
            "name": "austria"
        },
        {
            "code": "AZ",
            "name": "azerbaijan"
        },
        {
            "code": "BS",
            "name": "bahamas"
        },
        {
            "code": "BH",
            "name": "bahrain"
        },
        {
            "code": "BB",
            "name": "barbados"
        },
        {
            "code": "BE",
            "name": "belgium"
        },
        {
            "code": "BM",
            "name": "bermuda"
        },
        {
            "code": "BR",
            "name": "brazil"
        },
        {
            "code": "BG",
            "name": "bulgaria"
        },
        {
            "code": "CA",
            "name": "canada"
        },
        {
            "code": "CL",
            "name": "chile"
        },
        {
            "code": "CN",
            "name": "china"
        },
        {
            "code": "CO",
            "name": "colombia"
        },
        {
            "code": "CR",
            "name": "costa rica"
        },
        {
            "code": "HR",
            "name": "croatia"
        },
        {
            "code": "CY",
            "name": "cyprus"
        },
        {
            "code": "CZ",
            "name": "czech republic"
        },
        {
            "code": "DK",
            "name": "denmark"
        },
        {
            "code": "DO",
            "name": "dominican republic"
        },
        {
            "code": "EC",
            "name": "ecuador"
        },
        {
            "code": "EE",
            "name": "estonia"
        },
        {
            "code": "FO",
            "name": "faroe islands"
        },
        {
            "code": "FI",
            "name": "finland"
        },
        {
            "code": "FR",
            "name": "france"
        },
        {
            "code": "GE",
            "name": "georgia"
        },
        {
            "code": "DE",
            "name": "germany"
        },
        {
            "code": "GH",
            "name": "ghana"
        },
        {
            "code": "GI",
            "name": "gibraltar"
        },
        {
            "code": "GB",
            "name": "great britain"
        },
        {
            "code": "GR",
            "name": "greece"
        },
        {
            "code": "HK",
            "name": "hong kong"
        },
        {
            "code": "HU",
            "name": "hungary"
        },
        {
            "code": "IS",
            "name": "iceland"
        },
        {
            "code": "IN",
            "name": "india"
        },
        {
            "code": "IE",
            "name": "ireland"
        },
        {
            "code": "IL",
            "name": "israel"
        },
        {
            "code": "IT",
            "name": "italy"
        },
        {
            "code": "JM",
            "name": "jamaica"
        },
        {
            "code": "JP",
            "name": "japan"
        },
        {
            "code": "KR",
            "name": "korea"
        },
        {
            "code": "LV",
            "name": "latvia"
        },
        {
            "code": "LB",
            "name": "lebanon"
        },
        {
            "code": "LT",
            "name": "lithuania"
        },
        {
            "code": "LU",
            "name": "luxembourg"
        },
        {
            "code": "MY",
            "name": "malaysia"
        },
        {
            "code": "MT",
            "name": "malta"
        },
        {
            "code": "MX",
            "name": "mexico"
        },
        {
            "code": "MC",
            "name": "monaco"
        },
        {
            "code": "ME",
            "name": "montenegro"
        },
        {
            "code": "MA",
            "name": "morocco"
        },
        {
            "code": "NL",
            "name": "netherlands"
        },
        {
            "code": "AN",
            "name": "netherlands antilles"
        },
        {
            "code": "NZ",
            "name": "new zealand"
        },
        {
            "code": "ND",
            "name": "northern ireland"
        },
        {
            "code": "NO",
            "name": "norway"
        },
        {
            "code": "PE",
            "name": "peru"
        },
        {
            "code": "PL",
            "name": "poland"
        },
        {
            "code": "PT",
            "name": "portugal"
        },
        {
            "code": "RO",
            "name": "romania"
        },
        {
            "code": "RU",
            "name": "russian federation"
        },
        {
            "code": "LC",
            "name": "saint lucia"
        },
        {
            "code": "SA",
            "name": "saudi arabia"
        },
        {
            "code": "RS",
            "name": "serbia"
        },
        {
            "code": "SG",
            "name": "singapore"
        },
        {
            "code": "SK",
            "name": "slovakia"
        },
        {
            "code": "SI",
            "name": "slovenia"
        },
        {
            "code": "ZA",
            "name": "south africa"
        },
        {
            "code": "ES",
            "name": "spain"
        },
        {
            "code": "SE",
            "name": "sweden"
        },
        {
            "code": "CH",
            "name": "switzerland"
        },
        {
            "code": "TW",
            "name": "taiwan"
        },
        {
            "code": "TH",
            "name": "thailand"
        },
        {
            "code": "TT",
            "name": "trinidad and tobago"
        },
        {
            "code": "TR",
            "name": "turkey"
        },
        {
            "code": "UA",
            "name": "ukraine"
        },
        {
            "code": "AE",
            "name": "united arab emirates"
        },
        {
            "code": "UY",
            "name": "uruguay"
        },
        {
            "code": "VE",
            "name": "venezuela"
        },
    ];

    // console.log(ticketmasterCountries);
    // ticketmasterCountries.forEach(function(element) {
    //     if(element.name == "canada"){
    //         console.log(element.code);
    //     }

    //   });

    // clicking a button to sign-in or create user
    var log_out = document.getElementById("log-in-drop")
 

    //grab fb data
    var database = firebase.database();

    //get user events
    //user events
    var user = {
        uid: "",
        user_name: "",
        user_email: "",
        user_fav_list: [],
        update: function (user_info) {
            this.uid = user_info.uid
            this.user_email = user_info.email

            //grab user name
            database.ref("/users/" + user.uid).on("value", function (snapshot) {
                user.user_name = snapshot.val().user_name
                document.getElementById("dropdownMenuButton").textContent = snapshot.val().user_name
            })
            //grab user fav list
            user.grab_fav_list()
        },
        grab_fav_list: function () {
            database.ref("/users/" + user.uid + "/favorite").on("child_added", function (snapshot) {
                var event = {
                    key: snapshot.key,
                    id: snapshot.val().event_id

                }
                getEventURL(event.id)
                console.log(snapshot.key)
                user.user_fav_list.push(event)
            })
        },
        user_logout: function () {
            this.uid = ""
            this.user_email = ""
            this.user_name = ""
            this.user_fav_list = []

        }

    }


    document.getElementById("Log-out").addEventListener("click", function () {
        firebase.auth().signOut().then(function () {
            window.location.href = "index.html"
        })

       
    })

    firebase.auth().onAuthStateChanged(firebaseUser => {

        if (firebaseUser) {
            user.update(firebaseUser)
            log_out.style.display = "block"


        }
    })

    // grab fb data for autocomplete

    var database = firebase.database();
    database.ref("/countries/country_list").on("child_added", function (snapshot) {


        var option = document.createElement("option")
        option.setAttribute("value", snapshot.val().code)
        option.setAttribute("class", "list")
        option.textContent = snapshot.val().name
        document.getElementById("eventCountry").append(option)

    });
    //2. Search Event listeners
    $("#eventSearch").on("click", function () {
        $("#eventDisplay").empty();
        captureSearch();
        getEvents();
        $("#country").val("");
        $("#city").val("");

    }); //end of event search by country, state, city



    //Key Word search
    $("#search-btn").on("click", function () {
        $("#eventDisplay").empty();
        keywordSearch();
        getEvents();
        $("#search-bar").val("");
    }); //end of key word search

    //3. Functions

    // Generate dynamic search URL
    function getEventURL(eventId) {

        //retrieve eventId

        //Get search URL


        //  searchURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=GRovhZWESxeRpkyVqNiWvG5iDGeyFBTp&city=" + eventCity +"&countryCode=" + countryCode + "&stateCode=" + stateCode;

        searchURL = "https://app.ticketmaster.com/discovery/v2/events.json?&apikey=GRovhZWESxeRpkyVqNiWvG5iDGeyFBTp&id=" + eventId;

        console.log(searchURL);

        setTimeout(getEvents(), 5000);

    };

    function keywordSearch() {
        event.preventDefault();

        console.log("you key word search!");

        //capture search values

        keyword = $("#search-bar").val().trim().toLowerCase();
        console.log("Key word is: " + keyword);

        searchURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=GRovhZWESxeRpkyVqNiWvG5iDGeyFBTp&keyWord=" + keyword;




        console.log(searchURL);
    };

    //Search Events by Country and City
    // Generate dynamic search URL
    function captureSearch() {
        event.preventDefault();

        console.log("you clicked event search!");

        //capture search values

        eventCountry = $("#country").val().trim().toLowerCase();
        console.log("Event Country is: " + eventCountry);

        ticketmasterCountries.forEach(function (element) {
            if (element.name == eventCountry) {
                console.log(element.code);
                countryCode = element.code;
            }

        });

        //  countryCode= document.getElementById("country").value;
        //  console.log("Country Code is"+ countryCode);

        //  eventState = $("#state").val().trim().toLowerCase();
        //  console.log(eventState);

        eventCity = $("#city").val().trim().toLowerCase();
        console.log(eventCity);

        //Get search URL


        searchURL = "https://app.ticketmaster.com/discovery/v2/events.json?&apikey=GRovhZWESxeRpkyVqNiWvG5iDGeyFBTp&city=" + eventCity + "&countryCode=" + countryCode + "&stateCode=" + stateCode;

        console.log(searchURL);
    };


    //3. Call Event API and display data

    function getEvents() {
        $.ajax({
            type: "GET",

            url: searchURL,
            async: true,
            dataType: "json",
            success: function (json) {
                console.log(json._embedded.events);
                // Parse the response.
                // store the data from the AJAX request in the results variable
                eventResults = json._embedded.events;

                console.log(eventResults.length);
                var eventSummary = $("#summary-info");
                eventSummary.addClass("text-center");
                eventSummary.text("We found " + eventResults.length + " events");

                for (var i = 0; i < eventResults.length; i++) {

                    if (Array.isArray(eventResults[i].priceRanges)) {

                        console.log("Explore " + eventResults.length + " events");
                        console.log("EventID is " + eventResults[i].id);
                        console.log("Event number is: " + i);
                        console.log("Event name is :" + eventResults[i].name); //1
                        console.log("Event image :" + eventResults[i].images[3].url); //2
                        console.log("Event Currency  :" + eventResults[i].priceRanges[0].currency); //3
                        console.log("Event Min Price :" + eventResults[i].priceRanges[0].min); //4
                        console.log("Event Max Price :" + eventResults[i].priceRanges[0].max); //5
                        console.log("Event Local Date :" + eventResults[i].dates.start.localDate); //6
                        console.log("Event Local Time :" + eventResults[i].dates.start.localTime); //7
                        console.log("Event Venue - City :" + eventResults[i]._embedded.venues[0].city.name); //8
                        console.log("Event Venue - Country:" + eventResults[i]._embedded.venues[0].country.name); //9
                        console.log("Buy Tickets " + eventResults[i].url);

                        //assign event variables based on data
                        eventId = eventResults[i].id;
                        eventName = eventResults[i].name;
                        eventImage = eventResults[i].images[0].url;
                        eventCurrency = eventResults[i].priceRanges[0].currency;
                        EventMinPrice = eventResults[i].priceRanges[0].min;
                        eventMaxPrice = eventResults[i].priceRanges[0].max;
                        eventDate = eventResults[i].dates.start.localDate;
                        eventTime = eventResults[i].dates.start.localTime;
                        eventVenue = eventResults[i]._embedded.venues[0].city.name + " , " + eventResults[i]._embedded.venues[0].country.name;
                        eventURL = eventResults[i].url;

                    } //close if statement

                    //display results on page.


                    // Ramon edit added the header for the card and the button to fav something
                    var newEvent = $("<div>");
                    newEvent.attr("id", eventResults[i].id)
                    newEvent.addClass("card float-sm-left float-md-left float-lg-left");
                    newEvent.css("width", "22rem");
                    newEvent.css("height", "35rem");
                    newEvent.css("margin-right", "10px");
                    newEvent.css("margin-bottom", "10px");

                    var newEventImage = $("<img>");
                    newEventImage.attr("src", eventResults[i].images[0].url);
                    newEventImage.addClass("card-img-top");

                    var newEventcardbody = $("<div>");
                    newEventcardbody.addClass("card-body");

                    var newEventcardhead = $("<div>");
                    newEventcardhead.addClass("card-head event-head");

                    var neweventTitle = $("<h5>");
                    neweventTitle.addClass("card-title event-title");
                    newEvent.css("font-size", "20px");
                    neweventTitle.text(eventResults[i].name);

                    var newfav = $("<h3>");
                    newfav.css("color", "red");
                    newfav.css("font-size", "24px");
                    newfav.addClass("newfav favorite");
                    // newfav.attr("event_id",eventResults[i].id)
                    var heart = $("<i>")
                    heart.addClass("far fa-heart")
                    heart.attr("event_id", eventResults[i].id)
                    newfav.append(heart);
                    //change to this when selected <i class="fas fa-heart"></i>


                    var fav = $("<button>");
                    fav.addClass("btn btn-primary favorite");
                    fav.attr("event_id", eventResults[i].id)
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
                    newEventPrice.attr("data-currency", eventCurrency);
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
                    newEventcardhead.append(newfav);
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

                } //close for loop

            },
            error: function (xhr, status, err) {
                // This time, we do not end up here!
            }
        }); //close AJAX call

    } // close function

    document.getElementById("eventDisplay").addEventListener("click", function (event) {
        console.log(event.target)
        //check for button
        if (event.target.hasAttribute("event_id")) {
            console.log("yes")
            //check if they logged in
            var event_id = event.target.getAttribute("event_id")
            var id_list = user.user_fav_list
            if (user.uid != "") {
                if (event.target.parentElement.classList.contains("heart-favorite")) {
                    for (var i = 0; i < id_list.length; i++) {
                        if (event_id === id_list[i].id) {
                            console.log(id_list[i].key)
                            database.ref("/users/" + user.uid + "/favorite").child(id_list[i].key).remove()
                            var old_event = document.getElementById(event_id)
                            favproperties(old_event)
                            id_list.splice(i)
                        }
                    }

                } else {
                    database.ref("/users/" + user.uid + "/favorite").push({
                        //push id
                        event_id: event_id
                    })

                }
            }
        }
    })

    function favproperties(div) {
        if(div!=null){
        div.querySelector("h3").classList.toggle("heart-favorite")
        div.querySelector("button").classList.toggle("btn-clicked")
        div.classList.toggle("favorited")
        }
    }


    intervalId = setInterval(function () {
        for (var i = 0; i < user.user_fav_list.length; i++) {
            var fav_event = document.getElementById(user.user_fav_list[i].id)
            if (fav_event != null && fav_event.classList.contains("favorited") != true) {
                favproperties(fav_event)

            }

        }


    }, 500)

}); //End of Document ready