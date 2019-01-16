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
        var auth=firebase.auth()
        var user={  uid:"",
        user_name:"",
        user_email:"",
        user_fav_list:[],
        update:function(user_info){
            this.uid=user_info.uid
            this.user_email=user_info.email

            //grab user name
            database.ref("/users/"+user.uid).on("value",function(snapshot){
                user.user_name=snapshot.val().user_name
                document.getElementById("dropdownMenuButton").textContent=snapshot.val().user_name
            })
            //grab user fav list
            database.ref("/users/"+user.uid+"/favorite").on("child_added",function(snaphot){
                user.user_fav_list.push(snaphot.val().event_id)
            })

        },
        user_logout:function(){
            this.uid=""
            this.user_email=""
            this.user_name=""
            this.user_fav_list=[]

        }
      
}
    
    
    // clicking a button to sign-in or create user
        var log_out=document.getElementById("log-in-drop")
        var sign_in= document.getElementById("sign-in")
        var create= document.getElementById("create_user")
        
        sign_in.addEventListener("click",Auth_modal)
        create.addEventListener("click",Auth_modal)
        var task_button=document.getElementById("task_button")



    //openingthe modal a
    function Auth_modal(){
    
        var task=this.getAttribute("id")
        document.getElementById("Title").textContent=task.toUpperCase();
        var name_box=document.getElementById("name_box");
        name_box.innerHTML="";
        task_button.setAttribute("data-task",task);
       
     if(task==="create_user"){
            var name_input=document.createElement("input");
            name_input.setAttribute("type", "text");
            name_input.setAttribute("id", "Username");
            name_input.setAttribute("class", "form-control");
            name_input.setAttribute("aria-label", "Sizing example input");
            name_input.setAttribute("aria-describedby", "inputGroup-sizing-sm");
            name_input.setAttribute("placeholder", "Username");
            name_box.appendChild(name_input);
            document.getElementById("Title").textContent="Create Account"
            task_button.textContent="Create Account";
        }
    else{
        document.getElementById("Title").textContent="Sign-In"
        task_button.textContent="Sign-In";
    }
    }
    
    
    //auth button
        task_button.addEventListener("click",function(){
            var task=this.getAttribute("data-task")
          
            var email=document.getElementById("email").value;

            var password=document.getElementById("password").value;
           
            switch(task){
    
                case "create_user":
                var name=document.getElementById("Username").value;
                auth.createUserWithEmailAndPassword(email, password).then(function(snapshot){
                    database.ref("/users/"+snapshot.user.uid).set({
                        user_name:name
                    })
                 })
               
                break;
                case "sign-in":
                auth.signInWithEmailAndPassword(email, password)
        
            }
        })
    
        //when they log in or create a user
       firebase.auth().onAuthStateChanged(firebaseUser => {
    
        if (firebaseUser) {
           user.update(firebaseUser)    
           sign_in.style.display="none"
           create.style.display="none"
           log_out.style.display="block"
        

        } 
    })
    
    // logging out
    document.getElementById("Log-out").addEventListener("click", function () {
        firebase.auth().signOut().then(function () {

            user.user_logout();
            document.getElementsByClassName("favorited").forEach(element => {
                element.classList.toggle("favorited")
            });
            sign_in.style.display="block"
            create.style.display="block"
            log_out.style.display="none"
            console.log("bye")
        })
    
             window.location.href="index.html"
    })
    
    //add event to the favourties
    document.getElementById("eventDisplay").addEventListener("click",function(event){
        console.log(event.target)
        //check for button
        if(event.target.hasAttribute("event_id")){
            console.log("yes")  
            //check if they logged in
            if(user.uid!=""){
            database.ref("/users/"+user.uid+"/favorite").push({
                //push id
                    event_id:event.target.getAttribute("event_id")
            })
            user.user_fav_list.push(event.target.getAttribute("event_id"))
            }
        }
    })
    


    ///modifies event if they are favorited
//    intervalId=setInterval(function(){
//     console.log("hello")
//     console.log(user.user_fav_list)
//         for(var i=0;i<user.user_fav_list.length;i++){
//             var fav_event=document.getElementById(user.user_fav_list[i])
//             console.log(fav_event)
//             if( fav_event!=null&&fav_event.classList.contains("favorited")!=true){
//                     fav_event.classList.toggle("favorited")
//                     var fav_button= fav_event.children[0].children[1]
//                     fav_button.disabled=true;
//                     fav_button.classList.toggle("fav_button_clicked")
//                     fav_button.textContent="X"
               
//             }   
           


//         }


//     },1000)

})




