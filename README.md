# Train-Scheduler
## Realtime Scheduling Application 
![screenshot](/assets/Train-scheduler.png)

### <https://whitney227.github.io/Train-Scheduler/>

# Purpose
In this application, users can input data that will be stored in Firebase and updated in real-time. The data returned will show the time of the next train arrival and how many minutes away the train is from the station.

# Technical Approach
First I created a form in HTML for users to enter text input such as train name and destination.  Once submited, the user input is pushed to Firebase and stored as JSON strings.

The returned data gets stored as variables and manipulted using Moment.js to calculate methods like .add, .subtract, and .format.  The manipulated data then gets displayed in an HTML table using the jQuery append method.

