$(document).ready(function(){
    var config = {
        apiKey: "AIzaSyAm2DX2UmnZ1-IG1fWL4lFJWPvx2eXV5PU",
        authDomain: "rps-game-ce388.firebaseapp.com",
        databaseURL: "https://rps-game-ce388.firebaseio.com",
        projectId: "rps-game-ce388",
        storageBucket: "rps-game-ce388.appspot.com",
        messagingSenderId: "138684371598"
      };
      firebase.initializeApp(config);

   var database=firebase.database();
    
   database.ref("/currency/list/results").on("child_added",function(snapshot){


    var option= document.createElement("option")
    option.setAttribute("value",snapshot.val().id)
    option.setAttribute("class", "list")
    option.textContent=snapshot.val().currencyName
    document.getElementById("currency").append(option)

   })
  


// creates the dropdown list for the diffrent currencies the first one is for the base and the second on is for what we want

   document.getElementById("convert").addEventListener("click",function(){
      
    
    // 
    var form=document.getElementById("from").value
    var to=document.getElementById("to").value
    var amount=parseFloat(document.getElementById("amount").value)
    console.log(to)
    console.log(form)
    console.log(amount)
   
   
    var q=form+"_"+to
    console.log(q)
    var queryUrl="http://free.currencyconverterapi.com/api/v6/convert?q="+q

    console.log(queryUrl)
   $.ajax({
    url:queryUrl,
    method:"GET",
   }).then(function(response){

    console.log(response)
    var rate=response.results[q].val
    var converstion=rate*amount

    console.log(converstion)
   })    


    })





    $('.flexdatalist').flexdatalist({
        minLength: 1,
        valueProperty:"value"
   });



   })









