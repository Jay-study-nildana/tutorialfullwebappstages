
//this function is primarily designed to pick up the input and then send it to the api server
//and get the response.
//for now, it mostly pushes messages to the console.

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

    var logcloser="----leaving pagehasloaded----";
    console.log(logcloser);
}


async function registration()
{   
    var logopener="----entering registration----";
    console.log(logopener);

    //collect the email address and password.
    var emailaddress = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;

    //the below one is primarily to do some dev testing
    //var response = userAction();
    var response2 = await registerNewAccount(emailaddress,password,password);

    var logcloser="----leaving registration----";
    console.log(logcloser);
}

//this creates a user with some default values.
const userAction = async () => 
{
    var logopener="----entering userAction----";
    console.log(logopener);
    //build POST body for the registration
    // var POSTbody = {
    //     Email: "jay@ProjectCRUD30.com",
    //     Password: "Password$321",
    //     ConfirmPassword: "Password$321"
    //   }
    // //var POSTbodyinJSON = JSON.stringify(POSTbody);
    // var POSTbodyinJSON = {
    //     "Email": "jay@ProjectCRUD2.com",
    //     "Password": "Password$321",
    //     "ConfirmPassword": "Password$321"
    //   }

      var POSTbody = new Object();
      POSTbody.Email = "jay@ProjectCRUD29a.com";
      POSTbody.Password = "Password$321";
      POSTbody.ConfirmPassword = "Password$321";

      var POSTbodyinJSON = JSON.stringify(POSTbody);

    //http://localhost:64674/api/Account/Register
    //http://projectcrudwebapiserver.azurewebsites.net/api/Account/Register
    const response = await fetch('http://projectcrudwebapiserver.azurewebsites.net/api/Account/Register',
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
        //bad request response. 
        var errormessagefromapiserver = response.json();
        //above I am getting what is called as a promise.
        errormessagefromapiserver.then(
            function(result)
            {
                //this gives the javascript object
                //console.log(result);  
                //this gives the actual message.
                console.log(result.Message);
                //console.log(result.toString());
            },
            function(error)
            {
                console.log(error);
            }

        );
        //these things did not work.
        //var errormessagefromapiserver = response.json();
        // var temp2 = errormessagefromapiserver.Message;
        //the reponse is a promise, noto json.
        // var temp = JSON.parse(errormessagefromapiserver);
        // console.log(errormessagefromapiserver.value.Message);
    }
    else if(response.status == 200)
    {
        var errormessagefromapiserver = "all went good." + POSTbody.Email + " account successfully created";
        console.log(errormessagefromapiserver);
    }
    else
    {
        var errormessagefromapiserver = "unknown error - status code - " + response.status + "contact API server developer";
        console.log(errormessagefromapiserver);
    }
    // const myJson = await response.json(); //extract JSON from the http response
    // console.log(myJson);
    var logcloser="----leaving userAction----";
    console.log(logcloser);
}

//this creates a user with some entered values.
//check userAction for comments and more details
//borrowed from userActionWithEnteredValues in commonfunctions.js
const registerNewAccount = async (email,password1,password2) => 
{
    var logopener="----entering registerNewAccount----";
    console.log(logopener);

    //show status message that we have begun API processing.     

    APIBeingProcessed();

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
                console.log("registerNewAccount" + result.Message);
                returnmessage = result.Message;
                var returnobj = new MessageStatusCode(returnmessage,response.status);
                console.log("registerNewAccount - returnobj" + returnobj.messaget + returnobj.statuscodet);                            
                APICallFailedEmailAlreadyTakenIssue();
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
        RegistrationSuccessfull();
        var errormessagefromapiserver = "all went good. " + POSTbody.Email + " account successfully created";
        console.log("registerNewAccount" + errormessagefromapiserver);
        returnmessage = errormessagefromapiserver;
        var returnobj = new MessageStatusCode(returnmessage,response.status);
        console.log("registerNewAccount - returnobj" + returnobj.messaget + returnobj.statuscodet);
        clearouttheinputboxes();        
    }
    else
    {
        var errormessagefromapiserver = "unknown error - status code - " + response.status + "contact API server developer";
        console.log("registerNewAccount" + errormessagefromapiserver);
        returnmessage = errormessagefromapiserver;
        var returnobj = new MessageStatusCode(returnmessage,response.status);
        console.log("registerNewAccount - returnobj" + returnobj.messaget + returnobj.statuscodet);    
        APICallFailed();
        clearouttheinputboxes();        
    }
    if(returnmessage == "The request is invalid.")
    {
        //this means, we have an error that is not caught by our current coding.
        returnmessage = "check for password length or try again";
        var returnobj = new MessageStatusCode(returnmessage,response.status);
        console.log("registerNewAccount - returnobj" + returnobj.messaget + returnobj.statuscodet);
        APICallFailed();
        clearouttheinputboxes();        
    }

    var logcloser="----leaving registerNewAccount----";
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

function APICallFailedEmailAlreadyTakenIssue()
{
    var logopener="----entering APICallFailedEmailAlreadyTakenIssue----";
    console.log(logopener);

    var loaddisplay = document.getElementById("apistatusmessage");
    var messageafterloading = "Looks like this email address is already registered. Try with another email address.";
    loaddisplay.innerText = messageafterloading;

    var logcloser="----leaving APICallFailedEmailAlreadyTakenIssue----";
    console.log(logcloser);  
    DefaultMessage();   
}

function RegistrationSuccessfull()
{
    var logopener="----entering RegistrationSuccessfull----";
    console.log(logopener);

    var loaddisplay = document.getElementById("registrationstatusmessage");
    var messageafterloading = "Registration Successfull. Continue and Sign In. Or, Register another account";
    loaddisplay.innerText = messageafterloading;

    var logcloser="----leaving RegistrationSuccessfull----";
    console.log(logcloser);  
    DefaultMessage();   
}

