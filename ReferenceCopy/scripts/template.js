function pagehasloaded()
{
    var logopener="----entering pagehasloaded----";
    console.log(logopener);

    //hide or show things as per requirement.
    // var divstatusmessageafterAPIcall = 
    // document.getElementById("statusmessageafterAPIcall");
    // divstatusmessageafterAPIcall.style.display = 'none';
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
        // GetResumeSummary();
    }
    else
    {
        console.log("You need to sign in below");
    }

    var logcloser="----leaving pagehasloaded----";
    console.log(logcloser);
}