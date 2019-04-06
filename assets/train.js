 console.log("ready");
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

//Declare Variables
var tFrequency = "";
var firstTime = "";
var trainName= "";
var destination="";

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
    console.log(trainName);
    console.log(destination);
    console.log(firstTime);
    console.log(tFrequency);

    //Push data to Firebase as a new child
    firebase.database().ref().set({
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        tFrequency: tFrequency,
    })
})

//add variables to calculate when the next train will arrive

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


