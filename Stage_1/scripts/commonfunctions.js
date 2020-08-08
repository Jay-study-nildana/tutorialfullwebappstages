
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