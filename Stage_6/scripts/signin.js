

function pagehasloaded()
{
    var logopener="----entering pagehasloaded----";
    console.log(logopener);

    //first setup some UI elements
    setuptitles();   
    
    DefaultMessage();

    // hidetheloading();
    // var divtaphomebelow = 
    // document.getElementById("taphomebelow");
    // divtaphomebelow.style.display = 'none';
   
    //check if local storage has a token.
    var getCurrentToken = getToken();

    if(getCurrentToken!=null)
    {
        console.log("You are already signed in");
        //send token and try to get the basic resume information.
        //hide the login page.
        // hidethelogin();
        // GetResumeSummary();\
        hideorshowsigninsignoutbutton(1);
    }
    else
    {
        hideorshowsigninsignoutbutton(2);
        console.log("You need to sign in below");
    }

    var logcloser="----leaving pagehasloaded----";
    console.log(logcloser);
}


async function signin()
{   
    var logopener="----entering signin----";
    console.log(logopener);

    //collect the email address and password.
    var emailaddress = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;

    //the below one is primarily to do some dev testing
    //var response = userAction();
    var response2 = await signInWithEnteredValues(emailaddress,password);

    var logcloser="----leaving signin----";
    console.log(logcloser);
}

function showUserResumeSummary(result)
{
    var logopener="----entering showUserResumeSummary----";
    console.log(logopener);

    console.log(result);

    //lets update the UI.

    var entirenamep = document.getElementById("entirename");
    var fullname = result.FirstName + " " + result.MiddleName + " " + result.LastName;
    entirenamep.innerText = fullname;

    var primaryemailp = document.getElementById("primaryemail");
    primaryemailp.innerText = result.Email;
    var secondaryemailp = document.getElementById("secondaryemail");
    secondaryemailp.innerText = result.UserEmail;

    var logcloser="----leaving showUserResumeSummary----";
    console.log(logcloser);    
}

async function updatename()
{
    var logopener="----entering updatename----";
    console.log(logopener);

    var inputfirstname = document.getElementById("inputfirstname").value;
    var inputmiddlename = document.getElementById("inputmiddlename").value;
    var inputlastname = document.getElementById("inputlastname").value;

    var POSTbody = new Object();
    POSTbody.FirstName = inputfirstname;
    POSTbody.MiddleName = inputmiddlename;
    POSTbody.LastName = inputlastname;

    var POSTbodyinJSON = JSON.stringify(POSTbody);

    // var POSTbodyinPlainText = "userName=" + encodeURIComponent(email) +
    // "&password=" + encodeURIComponent(password1) +
    // "&grant_type=password";  

    //'Content-Type': 'application/x-www-form-urlencoded'
    //'Content-Type': 'application/json'

    var baseUrl = returnCurrentBaseURL();
    var endPoint = "api/UserandResume/UpdateUserName";
    var fullUrl = baseUrl + endPoint;
    var getCurrentToken = getToken();

    const response = await fetch(fullUrl,
        {
            method: 'POST',
            body: POSTbodyinJSON,
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
                GetResumeSummary();

            },
            function(error)
            {
                console.log(error);
            }
        );
    }
    else
    {
        //some unknown error
    }

    var logcloser="----leaving updatename----";
    console.log(logcloser);
}

//TODO012  this endpoint does not exist right now.
async function updateemail()
{
    var logopener="----entering updateemail----";
    console.log(logopener);

    console.log("NOT YET IMPLEMENTED. ENDPOINT NEED TO BE BUILT");

    var inputsecondaryemail = document.getElementById("inputsecondaryemail").value;

    var POSTbody = new Object();
    POSTbody.FirstName = inputfirstname;
    POSTbody.MiddleName = inputmiddlename;
    POSTbody.LastName = inputlastname;

    var POSTbodyinJSON = JSON.stringify(POSTbody);

    // var POSTbodyinPlainText = "userName=" + encodeURIComponent(email) +
    // "&password=" + encodeURIComponent(password1) +
    // "&grant_type=password";  

    //'Content-Type': 'application/x-www-form-urlencoded'
    //'Content-Type': 'application/json'

    var baseUrl = returnCurrentBaseURL();
    //TODO012  this endpoint does not exist yet.
    var endPoint = "api/UserandResume/UpdateEmail";
    var fullUrl = baseUrl + endPoint;
    var getCurrentToken = getToken();

    const response = await fetch(fullUrl,
        {
            method: 'POST',
            body: POSTbodyinJSON,
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
                GetResumeSummary();

            },
            function(error)
            {
                console.log(error);
            }
        );
    }
    else
    {
        //some unknown error
    }

    var logcloser="----leaving updateemail----";
    console.log(logcloser);
}

function removeToken()
{
    var logopener="----entering removeToken----";
    console.log(logopener);

    //put this in local storage.
    //may be we should put a error message
    var setKey = "ProjectWTToken";
    //localStorage.setItem(setKey,null);
    //localStorage.clear(setKey);
    localStorage.removeItem(setKey);    

    var logcloser="----leaving removeToken----";
    console.log(logcloser);    
}

//we need to kill the token.
//then load the sign in options.

function signout()
{
    var logopener="----entering signout----";
    console.log(logopener);

    removeToken();

    hideorshowsigninsignoutbutton(2);

    // //load to the main resume display.
    // window.location.href = 'signin.html'; 

    //show the login input boxes
    // showthelogin();

    var logcloser="----leaving signout----";
    console.log(logcloser);     
}

//check userActionWithEnteredValues for more comments and such
const signInWithEnteredValues = async (email,password1) => 
{
    var logopener="----entering signInWithEnteredValues----";
    console.log(logopener);

    //show status message that we have begun API processing. 

    APIBeingProcessed();

    // var POSTbody = new Object();
    // POSTbody.username = email;
    // POSTbody.password = password1;
    // POSTbody.grant_type = 'password';
    // var returnmessage = "";

    // var POSTbodyinJSON = JSON.stringify(POSTbody);

    var POSTbodyinPlainText = "userName=" + encodeURIComponent(email) +
    "&password=" + encodeURIComponent(password1) +
    "&grant_type=password";

    var baseUrl = returnCurrentBaseURL();
    var endPoint = "Token";
    var fullUrl = baseUrl + endPoint;

    const response = await fetch(fullUrl,
        {
            method: 'POST',
            body : POSTbodyinPlainText,
            headers:
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        );
    
    if(response.status == 400)
    {
        // hidetheloading();
        var errormessagefromapiserver = response.json();
        errormessagefromapiserver.then(
            function(result)
            {
                returnmessage = result.error_description;
                console.log("signInWithEnteredValues - Error 400 - " + returnmessage);            
                // var returnobj = new MessageStatusCode(returnmessage,response.status);
                // console.log("signInWithEnteredValues - returnobj - " + returnobj.messaget + returnobj.statuscodet);                            
                APICallFailedPasswordOrLoginIssue();
                clearouttheinputboxes();                
            },
            function(error)
            {
                console.log(error);
                returnmessage = result.Message;
                APICallFailed();
                clearouttheinputboxes();                
            }
        );
    }
    else if(response.status == 200)
    {
        APICallSuccess();
        // hidethelogin();
        hideorshowsigninsignoutbutton(1);
        var responsejson = response.json();
        responsejson.then(
            function(result)
            {
                console.log("access token - " + result.access_token + " userName - " + result.userName);
                // returnmessage = result.Message;
                // var returnobj = new MessageStatusCode("token obtained",response.status);
                //update the local storage with token.
                storeToken(result.access_token);
                // console.log("signInWithEnteredValues - returnobj" + returnobj.messaget + returnobj.statuscodet);                            
                // updatethescreen(returnobj);
                clearouttheinputboxes();                

            },
            function(error)
            {
                console.log(error);
                returnmessage = result.Message;
                APICallFailed();
                clearouttheinputboxes();                
            }
        );
    }
    else
    {
        APICallFailed();
        var errormessagefromapiserver = "unknown error - status code - " + response.status + "contact API server developer";
        console.log("signInWithEnteredValues - " + errormessagefromapiserver);
        returnmessage = errormessagefromapiserver;
        // var returnobj = new MessageStatusCode(returnmessage,response.status);
        // console.log("signInWithEnteredValues - returnobj" + returnobj.messaget + returnobj.statuscodet);    
        // updatethescreen(returnobj);
        clearouttheinputboxes();        
    }
    var logcloser="----leaving signInWithEnteredValues----";
    console.log(logcloser);
}

//here, based on the flag number we will decide what to show and what to hide
//I am sure there are better ways to do this but keeping it simple
//this will also hide or show the hey message that comes after logging in.
//1 means show signout and hey message
//2 means show signin and input boxes
function hideorshowsigninsignoutbutton(flagnumber)
{
    var logopener="----entering hideorshowsigninsignoutbutton----";
    console.log(logopener);

    if(flagnumber == 1)
    {
        //show signout and the hey message
        var buttonsignout = 
        document.getElementById("buttonsignout"); 
        buttonsignout.style.display = 'block';                

        var divtohide = document.getElementById("outboxforloginsuccess");
        divtohide.style.display = 'block';        

        //and hide signin and the sign in input boxes
        var buttonsignin = 
        document.getElementById("buttonsignin"); 
        buttonsignin.style.display = 'none';

        var divtohide = document.getElementById("inputboxforemailandpassword");
        divtohide.style.display = 'none';        

    }
    else
    {
        //show sign in and input boxes 
        var buttonsignin = 
        document.getElementById("buttonsignin"); 
        buttonsignin.style.display = 'block';        

        var divtohide = document.getElementById("inputboxforemailandpassword");
        divtohide.style.display = 'block';        
        
        //and hide sign out and the hey message
        var buttonsignout = 
        document.getElementById("buttonsignout"); 
        buttonsignout.style.display = 'none';        

        var divtohide = document.getElementById("outboxforloginsuccess");
        divtohide.style.display = 'none';        

    }

    var logcloser="----leaving hideorshowsigninsignoutbutton----";
    console.log(logcloser);
}

function clearouttheinputboxes()
{
    var logopener="----entering clearouttheinputboxes----";
    console.log(logopener);    

    //collect the email address and password.
    var emailaddress = document.getElementById("inputEmail");
    var password = document.getElementById("inputPassword");

    //we cannot use like this set attribute. 
    //we are setting value. 
    //check this for more details
    //https://codepen.io/jay-pancodu/pen/oNbVrVV
    //https://stackoverflow.com/questions/63085528/input-box-never-clears-but-works-fine-on-codepen

    // emailaddress.setAttribute('value', "");
    // password.setAttribute('value', "");

    emailaddress.value = "";
    password.value = "";

    var logcloser="----leaving clearouttheinputboxes----";
    console.log(logcloser);    
}

function APICallFailedPasswordOrLoginIssue()
{
    var logopener="----entering APICallFailedPasswordOrLoginIssue----";
    console.log(logopener);

    var loaddisplay = document.getElementById("apistatusmessage");
    var messageafterloading = "Looks like a password or login email address issue. Check and try again";
    loaddisplay.innerText = messageafterloading;

    var logcloser="----leaving APICallFailedPasswordOrLoginIssue----";
    console.log(logcloser);  
    DefaultMessage();   
}

// function hidethelogin()
// {
//     var logopener="----entering hidethelogin----";
//     console.log(logopener);

//     //hide or show things as per requirement.
//     var divtohide = document.getElementById("inputboxforemailandpassword");
//     divtohide.style.display = 'none';

//     var logcloser="----leaving hidethelogin----";
//     console.log(logcloser); 
// }

// function showthelogin()
// {
//     var logopener="----entering showthelogin----";
//     console.log(logopener);

//     var divtohide = document.getElementById("inputboxforemailandpassword");
//     divtohide.style.display = 'block';

//     var logcloser="----leaving showthelogin----";
//     console.log(logcloser); 
// }

