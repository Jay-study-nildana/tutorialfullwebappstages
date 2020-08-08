// TODO - it might be a good idea to add an option in the API server that will automatically generate temporary entries.

function pagehasloaded()
{
    var logopener="----entering pagehasloaded----";
    console.log(logopener);

    //first setup some UI elements
    setuptitles();   
    
    DefaultMessage();
    
    TokenStuff();

    var logcloser="----leaving pagehasloaded----";
    console.log(logcloser);
}

function TokenStuff()
{
    var logopener="----entering TokenStuff----";
    console.log(logopener);

    //check if local storage has a token.
    var getCurrentToken = getToken();

    if(getCurrentToken!=null)
    {
        console.log("You are already signed in");
        //send token and try to get the basic resume information.
        //hide the login page.
        TokenCheckPassed();
    }
    else
    {
        console.log("You need to sign in below");
        TokenCheckFailed();
    }    
    
    var logcloser="----leaving TokenStuff----";
    console.log(logcloser);    
}

async function buttonTestServiceAuthorized()
{
    var logopener="----entering buttonTestServiceAuthorized----";
    console.log(logopener);

    APIBeingProcessed();

    var baseUrl = returnCurrentBaseURL();
    var endPoint = "api/HelloWorld/TestServiceAuthorized";
    var fullUrl = baseUrl + endPoint;
    var getCurrentToken = getToken();

    if(getCurrentToken == null)
    {
        TokenCheckFailed();
        return;
    }

    const response = await fetch(fullUrl,
        {
            method: 'GET',
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
        TokenCheckFailed();
    }
    else if(response.status == 200)
    {
        var responsejson = response.json();
        responsejson.then(
            function(result)
            {
                console.log(result);
                ShowbuttonTestServiceResponse(result);
                APICallSuccess();
            },
            function(error)
            {
                console.log(error);
                APICallFailed();
            }
        );
    }
    else
    {
        //some unknown error
    }

    var logcloser="----leaving buttonTestServiceAuthorized----";
    console.log(logcloser);
}

async function buttonTestService()
{
    var logopener="----entering buttonTestService----";
    console.log(logopener);

    APIBeingProcessed();

    var baseUrl = returnCurrentBaseURL();
    var endPoint = "api/HelloWorld/TestService";
    var fullUrl = baseUrl + endPoint;
    //dont need token. this is an unsecured endpoint
    // var getCurrentToken = getToken();

    const response = await fetch(fullUrl,
        {
            method: 'GET',
            headers:
            {
                'Content-Type': 'application/json',
            }
        }
        );

    if(response.status == 400)
    {
        console.log("unknown error - " + response.status);
        APICallFailed();
    }
    else if(response.status == 200)
    {
        var responsejson = response.json();
        responsejson.then(
            function(result)
            {
                console.log(result);
                ShowbuttonTestServiceResponse(result);
                APICallSuccess();
            },
            function(error)
            {
                console.log(error);
                APICallFailed();
            }
        );
    }
    else
    {
        //some unknown error
    }

    var logcloser="----leaving buttonTestService----";
    console.log(logcloser);
}

function ShowbuttonTestServiceResponse(result)
{
    var logopener="----entering ShowbuttonTestServiceResponse----";
    console.log(logopener);  

    //pick the div meant for this item
    var currentDiv = document.getElementById("buttonTestServiceResults");

    //as per the postman output, we have four fields.
    var variableMessage1 = document.createElement("p"); 
    var variableMessage2 = document.createElement("p"); 
    var variableNumber1 = document.createElement("p"); 
    var variableNumber2 = document.createElement("p"); 

    var variablehorizontalline = document.createElement("hr"); 

    variableMessage1.innerText = result.Message1;
    variableMessage2.innerText = result.Message2;
    variableNumber1.innerText = result.Number1;
    variableNumber2.innerText = result.Number2;

    currentDiv.appendChild(variablehorizontalline);

    currentDiv.appendChild(variableMessage1); 
    currentDiv.appendChild(variableMessage2); 
    currentDiv.appendChild(variableNumber1); 
    currentDiv.appendChild(variableNumber2); 

    var logcloser="----leaving ShowbuttonTestServiceResponse----";
    console.log(logcloser);
}

async function buttonTestServiceUserDetails()
{
    var logopener="----entering buttonTestServiceUserDetails----";
    console.log(logopener);

    APIBeingProcessed();

    var baseUrl = returnCurrentBaseURL();
    var endPoint = "api/HelloWorld/TestServiceUserDetails";
    var fullUrl = baseUrl + endPoint;
    var getCurrentToken = getToken();

    if(getCurrentToken == null)
    {
        TokenCheckFailed();
        return;
    }    

    const response = await fetch(fullUrl,
        {
            method: 'GET',
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
        APICallFailed();
    }
    else if(response.status == 200)
    {
        var responsejson = response.json();
        responsejson.then(
            function(result)
            {
                console.log(result);
                ShowbuttonTestServiceUserDetailsResponse(result);
                APICallSuccess();
            },
            function(error)
            {
                console.log(error);
                APICallFailed();
            }
        );
    }
    else
    {
        //some unknown error
        APICallFailed();
    }

    var logcloser="----leaving buttonTestServiceUserDetails----";
    console.log(logcloser);    
}

function ShowbuttonTestServiceUserDetailsResponse(result)
{
    var logopener="----entering ShowbuttonTestServiceUserDetailsResponse----";
    console.log(logopener);  

    //pick the div meant for this item
    var currentDiv = document.getElementById("buttonTestServiceResults");

    //as per the postman output, we have four fields.
    var variableMessageDescription = document.createElement("p"); 
    var variableUserName = document.createElement("p"); 

    var variablehorizontalline = document.createElement("hr"); 

    variableMessageDescription.innerText = result.MessageDescription;
    variableUserName.innerText = result.UserName;


    currentDiv.appendChild(variablehorizontalline);

    currentDiv.appendChild(variableMessageDescription); 
    currentDiv.appendChild(variableUserName);  

    var logcloser="----leaving ShowbuttonTestServiceUserDetailsResponse----";
    console.log(logcloser);
}



// var entirenamep = document.getElementById("entirename");
// var fullname = result.FirstName + " " + result.MiddleName + " " + result.LastName;
// entirenamep.innerText = fullname;

