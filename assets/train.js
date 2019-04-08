// Initialize Firebase
 var config = {
    apiKey: "AIzaSyDoPwCwAr_TF-uuELSdx6VMyUtoS_k-yTg",
    authDomain: "my-train-project-e5f01.firebaseapp.com",
    databaseURL: "https://my-train-project-e5f01.firebaseio.com",
    projectId: "my-train-project-e5f01",
    storageBucket: "my-train-project-e5f01.appspot.com",
    messagingSenderId: "657980555763"
};
firebase.initializeApp(config);

var dataRef=firebase.database();

//Listener for the submit button
$("#submit").on('click', function(event){
    //this method prevents the page from being reloaded
    event.preventDefault();
    
    //capture the input and store it into variables
    trainName = $('#inputTrainName').val().trim();
    destination = $('#inputDestination').val().trim();
    firstTime = $('#firstTime').val().trim();
    tFrequency = $('#tFrequency').val().trim();

    //console log to confirm that input is being received
    console.log("trainName");
    console.log("destination");
    console.log("firstTime");
    console.log("tFrequency");

    //Creat a local "temporary" object for holding data
    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        tFrequency: tFrequency,
        dataAdded: firebase.database.ServerValue.TIMESTAMP
    };
     //Push data to Firebase as a new child
     dataRef.ref().push(newTrain);

     //Reset user input form
     document.forms[0].reset();
})

//Create a Firebase watcher for when a user adds an entry
dataRef.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());
    //store returned data into variables
    var name = childSnapshot.val().trainName;
    var dest= childSnapshot.val().destination;
    var time = childSnapshot.val().firstTime;
    var frequency = childSnapshot.val().tFrequency;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(time, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    //Create a new row for HTML table
    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(dest),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain)
    );
    //Append new row
    $("#trainSchedule > tbody").append(newRow);
});


