$(document).ready(function () {
    var database = firebase.database();


    // creates the dropdown list for the diffrent currencies the first one is for the base and the second on is for what we want

    database.ref("/currency/list/results").on("child_added", function (snapshot) {


        var option = document.createElement("option")
        option.setAttribute("value", snapshot.val().id)
        option.setAttribute("class", "list")
        option.textContent = snapshot.val().currencyName
        document.getElementById("currency").append(option)

    })

    function Ajax_call(from, to,list,callback) {
        var q = from + "_" + to
        console.log(q)
        var queryUrl = "https://free.currencyconverterapi.com/api/v6/convert?q=" + q

        console.log(queryUrl)
        $.ajax({
            url: queryUrl,
            method: "GET",
        }).then(function (response) {

            console.log(response)
            console.log(q)
            var rate = response.results[q].val
            done=true
            callback(rate,list)
        })
    }

    function Converstion() {
     
        var task = this.getAttribute("id")
        console.log(task)
        switch (task) {
            case "convert":
 
                var from = document.getElementById("from").value
                var to = document.getElementById("to").value
                var list= document.getElementById("converted-amount")
                 Ajax_call(from, to,list, function(rate,list){
                    console.log(rate)
                    var amount = parseFloat(document.getElementById("amount").value)
                    console.log(amount)
                    var converstion = (rate * amount).toFixed(2)

                   list.textContent = converstion
                })

                break;
            case "default-input":
           
        
            var to = document.getElementById("default").value 
            var grp_1={
                code:"",
                event_list:[]
            }
            var grp_list=[grp_1]
            var events=document.getElementsByClassName("price-range")
            for(var i=0;i<events.length;i++){// through every events
                var new_currency=true;
                if(i===0){
                    grp_1.code=events[i].getAttribute("data-currency")
                    grp_1.event_list.push(events[i])
                }
                else if(i>0){
               
               grp_list.forEach(function(grp){
                //for every diffrent type of code on the screen
                    if(events[i].getAttribute("data-currency")===grp.code){
                        grp.event_list.push(events[i])
                        new_currency=false;
                    }
                })
                if(new_currency){//if we get a new currency
                    var new_grp=Object.create(grp_1)
                    new_grp.code=events[i].getAttribute("data-currency")
                    new_grp.event_list=[]
                    new_grp.event_list.push(events[i])
                    grp_list.push(new_grp)
                }
        
               }
              
            }
            console.log(grp_list) 
            for (var i = 0; i < grp_list.length; i++) {   
            var from =grp_list[i].code  
            
           
                    //for every event in that code currency code
       
        
            Ajax_call(from, to,grp_list[i], function(rate,list){
                console.log(list)
                list.event_list.forEach(function(event){
                    var price = {
                        max: parseFloat(event.getAttribute("data-max")),
                        min: parseFloat(event.getAttribute("data-min")),
                    }
                    
                    price.max = (price.max * rate).toFixed(2)
                    price.min = (price.min * rate).toFixed(2)
                    event.setAttribute("data-min",price.min)
                    event.setAttribute("data-min", price.max)
                    event.setAttribute("data-currency", to)
                    event.textContent = "Price range: " + price.min + " to " + price.max + " " +  to
                 
                
                })  
            
             })
          
            }        
        }
        
    }

 
  
    document.getElementById("default-input").addEventListener("click", Converstion)
    //need a button to do these
    document.getElementById("convert").addEventListener("click", Converstion)
    // document.getElementById("new_default").addEventListener("input",myfunction)

    // function myfunction(){
    //     console.log(this.value)
    // }
    $('.flexdatalist').flexdatalist({
        minLength: 1,
        valueProperty: "value"
    });


})