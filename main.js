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
    document.getElementById("from").append(option)

   })
  
   database.ref("/currency/list/results").on("child_added",function(snapshot){
    var option= document.createElement("option")
    option.setAttribute("value",snapshot.val().id)
    option.textContent=snapshot.val().currencyName
    document.getElementById("to").append(option)

   })



   document.getElementById("convert").addEventListener("click",function(){
      
    
    // 
    var form=document.getElementsByClassName("list")[document.getElementById("from").selectedIndex-1].value
    var to=document.getElementsByClassName("list")[document.getElementById("to").selectedIndex-1].value
    var amount=parseFloat(document.getElementById("amount").value)
    console.log(amount)
    console.log(form)
    console.log(to)
   
   
    var q=form+"_"+to
    console.log(q)
    var queryUrl="http://free.currencyconverterapi.com/api/v6/convert?q="+q
    // queryUrl+="?"+ $.param({
    // "access_key":key,
    // "from":from,
    // "to":to,
    // "amount":amount
    // })
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









   })









