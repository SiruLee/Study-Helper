// Declare the global variables to save the values and count the number of item.
var inputData=[];
var count=0;

// Function for adding a new item
function add(){

    // Increase the number of items by 1
    count++;

    // Copy and store the previous values of input fields of every item.
    copyData();

    // Initiate a variable with a format of an item with the id of number
    let output="<div class='item' id="+count+" style='opacity:0'>" +
        "<div class='title'>"+
        "<input class='titleInput' placeholder='New Item'>"+
        "</div>"+
        "<input type='checkbox' value="+count+" name='check' class='checkbox' onclick='checkedColor()'>"+
        "<div class='description'>"+
        " <textarea class='descriptionInput' placeholder='Memo' rows='8'></textarea>"+
        "</div>"+
        "</div>";

    // Add the preformatted string to HTML
    document.getElementById("listContainer").innerHTML+=output;

    // Transition effect of opacity
    setTimeout(function(){
        document.getElementById(count).style.opacity="1";
    }, 0);

    // Overwrite the previous data
    overwrite();
}


// Function for deleting an item
function del(){

    // Using querySelector, get all checked items
    let checkbox=document.querySelectorAll('input[name="check"]:checked');

    // Use a loop to iterate the checked items
    for (let checked of checkbox){

        // Change the style of checked items to make them hidden
        document.getElementById(checked.value).style.visibility="hidden";
        document.getElementById(checked.value).style.opacity="0";
        document.getElementById(checked.value).style.width="0px";
        document.getElementById(checked.value).style.margin="0";
    }
}


// Function for copy input values
function copyData(){

    // Empty the array of data
    inputData=[];

    // Declare variables for elements in HTML
    let titleData=document.getElementsByClassName("titleInput");
    let descriptionData=document.getElementsByClassName("descriptionInput");
    let checkboxData=document.getElementsByClassName("checkbox");

    // For all the items, populate the data array with an subarray of the values of title, description, and checkbox.
    for (let i=0; i<count; i++){
        inputData.push([titleData[i].value, descriptionData[i].value, checkboxData[i].checked]);
    }
}

// Function for overwrite saved values
function overwrite(){

    // Declare variables for elements in HTML
    let titleData=document.getElementsByClassName("titleInput");
    let descriptionData=document.getElementsByClassName("descriptionInput");
    let checkboxData=document.getElementsByClassName("checkbox");

    // For all the items, overwrite the values on the input fields
    for (let i=0; i<count; i++){
        titleData[i].value=inputData[i][0];
        descriptionData[i].value=inputData[i][1];
        checkboxData[i].checked=inputData[i][2];
    }
}

// Function for darken the check items
function checkedColor(){

    // Declare a variable for elements of checkboxes
    let checkboxes=document.getElementsByClassName("checkbox");

    // For all the checkboxes,
    for (let i=0; i<checkboxes.length; i++){

        // If the checkbox is checked, darken the corresponding items
        if(checkboxes[i].checked==true){
            document.getElementById(checkboxes[i].value).style.filter="brightness(0.7)";
        }

        // Else, set the brightness as original.
        else{
            document.getElementById(checkboxes[i].value).style.filter="brightness(1)";
        }
    }
}

// Function for undo the delete function
function undo(){

    // For all the items, change the style of them to the original state.
    for (let i=0;i<=count;i++){
        document.getElementById(i).style.visibility="visible";
        document.getElementById(i).style.width="300px";
        document.getElementById(i).style.margin="7px 20px";
        setTimeout(function(){
                document.getElementById(i).style.opacity="1";
        }, 500);
    }
}

// Function for checking all items
function checkAll(bool){

    // Declare a variable for elements of checkboxes
    let checkboxes=document.getElementsByClassName("checkbox");

    // For all the checkboxes, check or uncheck them depending on the parameter.
    for (let i=0; i<checkboxes.length; i++){
        checkboxes[i].checked=bool;
    }

    // Change the brightness of the checked items
    checkedColor();

    // If the parameter is false, undo the delete function
    if(!bool){
        undo();
    }
}


// Function for clear the list
function clearAll(){

    // For all the items, use a transition effect of opacity to make them disappear
    for (let i=0; i<=count; i++){
        document.getElementById(i).style.opacity="0";
    }

    // After they disappear, empty the HTML of the list
    setTimeout(function(){
        document.getElementById("listContainer").innerHTML="";
    },300);

    // Set the index of the last item as -1 meaning there is no item
    count=-1;
}
