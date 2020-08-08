//Stage 1

function pagehasloadedcommonfunctions()
{
    var logopener="----entering pagehasloadedcommonfunctions----";
    console.log(logopener);

    //first setup some UI elements
    setuptitles();

    var logcloser="----leaving pagehasloadedcommonfunctions----";
    console.log(logcloser);
}

//This function will be called in all the HTML views
//we set the title once here, and it gets updated easily, in the entire web app
function setuptitles()
{
    var logopener="----entering setuptitles----";
    console.log(logopener);

    //get the title H1 tags
    var maintitleline1 = document.getElementById("maintitleline1");
    var maintitleline2 = document.getElementById("maintitleline2");

    //set them with desired values.
    let titleline1 = "bari basic tutorial demo app";
    let titleline2 = "built using HTML, CSS and JS plus Bootstrap only";

    maintitleline1.innerHTML = titleline1;
    maintitleline2.innerHTML = titleline2;

    var logcloser="----leaving setuptitles----";
    console.log(logcloser);
}

//Stage 2

function DefaultMessage()
{
    var logopener="----entering DefaultMessage----";
    console.log(logopener);

    var delayInMilliseconds = 3000; //1 second

    setTimeout(function() {
    //your code to be executed after 1 second
    var loaddisplay = document.getElementById("apistatusmessage");
    var messageafterloading = "waiting on you to do something. thank you."
    loaddisplay.innerText = messageafterloading;    

    }, delayInMilliseconds);

    var logcloser="----leaving DefaultMessage----";
    console.log(logcloser);      
}

function APIBeingProcessed()
{

    var logopener="----entering APIBeingProcessed----";
    console.log(logopener);

    var loaddisplay = document.getElementById("apistatusmessage");
    var messageafterloading = "still talking to the API server"
    loaddisplay.innerText = messageafterloading;

    var logcloser="----leaving APIBeingProcessed----";
    console.log(logcloser);  
    DefaultMessage();  
}

//this function will return the current URL
//add your OWN URLs and switch to the one you want to 
function returnCurrentBaseURL()
{

    var logopener="----entering returnCurrentBaseURL----";
    console.log(logopener);

    var hostUrl1 = "https://baribasicsapiserverjune21st2020.azurewebsites.net/";
    var hostUrl2 = "http://localhost:64674/";
    var currentUrl = hostUrl1;

    var logcloser="----leaving returnCurrentBaseURL----";
    console.log(logcloser);

    return currentUrl;   
}

function APICallSuccess()
{
    var logopener="----entering APICallSuccess----";
    console.log(logopener);

    var loaddisplay = document.getElementById("apistatusmessage");
    var messageafterloading = "API Call was a success. results updated"
    loaddisplay.innerText = messageafterloading;

    var logcloser="----leaving APICallSuccess----";
    console.log(logcloser);  
    DefaultMessage();   
}

function APICallFailed()
{
    var logopener="----entering APICallFailed----";
    console.log(logopener);

    var loaddisplay = document.getElementById("apistatusmessage");
    var messageafterloading = "API Call was a failure. try again or contact developer!"
    loaddisplay.innerText = messageafterloading;

    var logcloser="----leaving APICallFailed----";
    console.log(logcloser);  
    DefaultMessage();   
}