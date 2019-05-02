var mainApp={};

var uid = null;

(function(){
  var firebase = app_fireBase;
  
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var user = firebase.auth().currentUser;
        uid = user.uid;
        $(".name").text(user.displayName);
        $(".email").text(user.email);
        firebase.database().ref('users/' + uid).set({
          username: user.displayName,
          email: user.email
        });
        firebase.database().ref('fastpass/' + uid).on('value', function(snapshot){ 
          console.log(snapshot.val().fp1)
        });

      

        // User is signed in.
        //capturing user id on login
        console.log(user)
      }else{
        //redirect to login page
        uid = null;
        window.location.replace("././login.html");
    }
});

  function logOut(){
    firebase.auth().signOut();
  }
  mainApp.logOut = logOut;
})()

/*

var rides= ["astro-orbiter","barnstormer", "big-thunder-mountain-railroad", "buzz-lightyears-space-ranger-spin", "country-bear-jamboree","dumbo-the-flying-elephant","hall-of-presidents", "haunted-mansion","its-a-small-world", "jungle-cruise","mad-tea-party","magic-carpets-of-aladdin", "many-adventures-of-winnie-the-pooh", "peter-pans-flight", "pirates-of-the-caribbean","prince-charming-regal-carrousel", "seven-dwarfs-mine-train","space-mountain", "splash-mountain","tomorrowland-speedway","tomorrowland-transit-authority-peoplemover", "under-the-sea","walt-disneys-carousel-of-progress", "enchanted-tiki-room"]



for(var i=0; i< rides.length ; i++){
  ride = rides[i]
  var proxyurl = "https://cors-anywhere.herokuapp.com/"
  var url = "https://touringplans.com/magic-kingdom/attractions/"+ ride + ".json"
  var newURL = proxyurl + url 
  
$.ajax({
  url: newURL,
  method: "GET"
})
.then(function(response){
  // var results = response.data;
  console.log(response.name + ": " + response["average_wait_per_hundred"])
})
}

*/

 

var rideNames=  ["Astro Orbiter","Barnstormer","Big Thunder Mountain Railroad","Buzz LightYear's Space Ranger Spin","Country Bears' Jamboree","Dumbo","The Hall of Presidents","The Haunted Mansion","'It's a small world'","Jungle Cruise","Mad Tea Party","The Magic Carpets of Aladdin" ,"The Many Adventures of Winnie the Pooh","Peter Pan's Flight","Pirate's of the Caribbean", "Prince Charming's Regal Carousel","Seven Dwarves Mine Train","Space Mountain","Splash Mountain","Swiss Family Robinson Tree House","Tom Sawyer's Island","Transit Authority PeopleMover","Under the Sea","Walt Disney's Carousel of Progress" ,"Walt Disney's Enchanted Tiki Room"]
for (var i=0; i < rideNames.length; i++){
  console.log(rideNames[i])
  var newOption= $("<option>").attr("value", (i+1)).text(rideNames[i])
  var newOption2= $("<option>").attr("value", (i+1)).text(rideNames[i])
  var newOption3= $("<option>").attr("value", (i+1)).text(rideNames[i])
  var newOption4= $("<option>").attr("value", (i+1)).text(rideNames[i])
  var newOption5= $("<option>").attr("value", (i+1)).text(rideNames[i])
  var newOption6= $("<option>").attr("value", (i+1)).text(rideNames[i])
  $("#firstFPRide").append(newOption)
  $("#secondFPRide").append(newOption2)
  $("#thirdFPRide").append(newOption3)
  $("#firstFavRide").append(newOption4)
  $("#secondFavRide").append(newOption5)
  $("#thirdFavRide").append(newOption6)


}


$(document).ready(function(){

  $("#profileSave").on("click", function(event){
    event.preventDefault();


    var profileName = $("#riderName-input").val().trim();
    var riderType = $("#profileType").val();
    var heightRestrict = $("#heightRestrict").val();
    var physicalRestrict = $("#physicalRestrict").val();
    let ref= firebase.database().ref('profiles/' + uid)
    ref.push({
        
      name: profileName,
      type: riderType,
      maxHeight: heightRestrict,
      physicalRestrict: physicalRestrict,
    })

  });


  $("#riderRestrictSubmit").on("click", function(event) {
    event.preventDefault();

  
    console.log(heightRestrict, physicalRestrict)

    localStorage.setItem("heightRestrict", heightRestrict);
    localStorage.setItem("physicalRestrict", physicalRestrict);
  });

  $("#riderFastPassSubmit").on("click", function(event) {
    event.preventDefault();
    let ref = firebase.database().ref('fastpass/' + uid);
    let fastPassRideOne = $("#firstFPRide option:selected").text();
  fastPassRideOne = !(fastPassRideOne) ? "none" : $("#firstFPRide option:selected").text();
    let fastPassTimeOne = $("#firstFPTime").val().trim();
    
    let fastPassRideTwo = $("#secondFPRide option:selected").text();
  fastPassRideTwo = !(fastPassRideTwo) ? "none" : $("#secondFPRide option:selected").text();
    let fastPassTimeTwo = $("#secondFPTime").val().trim();
    let fastPassRideThree = $("#thirdFPRide option:selected").text() 
  fastPassRideThree = !(fastPassRideThree) ? "none" : $("#thirdFPRide option:selected").text() 
    let fastPassTimeThree = $("#thirdFPTime").val().trim();

    ref.set({
      fp1: fastPassRideOne,
      fpTime1: fastPassTimeOne,
      fp2: fastPassRideTwo,
      fpTime2: fastPassTimeTwo,
      fp3: fastPassRideThree,
      fpTime3: fastPassTimeThree,
    });
  })

  $("#favoriteSubmit").on("click", function(event) {
    event.preventDefault();
    let ref = firebase.database().ref('favorites/' + uid);
    var favOne = $("#firstFavRide").val()
    favOne = !(favOne) ? "none" : $("#firstFavRide").val().trim();
    var favTwo = $("#secondFavRide").val()
    favTwo = !(favTwo) ? "none" : $("#secondFavRide").val().trim();
    var favThree = $("#thirdFavRide").val()
    favThree = !(favThree) ? "none" : $("#thirdFavRide").val().trim();
    ref.set({
      fav1: favOne,
      fav2: favTwo,
      fav3: favThree,
    }).key;
  });

  //Sidenav Activate
  $('.sidenav').sidenav();
  //Modal Activate
  $('.modal').modal();
  //Dropdown Activate
  $('select').formSelect();

});
















