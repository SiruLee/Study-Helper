// Run the clock as soon as the page is loaded
clock();

// Then call the clock function every 10 milliseconds for the accuracy
window.setInterval(clock, 10);

// Function for the real-time clock
function clock() {

    // Declare variables of time components
    var time=new Date();
    var day=time.getDay();
    var hours=time.getHours();
    var minutes=time.getMinutes();
    var seconds=time.getSeconds();
    var period;

    // Determine the period (AM/PM)
    if (hours<12){
        period="0"
    }
    else{
        period="1"
    }

    // Format the time as 12-hour system
    hours%=12;

    // If the hour is 0, initiate it as 12
    if (hours==0){
        hours=12;
    }

    // To make the time components in the vaild format, append '0' in front of the numbers and slice the last two digits
    hours=('0'+hours).slice(-2);
    minutes=('0'+minutes).slice(-2);
    seconds=('0'+seconds).slice(-2);

    // Create a whole string of time by connecting all three time components
    var timeString=hours+minutes+seconds;

    // Display the time on the page by updating digit-by-digit
    for (var i=0; i<6; i++){
        var timeChar=document.getElementsByClassName("clockdigit");
        timeChar[i].innerHTML=timeString[i];
    }
    
    // If the day is 0 (Sunday), changed it to 7 (Sunday on the clock)
    if(day==0){
        day=7;
    }

    // For all days on the clock
    for (var j=0; j<7; j++){
        var dayChar=document.getElementsByClassName("day");

        // If the day is today, color it black
        if (j==day-1){
            dayChar[j].style.color="black";
            continue;
        }

        // Else, color it gray
        else{
            dayChar[j].style.color="rgb(190,190,190)";
        }
    }

    // Color the current period as black, while coloring gray the another one
    var ampm=document.getElementsByClassName("AMPM");
    ampm[0].style.color="rgb(190,190,190)";
    ampm[1].style.color="rgb(190,190,190)";
    ampm[period].style.color="rgb(0,0,0)";
}

// Function for changing the clock through the menu
function tab(id){

    // Color the clicked menu button with black, while coloring the other buttons gray
    for (var i=0; i<3; i++){
        var button=document.getElementsByClassName("menu");
        button[i].style.color="rgb(190,190,190)";
    }
    document.getElementById(id).style.color="rgb(0,0,0)";

    // Display the corresponding clock function depending on the clicked button
    switch(id){
        case 'Cmenu':
            document.getElementById("clock").style.display="block";
            document.getElementById("stopwatch").style.display="none";
            document.getElementById("timer").style.display="none";
            break;
        case 'Smenu':
            document.getElementById("clock").style.display="none";
            document.getElementById("stopwatch").style.display="block";
            document.getElementById("timer").style.display="none";
            break;
        case 'Tmenu':
            document.getElementById("clock").style.display="none";
            document.getElementById("stopwatch").style.display="none";
            document.getElementById("timer").style.display="block";
            break;
    }
}

// Declare an array of a series of digits for the stopwatch
var values=[0,0,0,0,0,0,0,0];

// Declare a variable for repeating function
var stopwatch;

// Function for starting the stopwatch
function stopStart(){

    // Change the style of corresponding elements and disable the reset button
    document.getElementById("watchstart").style.display="none";
    document.getElementById("watchstop").style.display="block";
    document.getElementById("reset").disabled=true;
    document.getElementById("reset").style.backgroundColor="rgba(221,221,221,0.7)";

    // Call the function to make the stopwatch flow every 10 milliseconds.
    stopwatch = setInterval(stopwatchActive, 10);
}

// Function for stopping the stopwatch
function stopStop(){

    // Change the style of corresponding elements and enable the reset button
    document.getElementById("watchstart").style.display="block";
    document.getElementById("watchstop").style.display="none";
    document.getElementById("reset").disabled=false;
    document.getElementById("reset").style.backgroundColor="";

    // Call the function to stop the stopwatch
    stop();
    clearInterval(stopwatch);
}
function stopReset(){

    // Reset the array of digits to the original state
    values=[0,0,0,0,0,0,0,0];

    // Change all the digits of the stopwatch to 0
    var digits=document.getElementsByClassName("stopdigit");
    for (var digit of digits){
        digit.innerHTML=0;
    }
}

// Function for set the stopwatch active
function stopwatchActive(){

    var digits=document.getElementsByClassName("stopdigit");
    var i;

    // For all the digits from the least-order digit,
    for (i=7; i>=1; i--){

        // If the digit is 10, change it to 0 and increase the next digit by 1
        if(values[i]==10){
            digits[i-1].innerHTML=0;
            values[i]=0;
            values[i-1]++;

            // If the digit is below the oneth digit of minutes, update the corresponding element on the page
            if (i>=3){
                digits[i-2].innerHTML=values[i-1];
            }

            // Else, update the highest-order digit on the page
            else{
                document.getElementById("lastdigit").innerHTML=values[0];
            }
        }
    }

    // For the tenth digits of minutes and hours,
    for(i=4; i>=2; i-=2){

        // If the digit is 6, change it to 0 and increase the next digit by 1
        if (values[i]==6){
            digits[i-1].innerHTML=0;
            values[i]=0;
            values[i-1]++;
            digits[i-2].innerHTML=values[i-1];
        }
    }

    // Update the least-order digit on the page and increase the value of that by 1
    digits[6].innerHTML=values[7];
    values[7]++;
}

// Initiate the string of input digits for the timer
var timerstring="";

// Function for get input for the timer
function timerinput(){
    var timerdigit=document.getElementsByClassName("timerdigit");

    // Get the input and initiate the variable.
    var digits=document.getElementById("timerinput").value;
    timerstring=digits;

    // If any digits are entered, slice only the last 6 digits and enable the start button
    if (timerstring.length>0){
        timerstring=timerstring.slice(-6);
        document.getElementById("timerstart").disabled=false;
        document.getElementById("timerstart").style.backgroundColor="rgba(103,206,103,0.7)";
    }

    // Else, disable the start button
    else{
        document.getElementById("timerstart").disabled=true;
        document.getElementById("timerstart").style.backgroundColor="rgba(103,206,103,0.3)";
    }

    // Reset all the digit on the page to 0 for the case when the backspace is entered
    for(var digit of timerdigit){
        digit.innerHTML=0;
    }

    // Update the digit according to the input digits
    for (var i=0; i<timerstring.length; i++){
        timerdigit[6-timerstring.length+i].innerHTML=timerstring[i];
    }
}

// Function when the input field is focused
function inputfocus(){

    // Disable the arrow keys
    document.getElementById("timerinput").addEventListener('keydown', function(e){
        if(e.keyCode == 37 || e.keyCode == 38||e.keyCode == 39||e.keyCode == 40)
            e.preventDefault();
    });

    // Color the digits as black
    document.getElementById("timertime").style.color="black";
    document.getElementById("timertyper").style.backgroundColor="black";

    var inputid=document.getElementById("timerinput");
    var len = inputid.value.length; 

    // Place the cursor at the end of the input field
    inputid.type="text";
    if (len>0) { 
        inputid.focus(); 
        inputid.setSelectionRange(len, len); 
    } 
    inputid.type="number";
}

// Function when the input field is out of focus
function inputfocusout(){

    // Hide the cursor shape
    document.getElementById("timertyper").style.backgroundColor="transparent";

    // If the input field is empty, change the color of digits on the page to gray
    if(document.getElementById("timerinput").value.length==0){
        document.getElementById("timertime").style.color="rgb(190,190,190)";
    }
}

var ringScreen;
var ringSound;

// Function for ringing an alarm
function alarm(){

    // Change the style of certain elements
    document.getElementById("timerstart").style.display="none";
    document.getElementById("timerstop").style.display="none";
    document.getElementById("resume").style.display="none";
    document.getElementById("cancel").style.display="none";
    document.getElementById("stop").style.display="block";
    document.getElementById("clockBG").style.backgroundColor="black";

    var i=0;
    
    // Alternately change the background color with black and white every 0.3 seconds
    ringScreen=setInterval(function(){

        // If i is divisable by 2, set the background color as white
        if(i%2==0){
            document.getElementById("clockBG").style.backgroundColor="white";
        }

        // If i is not divisable by 2, set the background color as black
        else{
            document.getElementById("clockBG").style.backgroundColor="black";
        }
        
        // Increase the value of i by 1
        i++
    }, 300);
    
    // Play the alarm sound repeatedly
    ringSound=setInterval(function(){
        document.getElementById("radar").play();
    },0);

    // Stop the timeflow
    clearInterval(timeflow);
}

var timeout;
var timeflow;

// Function to make the timer flow
function timerflow(){

    // Update the timer every 1 second
    timeflow=setInterval(function(){

        // Decrease the total seconds by 1
        timerseconds--;

        // Process the total seconds into three parts of digits, hours, minutes, and seconds with the calculation.
        var timersecondsCopy=timerseconds;
        var hoursDigits="00"
        var minutesDigits="00"
        var secondsDigits="00"
        
        hoursDigits+=parseInt(timersecondsCopy/3600);
        timersecondsCopy-=3600*hoursDigits;
        minutesDigits+=parseInt(timersecondsCopy/60);
        timersecondsCopy-=60*minutesDigits;
        secondsDigits+=parseInt(timersecondsCopy);
        
        // Update every digit on the timer with the processed values above, and convert the total seconds into digits to update the value in the input field.
        var timerdigit=document.getElementsByClassName("timerdigit");
        for(var i=0; i<2; i++){
            timerdigit[0+i].innerHTML=hoursDigits.substr(-2+i,1);
            document.getElementById("timerinput").value=hoursDigits.substr(-2);
            timerdigit[2+i].innerHTML=minutesDigits.substr(-2+i,1);
            document.getElementById("timerinput").value+=minutesDigits.substr(-2);
            timerdigit[4+i].innerHTML=secondsDigits.substr(-2+i,1);
            document.getElementById("timerinput").value+=secondsDigits.substr(-2);
        }

        // Update the string of digits with the value in the input field
        timerstring=document.getElementById("timerinput").value;
    },1000);
}

var timerseconds;

// Function for initiating the timer
function time(){

    // Process the total seconds from the string of digit in the input field with the calculation
    var timerstringCopy="00000"+timerstring;
    timerseconds=parseInt(timerstringCopy.slice(-2))+parseInt(timerstringCopy.slice(-4,-2))*60+parseInt(timerstringCopy.slice(-6,-4))*3600;

    // Call the timeflow function
    timerflow();

    // Call the alarm function after the total seconds 
    timeout=setTimeout(alarm,timerseconds*1000);
}

// Function for starting the timer
function timerStart(){

    // Change the style of certain elements and disable the input field
    document.getElementById("timerinput").disabled=true;
    document.getElementById("timertime").style.color="black";
    document.getElementById("inputwrapper").style.cursor="default";
    document.getElementById("timerstart").style.display="none";
    document.getElementById("timerstop").style.display="block";
    document.getElementById("alarm").style.filter="invert(0)";

    // Initiate the timer
    time();
}

// Function for pausing the timer
function timerPause(){
    
    // Change the style of certain elements and enable the input field
    document.getElementById("timerinput").disabled=false;
    document.getElementById("timerinput").style.cursor="auto";
    document.getElementById("inputwrapper").style.cursor="text";
    document.getElementById("timerstop").style.display="none";
    document.getElementById("resume").style.display="block";
    document.getElementById("alarm").style.filter="invert(0.74)";

    // Stop the timeout of alarm and interval of timeflow 
    clearTimeout(timeout);
    clearInterval(timeflow);
}

// Function for resuming the timer
function timerResume(){

    // Change the style of certain elements and disable the input field
    document.getElementById("timerinput").disabled=true;
    document.getElementById("inputwrapper").style.cursor="default";
    document.getElementById("resume").style.display="none";
    document.getElementById("timerstop").style.display="block";
    document.getElementById("alarm").style.filter="invert(0)";

    // Initiate the timer to resume the timer
    time();
}

// Function for cancel the timer
function timerCancel(){

    // Change the style of certain elements and enable the input field as well as empty the field. Also, disable the start button.
    document.getElementById("timerinput").disabled=false;
    document.getElementById("inputwrapper").style.cursor="text";
    document.getElementById("timerinput").value="";
    document.getElementById("timertime").style.color="rgb(190,190,190)";
    document.getElementById("timerstart").style.display="block";
    document.getElementById("timerstart").disabled=true;
    document.getElementById("timerstart").style.backgroundColor="rgba(103,206,103,0.3)";
    document.getElementById("cancel").style.display="block";
    document.getElementById("timerstop").style.display="none";
    document.getElementById("resume").style.display="none";
    document.getElementById("stop").style.display="none";
    document.getElementById("alarm").style.filter="invert(0.74)";

    // Stop the timeout of alarm and the timeflow 
    clearInterval(timeout);
    clearInterval(timeflow);

    // Reset the string of values in input field
    timerstring="";

    // Reset all the digit on the page to 0
    var timerdigit=document.getElementsByClassName("timerdigit");
    for(var digit of timerdigit){
        digit.innerHTML=0;
    }
}

// Function for stopping an alarm
function timerStop(){

    // Stop the alarm sound ,flash, and the timeflow
    clearInterval(ringScreen);
    clearInterval(ringSound);

    // Pause and reset the sound file of the alarm
    document.getElementById("radar").pause();
    document.getElementById("radar").currentTime=0;

    // Reset the background to the original color
    document.getElementById("clockBG").style.backgroundColor="rgb(235,235,235)";

    // Call the cancelling function
    timerCancel();
}