$(document).ready(function () {
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
            user.grab_fav_list()


        },
        grab_fav_list: function () {
            database.ref("/users/" + user.uid + "/favorite").on("child_added", function (snapshot) {
                var event = {
                    key: snapshot.key,
                    id: snapshot.val().event_id

                }
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


    // clicking a button to sign-in or create user
    var log_out = document.getElementById("log-in-drop")
    var sign_in = document.getElementById("sign-in")
    var create = document.getElementById("create_user")
    
    sign_in.addEventListener("click", Auth_modal)
    create.addEventListener("click", Auth_modal)
    var task_button = document.getElementById("task_button")



    //openingthe modal a
    function Auth_modal() {

        var task = this.getAttribute("id")
        document.getElementById("Title").textContent = task.toUpperCase();
        var name_box = document.getElementById("name_box");
        name_box.innerHTML = "";
        task_button.setAttribute("data-task", task);

        if (task === "create_user") {
            var name_input = document.createElement("input");
            name_input.setAttribute("type", "text");
            name_input.setAttribute("id", "Username");
            name_input.setAttribute("class", "form-control");
            name_input.setAttribute("aria-label", "Sizing example input");
            name_input.setAttribute("aria-describedby", "inputGroup-sizing-sm");
            name_input.setAttribute("placeholder", "Username");
            name_box.appendChild(name_input);
            document.getElementById("Title").textContent = "Create Account"
            task_button.textContent = "Create Account";
        } else {
            document.getElementById("Title").textContent = "Sign-In"
            task_button.textContent = "Sign-In";
        }
    }


    //auth button
    task_button.addEventListener("click", function () {
        var task = this.getAttribute("data-task")

        var email = document.getElementById("email").value;

        var password = document.getElementById("password").value;

        switch (task) {

            case "create_user":
                var name = document.getElementById("Username").value;
                auth.createUserWithEmailAndPassword(email, password).then(function (snapshot) {
                    database.ref("/users/" + snapshot.user.uid).set({
                        user_name: name
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
            sign_in.style.display = "none"
            create.style.display = "none"
            log_out.style.display = "block"


        }
    })

    // logging out
    document.getElementById("Log-out").addEventListener("click", function () {
        firebase.auth().signOut().then(function () {
            var id_list = user.user_fav_list
            for (var i = 0; i < id_list.length; i++) {
                    var old_event = document.getElementById(id_list[i].id)
                    favproperties(old_event)
            }
            user.user_logout();
            sign_in.style.display = "block"
            create.style.display = "block"
            log_out.style.display = "none"
            console.log("bye")
        })
    })

    //add event to the favourties/removes events
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
                            var old_event = document.getElementById(id_list[i].id)
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


    ///modifies event if they are favorited
    intervalId = setInterval(function () {
        for (var i = 0; i < user.user_fav_list.length; i++) {
            var fav_event = document.getElementById(user.user_fav_list[i].id)
            if (fav_event != null && fav_event.classList.contains("favorited") != true) {
                favproperties(fav_event)

            }

        }


    }, 500)

})