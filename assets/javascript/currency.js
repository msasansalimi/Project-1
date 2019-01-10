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


    // creates the dropdown list for the diffrent currencies the first one is for the base and the second on is for what we want

   database.ref("/currency/list/results").on("child_added",function(snapshot){


    var option= document.createElement("option")
    option.setAttribute("value",snapshot.val().id)
    option.setAttribute("class", "list")
    option.textContent=snapshot.val().currencyName
    document.getElementById("currency").append(option)

   })
  
function Converstion(from,to,task,amount,list){
    var q=from+"_"+to
    console.log(q)
    var queryUrl="https://free.currencyconverterapi.com/api/v6/convert?q="+q

    console.log(queryUrl)
$.ajax({
    url:queryUrl,
    method:"GET",
}).then(function(response){

    console.log(response)
    console.log(q)
    var rate=response.results[q].val
    console.log(rate)
    rates= rate;
    switch(task){
        case "convert":
        var converstion=(rate*amount).toFixed(2)
        console.log(converstion)
        document.getElementById("converted-amount").textContent=converstion
        break;
        case "change_default":
        amount.max=(amount.max*rate).toFixed(2)
        amount.min=(amount.min*rate).toFixed(2)
        list.setAttribute("data-min",amount.min)
        list.setAttribute("data-min",amount.max)
        list.textContent="Price range: " +amount.min + " to " + amount.max + " " + to
    }

    
})  
}
//    document.getElementById("change_default").addEventListener("click",function(){
//     var task=this.getAttribute("id")
//     var from =document.getElementById("eventDisplay").getAttribute("data-currency")
//     var to=document.getElementById("default").value
//     var list=document.getElementsByClassName("price-range")
//     for(var i=0;i<list.length;i++){
//         var price={ max:parseFloat(list[i].getAttribute("data-max")),
//         min:parseFloat(list[i].getAttribute("data-min")),
//                 }   

//     Converstion(from,to,task,price,list[i])
//     }
//    }) 
//need a button to do these
   document.getElementById("convert").addEventListener("click", function(){
    var task=this.getAttribute("id")
    var from=document.getElementById("from").value
    var to=document.getElementById("to").value
    var amount=parseFloat(document.getElementById("amount").value)
    Converstion(from,to,task,amount)

   })

    $('.flexdatalist').flexdatalist({
        minLength: 1,
        valueProperty:"value"
   });



   })


