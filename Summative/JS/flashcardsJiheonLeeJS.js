// Declare parallel arrays to store questions and answers for i-th card
const questions=[];
const answers=[];

// Initiate the index of the current card as -1 (meaning there is no card)
var curr_card=-1;

// Initiate the flip identifier as false (meaning a card is showing its quesition)
var flipId=false;

// Initiate the total number of card as 0
var length=0;

// Function for adding a new card
function add(){

    // Transition effects of opacity of the element used for adding a new card
    setTimeout(function(){
        document.getElementById("adding").style.opacity="1";
        document.getElementById("dim").style.opacity="0.5";
    }, 0);

    // Change the style of desired elements
    document.getElementById("adding").style.display="block";
    document.getElementById("dim").style.display="block";
    document.getElementById("submit").style.backgroundColor="rgba(76,139,245,0.3)"

    // Disable the submit button
    document.getElementById("submit").disabled=true;
}

// Function for closing the element used for adding a new card
function closeWin(){

    // Change the style of desired elements
    document.getElementById("adding").style.opacity="0";
    document.getElementById("dim").style.opacity="0";

    // Transition effects
    setTimeout(function(){
        document.getElementById("dim").style.display="none";
        document.getElementById("adding").style.display="none";
    }, 300);

    // Reset the input value as blank
    document.getElementById("questionInput").value="";
    document.getElementById("answerInput").value="";
}

// Function called when a value for a new card is entered
function inputChange(){

    // Get the value of each input field
    let question=document.getElementById("questionInput").value;
    let answer=document.getElementById("answerInput").value;

    // If both input fields are not empty, enable the submit button
    if (question.length>0 && answer.length>0){
        document.getElementById("submit").style.backgroundColor="";
        document.getElementById("submit").disabled=false;
    }

    // Else, disable the submit button
    else{
        document.getElementById("submit").style.backgroundColor="rgba(76,139,245,0.3)"
        document.getElementById("submit").disabled=true;
    }
}

// Function for submission of a new card
function submit(){

    // Get the values of a question and an answer and push to the corresponding arrays
    let question=document.getElementById("questionInput").value;
    questions.push(question);
    let answer=document.getElementById("answerInput").value;
    answers.push(answer);

    // Increase the total number of cards by 1
    length++;

    // Set the current card as the last card, which is the newly added card
    curr_card=length-1;

    // Display the card
    document.getElementById("display").style.display="block";

    // Write the question of the current card
    document.getElementById("cardContent").innerHTML=questions[curr_card];

    // Change the number of the current card and the total number of cards
    document.getElementById("curr_page").innerHTML=curr_card+1;
    document.getElementById("total_page").innerHTML=length;

    // Initiate the flip identifier as false (meaning a card is showing its quesition)
    flipId=false;

    // Change the style of required elements.
    document.getElementById("display").style.backgroundColor="#FFFFFF";
    document.getElementById("cardContent").style.color="black";
    document.getElementById("adding").style.opacity="0";
    document.getElementById("dim").style.opacity="0";

    // Transition effects
    setTimeout(function(){
        document.getElementById("dim").style.display="none";
        document.getElementById("adding").style.display="none";
    }, 300);

    // Reset the input fields as blank and disable the submit button.
    document.getElementById("questionInput").value="";
    document.getElementById("answerInput").value="";
    document.getElementById("submit").style.backgroundColor="rgba(76,139,245,0.3)"
    document.getElementById("submit").disabled=true;

}

// Declare an array of emojis that will displayed on the page when there is no card
const emojis=["╰(*°▽°*)╯","(●'◡'●)","(._ .`)","(• _ •)","(⊙_⊙;)","(ˉ﹃ˉ)"];

// The firstly displayed emoji is the first item in the emoji array
var prev_emojiSelector=0;

// Function for deleting a card
function del(){

    // Only execute the funtion when the total number of cards is greater than 0
    if(length>0){

        // Delete the question and the answer of the current card.
        questions.splice(curr_card,1);
        answers.splice(curr_card,1);

        // If the current card is the last card, move to the previous card
        if(curr_card==length-1){
            curr_card--;
        }

        // Decrease the total number of cards by 1
        length--;

        // If there is no card left
        if(length==0){

            // Choose the emoji randomly, which is not the same one with the previous emoji.
            let emojiSelector;
            do{
                emojiSelector=Math.floor(Math.random()*6);
            }while(emojiSelector==prev_emojiSelector);

            // Display the emoji and hide a card.
            document.getElementById("emoji").innerHTML=emojis[emojiSelector];
            document.getElementById("display").style.display="none";
            prev_emojiSelector=emojiSelector;
        }

        // If there is a card left
        else{
            
            // Initiate the flip identifier as false (meaning a card is showing its quesition)
            flipId=false;

            // Change the style of required elements
            document.getElementById("display").style.backgroundColor="#FFFFFF";
            document.getElementById("cardContent").style.color="black";

            // Display the question of current card.
            document.getElementById("cardContent").innerHTML=questions[curr_card];
        }

        // Change the page numbers
        document.getElementById("total_page").innerHTML=length;
        document.getElementById("curr_page").innerHTML=curr_card+1;
    }
}

// Function for moving to the next card
function next(){

    // Only execute the funtion when the total number of cards is greater than 0
    if(length>0){

        // If the current card is the last card, move to the first card
        if(curr_card==length-1){
            curr_card=0;
        }

        // Else, move to the next card
        else{
            curr_card++;
        }
        
        // Initiate the flip identifier as false (meaning a card is showing its quesition)
        flipId=false;

        // Change the style of required elements with transition effects.
        document.getElementById("cardContent").style.opacity="0";
        document.getElementById("display").style.backgroundColor="#FFFFFF";

        // Change the page number
        document.getElementById("curr_page").innerHTML=curr_card+1;

        // Transition effect
        setTimeout(function(){
            document.getElementById("cardContent").style.opacity="1";
            document.getElementById("cardContent").innerHTML=questions[curr_card];
            document.getElementById("cardContent").style.color="black";
        }, 300);
    }
}

// Function for moving to the previous card
function previous(){

    // Only execute the funtion when the total number of cards is greater than 0
    if(length>0){

        // If the current card is the last card, move to the last card
        if(curr_card==0){
            curr_card=length-1;
        }

        // Else, move to the previous card
        else{
            curr_card--;
        }

        // Initiate the flip identifier as false (meaning a card is showing its quesition)
        flipId=false;

        // Change the style of required elements with transition effects.
        document.getElementById("cardContent").style.opacity="0";
        document.getElementById("display").style.backgroundColor="#FFFFFF";

        // Change the page number
        document.getElementById("curr_page").innerHTML=curr_card+1;

        // Transition effect
        setTimeout(function(){
            document.getElementById("cardContent").style.opacity="1";
            document.getElementById("cardContent").innerHTML=questions[curr_card];
            document.getElementById("cardContent").style.color="black";
        }, 300);
    }
}

// Function for fliping a card
function flip(){

    // Prevent clicks while the transitions.
    document.getElementById('display').style.pointerEvents = 'none';

    // Chagne the style of required elements with trasition effects
    setTimeout(function(){

        // Make the texts hidden
        document.getElementById("cardContent").style.opacity="0";

        // If the card was on the question side, change the background color for the answer side.
        if (!flipId){
            document.getElementById("display").style.backgroundColor="#333333";
        }

        // Else, change the background color for the question side.
        else{
            document.getElementById("display").style.backgroundColor="#FFFFFF";
        }
    }, 0);

    setTimeout(function(){

        // If the card was on the question side, change the text color for the answer and write the answer.
        if (!flipId){
            document.getElementById("cardContent").style.color="white";
            document.getElementById("cardContent").innerHTML=answers[curr_card];
            flipId=!flipId;
        }

        // Else, change the text color for the question and write the question.
        else{
            document.getElementById("cardContent").style.color="black";
            document.getElementById("cardContent").innerHTML=questions[curr_card];
            flipId=!flipId;
        }
        
    }, 300);

    // Display the texts.
    setTimeout(function(){
        document.getElementById("cardContent").style.opacity="1";
    }, 300);

    // Enable clicks after all the transitions
    setTimeout(function(){
        document.getElementById('display').style.pointerEvents = 'auto';
    }, 600);
}