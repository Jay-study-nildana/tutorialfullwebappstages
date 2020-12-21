
function pagehasloadedcommonfunctions()
{
    var logopener="----entering pagehasloadedcommonfunctions----";
    console.log(logopener);

    //first setup some UI elements
    setuptitles();

    //testyourcomputer - simple javascript message.
    letstestyourcomputer();

    //TODO - setup a footer function here
    //right now, it is generated manually like this.
    //     <div>
    //     <p class="mt-5 mb-3 text-muted">&copy; 1800-2069</p>
    //     <p class="mt-5 mb-3 text-muted"><a href="http://thechalakas.com/" >contact developer and trainer</a></p>
    //   </div>          

    var logcloser="----leaving pagehasloadedcommonfunctions----";
    console.log(logcloser);
}

//by default, the h7 tag with id testyourcomputer
//says that computer is not ready for javascript
//this function, simply over writes the default message
//if javascript is really running through http-server or similar local web server
//technology during development on the dev computer, then, the default message gets over written
function letstestyourcomputer()
{
    var logopener="----entering letstestyourcomputer----";
    console.log(logopener);

    //get the title H1 tags
    var testyourcomputer = document.getElementById("testyourcomputer");

    //set them with desired values.
    let testyourcomputerline1 = "HELLLOO....HELLOOO...JAVASCRIPT HERE...YOU ARE ALL SET!!!";

    testyourcomputer.innerHTML = testyourcomputerline1;

    var logcloser="----leaving letstestyourcomputer----";
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