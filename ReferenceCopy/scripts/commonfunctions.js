//IMPORTANT NOTE 
//this was one of the original files. DO NOT DELETE ANYTHING FROM THIS FILE
//NOT EVEN COMMENTS
//DONT CLEAN THIS FILE UP

//this file contains the common functions used by other files. 

//this creates a user with some entered values.
//check userAction for comments and more details

//TODO - check the dot net core api server
//it has a CRUD with a simple test model. I want that to show up here as well.
const userActionWithEnteredValues = async (email,password1,password2) => 
{
    var logopener="----entering userActionWithEnteredValues----";
    console.log(logopener);

    var divinside = 
    document.getElementById("statusmessageafterAPIcall");
    divinside.innerText = "loading...please wait";    

    var POSTbody = new Object();
    POSTbody.Email = email;
    POSTbody.Password = password1;
    POSTbody.ConfirmPassword = password2;
    var returnmessage = "";

    var POSTbodyinJSON = JSON.stringify(POSTbody);

    var baseUrl = returnCurrentBaseURL();
    var endPoint = "api/Account/Register";
    var fullUrl = baseUrl + endPoint;

    const response = await fetch(fullUrl,
        {
            method: 'POST',
            body : POSTbodyinJSON,
            headers:
            {
                'Content-Type': 'application/json'
            }
        }
        );
    
    if(response.status == 400)
    {
        var errormessagefromapiserver = response.json();
        errormessagefromapiserver.then(
            function(result)
            {
                console.log("userActionWithEnteredValues" + result.Message);
                returnmessage = result.Message;
                var returnobj = new MessageStatusCode(returnmessage,response.status);
                console.log("userActionWithEnteredValues - returnobj" + returnobj.messaget + returnobj.statuscodet);                            
                updatethescreen(returnobj);
            },
            function(error)
            {
                console.log(error);
                returnmessage = result.Message;
            }

        );
    }
    else if(response.status == 200)
    {
        var errormessagefromapiserver = "all went good. " + POSTbody.Email + " account successfully created";
        console.log("userActionWithEnteredValues" + errormessagefromapiserver);
        returnmessage = errormessagefromapiserver;
        var returnobj = new MessageStatusCode(returnmessage,response.status);
        console.log("userActionWithEnteredValues - returnobj" + returnobj.messaget + returnobj.statuscodet);
        updatethescreen(returnobj);
    }
    else
    {
        var errormessagefromapiserver = "unknown error - status code - " + response.status + "contact API server developer";
        console.log("userActionWithEnteredValues" + errormessagefromapiserver);
        returnmessage = errormessagefromapiserver;
        var returnobj = new MessageStatusCode(returnmessage,response.status);
        console.log("userActionWithEnteredValues - returnobj" + returnobj.messaget + returnobj.statuscodet);    
        updatethescreen(returnobj);
    }
    if(returnmessage == "The request is invalid.")
    {
        //this means, we have an error that is not caught by our current coding.
        returnmessage = "check for password length or try again";
        var returnobj = new MessageStatusCode(returnmessage,response.status);
        console.log("userActionWithEnteredValues - returnobj" + returnobj.messaget + returnobj.statuscodet);
        updatethescreen(returnobj);
    }
    var logcloser="----leaving userActionWithEnteredValues----";
    console.log(logcloser);
    //return returnmessage;

    // var returnobj = new MessageStatusCode(returnmessage,response.status);
    // console.log("userActionWithEnteredValues - returnobj" + returnobj.messaget + returnobj.statuscodet);

    //i thought I will return this value here.
    //but, when i return, the values dissapear. it probably has to do with the API call 
    //being async. so calling the next effect from here itself. 

    //updatethescreen(returnobj)
    //return returnobj;
}

//this is to update the display.
function updatethescreen(result)
{

    var logopener="----entering updatethescreen----";
    console.log(logopener);    

    if(result.statuscodet == 200)
    {
        // //update the diplay with success stuff.
        // //show the success message
        // var divinside = 
        // document.getElementById("statusmessageafterAPIcall");
        // divinside.innerText = result.statuscodet + " " + result.messaget;
        // divinside.style.display = 'block';
        // //show the tap below text display.
        // var divtaphomebelow = 
        // document.getElementById("taphomebelow");
        // divtaphomebelow.style.display = 'block';        
        
        //hide the login boxes.
        var divinputboxforemailandpassword = 
        document.getElementById("inputboxforemailandpassword"); 
        divinputboxforemailandpassword.style.display = 'none';
    }
    else
    {
        //update the display with failure stuff
        var divinside = 
        document.getElementById("statusmessageafterAPIcall");
        divinside.innerText = result.statuscodet + result.messaget;
        divinside.style.display = 'block';
    }

    var logcloser="----leaving updatethescreen----";
    console.log(logcloser);

}

function MessageStatusCode(messaget,statuscodet)
{

    var logopener="----entering MessageStatusCode----";
    console.log(logopener);

    this.messaget = messaget;
    this.statuscodet = statuscodet;

    var logcloser="----leaving MessageStatusCode----";
    console.log(logcloser);    
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

function storeToken(tokentostore)
{

    var logopener="----entering storeToken----";
    console.log(logopener);
    //put this in local storage.
    //may be we should put a error message
    var setKey = "ProjectWTToken";
    localStorage.setItem(setKey,tokentostore);

    var logcloser="----leaving storeToken----";
    console.log(logcloser);
}

function getToken()
{

    var logopener="----entering getToken----";
    console.log(logopener);

    var setKey = "ProjectWTToken";
    var notokenfoundmessage = "getToken - "+ "no token stored. you have to login";
    var tokentoreturn = localStorage.getItem(setKey);
    if(tokentoreturn == null)
    {
        console.log(notokenfoundmessage);
    }

    var logcloser="----leaving getToken----";
    console.log(logcloser);
    return tokentoreturn;
}

async function GenericAPICallCode()
{
    var logopener="----entering GetResumeSummary----";
    console.log(logopener);

    // var POSTbody = new Object();
    // POSTbody.username = email;
    // POSTbody.password = password1;
    // POSTbody.grant_type = 'password';
    // var returnmessage = "";

    // var POSTbodyinJSON = JSON.stringify(POSTbody);

    // var POSTbodyinPlainText = "userName=" + encodeURIComponent(email) +
    // "&password=" + encodeURIComponent(password1) +
    // "&grant_type=password";  

    //'Content-Type': 'application/x-www-form-urlencoded'
    //'Content-Type': 'application/json'

    // var inputlastname = document.getElementById("inputlastname").value;

    // var entirenamep = document.getElementById("entirename");
    // var fullname = result.FirstName + " " + result.MiddleName + " " + result.LastName;
    // entirenamep.innerText = fullname;    

    var baseUrl = returnCurrentBaseURL();
    var endPoint = "api/UserandResume/GetResumeSummary";
    var fullUrl = baseUrl + endPoint;
    var getCurrentToken = getToken();

    const response = await fetch(fullUrl,
        {
            method: 'GET',
            // body: body
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+getCurrentToken
            }
        }
        );    

    if(response.status == 400)
    {
        console.log("unknown error - " + response.status);
    }        
    else if(response.status == 200)
    {
        var responsejson = response.json();
        responsejson.then(
            function(result)
            {
                
            },
            function(error)
            {
                console.log(error);
            }
        );
    }
    else
    {
        console.log("unknown error - " + response.status);
    }

    var logcloser="----leaving GetResumeSummary----";
    console.log(logcloser);
}

function checkforsigninpageload()
{
    var logopener="----entering checkforsigninpageload----";
    console.log(logopener);
    var getCurrentToken = getToken();

    if(getCurrentToken!=null)
    {
        console.log("You are already signed in");
        // //send token and try to get the basic resume information.
        // //hide the login page.
        // // hidethelogin();
        // // GetResumeSummary();
    }
    else
    {
        console.log("You need to sign in.");
        //lets auto redirect to the sign page.
        //in the same directory, I want to find the view signin.html 
        window.location.href = 'signin.html'; 

    }

    var logcloser="----leaving checkforsigninpageload----";
    console.log(logcloser);
}

// function hidetheloading()
// {
//     var logopener="----entering hidetheloading----";
//     console.log(logopener);

//     //hide or show things as per requirement.
//     var divtohide = document.getElementById("loadinganimation");
//     divtohide.style.display = 'none';

//     var logcloser="----leaving hidetheloading----";
//     console.log(logcloser); 
// }

// function showtheloading()
// {
//     var logopener="----entering showtheloading----";
//     console.log(logopener);

//     var divtohide = document.getElementById("loadinganimation");
//     divtohide.style.display = 'block';

//     var logcloser="----leaving showtheloading----";
//     console.log(logcloser); 
// }

function loadresumepage()
{
    var logopener="----entering loadresumepage----";
    console.log(logopener);

    //load to the main resume display.
    window.location.href = 'fullresume.html'; 

    var logcloser="----leaving loadresumepage----";
    console.log(logcloser);     
}

function loadthemeresumepage()
{
    var logopener="----entering loadthemeresumepage----";
    console.log(logopener);

    //load to the main resume display.
    window.location.href = "themeresume/currentresume.html"; 

    var logcloser="----leaving loadthemeresumepage----";
    console.log(logcloser);     
}

function editresumepage()
{
    var logopener="----entering editresumepage----";
    console.log(logopener);

    //load to the main resume display.
    window.location.href = 'editresume.html'; 

    var logcloser="----leaving editresumepage----";
    console.log(logcloser);     
}

function signinpage()
{
    var logopener="----entering signinpage----";
    console.log(logopener);

    //load to the main resume display.
    window.location.href = 'signin.html'; 

    var logcloser="----leaving signinpage----";
    console.log(logcloser); 
}

function signoutcurrentresume()
{
    //we need to kill the token.

    //then load the sign in page.

    var logopener="----entering signoutcurrentresume----";
    console.log(logopener);

    removeToken();

    //load to the main resume display.
    window.location.href = '../signin.html'; 

    var logcloser="----leaving signoutcurrentresume----";
    console.log(logcloser);     
}

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

function TokenCheckPassed()
{

    var logopener="----entering TokenCheckPassed----";
    console.log(logopener);

    var loaddisplay = document.getElementById("apistatusmessage");
    var messageafterloading = "you are already logged in. all endpoints below will work"
    loaddisplay.innerText = messageafterloading;

    var logcloser="----leaving TokenCheckPassed----";
    console.log(logcloser);    
    DefaultMessage();
}

function TokenCheckFailed()
{

    var logopener="----entering TokenCheckFailed----";
    console.log(logopener);

    var loaddisplay = document.getElementById("apistatusmessage");
    var messageafterloading = "you are not logged in. only non-token endpoints will work. Log in by visiting the home page"
    loaddisplay.innerText = messageafterloading;

    var logcloser="----leaving TokenCheckFailed----";
    console.log(logcloser); 
    DefaultMessage();   
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

function dummycommonfunctions1()
{
    var logopener="----entering dummycommonfunctions1----";
    console.log(logopener);

    var logcloser="----leaving dummycommonfunctions1----";
    console.log(logcloser);
}

//CRUD related token stuff checking. 

function TokenStuffCRUD()
{
    var logopener="----entering TokenStuffCRUD----";
    console.log(logopener);

    //check if local storage has a token.
    var getCurrentToken = getToken();

    if(getCurrentToken!=null)
    {
        console.log("You are already signed in");
        //send token and try to get the basic resume information.
        //hide the login page.
        TokenCheckPassed();
        //logged in so, show the education form. 
        hideorshowCRUDDIV(1);

    }
    else
    {
        console.log("You need to sign in below");
        TokenCheckFailed();
        //not logged in so, hide the education form. 
        hideorshowCRUDDIV(0);        
    }    
    
    var logcloser="----leaving TokenStuffCRUD----";
    console.log(logcloser);    
}

function hideorshowCRUDDIV(flagnumber)
{
    var logopener="----entering hideorshowCRUDDIV----";
    console.log(logopener);

    var CRUDDIV = 
    document.getElementById("educationdisplay");     

    var CRUDNOTLOGGEDMESSAGE = 
    document.getElementById("notsignedin");         

    if(flagnumber == 1)
    {
        //show the education form. 
        CRUDDIV.style.display = 'block';                
        //hide the not signed in message
        CRUDNOTLOGGEDMESSAGE.style.display = 'none';        
    }
    else
    {
        //hide the education form. 
        CRUDDIV.style.display = 'none';                
        //show the not signed in message
        CRUDNOTLOGGEDMESSAGE.style.display = 'block';        

    }

    var logcloser="----leaving hideorshowCRUDDIV----";
    console.log(logcloser);
}