function pagehasloadededucation()
{
    var logopener="----entering pagehasloadededucation----";
    console.log(logopener);

    //first call the standard page load 

    pagehasloaded();

    //check for token and accordingly show or hide display
    TokenStuffCRUD();

    //now get all education details 

    GetEducationalDetails();

    var logcloser="----leaving pagehasloadededucation----";
    console.log(logcloser);
}

function displayeducationdetails(result)
{

    var logopener="----entering displayeducationdetails----";
    console.log(logopener);

    var itemsarray = result;
    //pick the div meant for this item
    var currentDiv = document.getElementById("educationdisplay");
    //start adding the elements.


    for(var i=0;i<itemsarray.length;i++)
    {
        var tempitem = itemsarray[i];

        //EducationTitle   
        var tempp = document.createElement("input"); 
        tempp.value = tempitem.EducationTitle;     
        //lets add the attributes.
        var atttype = document.createAttribute("type");
        atttype.value = "text";
        var attplaceholder = document.createAttribute("placeholder");
        attplaceholder.value = tempitem.EducationTitle;     
        var attrequired = document.createAttribute("required");
        var attid = document.createAttribute("id");
        attid.value = tempitem.UniqueGuid + "EducationTitle";
        var attclass = document.createAttribute("class");
        attclass.value = "form-control";
        //lets attach the attributes to the DOM element in question
        tempp.setAttributeNode(atttype);
        tempp.setAttributeNode(attplaceholder);
        tempp.setAttributeNode(attrequired);
        tempp.setAttributeNode(attid);
        tempp.setAttributeNode(attclass);          
        currentDiv.appendChild(tempp); 

        //InstituationName

        var tempp2 = document.createElement("input"); 
        tempp2.value = tempitem.InstituationName;     
        //lets add the attributes.
        var atttype = document.createAttribute("type");
        atttype.value = "text";
        var attplaceholder = document.createAttribute("placeholder");
        attplaceholder.value = tempitem.InstituationName;     
        var attrequired = document.createAttribute("required");
        var attid = document.createAttribute("id");
        attid.value = tempitem.UniqueGuid + "InstituationName";
        var attclass = document.createAttribute("class");
        attclass.value = "form-control";
        //lets attach the attributes to the DOM element in question
        tempp2.setAttributeNode(atttype);
        tempp2.setAttributeNode(attplaceholder);
        tempp2.setAttributeNode(attrequired);
        tempp2.setAttributeNode(attid);
        tempp2.setAttributeNode(attclass);          
        currentDiv.appendChild(tempp2); 

        //YearOfGraduation

        var tempp3 = document.createElement("input"); 
        tempp3.value = tempitem.YearOfGraduation;     
        //lets add the attributes.
        var atttype = document.createAttribute("type");
        atttype.value = "text";
        var attplaceholder = document.createAttribute("placeholder");
        attplaceholder.value = tempitem.YearOfGraduation;     
        var attrequired = document.createAttribute("required");
        var attid = document.createAttribute("id");
        attid.value = tempitem.UniqueGuid + "YearOfGraduation";
        var attclass = document.createAttribute("class");
        attclass.value = "form-control";
        //lets attach the attributes to the DOM element in question
        tempp3.setAttributeNode(atttype);
        tempp3.setAttributeNode(attplaceholder);
        tempp3.setAttributeNode(attrequired);
        tempp3.setAttributeNode(attid);
        tempp3.setAttributeNode(attclass);          
        currentDiv.appendChild(tempp3);             

        //PassGrade

        var tempp4 = document.createElement("input"); 
        tempp4.value = tempitem.PassGrade;     
        //lets add the attributes.
        var atttype = document.createAttribute("type");
        atttype.value = "text";
        var attplaceholder = document.createAttribute("placeholder");
        attplaceholder.value = tempitem.PassGrade;     
        var attrequired = document.createAttribute("required");
        var attid = document.createAttribute("id");
        attid.value = tempitem.UniqueGuid + "PassGrade";
        var attclass = document.createAttribute("class");
        attclass.value = "form-control";
        //lets attach the attributes to the DOM element in question
        tempp4.setAttributeNode(atttype);
        tempp4.setAttributeNode(attplaceholder);
        tempp4.setAttributeNode(attrequired);
        tempp4.setAttributeNode(attid);
        tempp4.setAttributeNode(attclass);          
        currentDiv.appendChild(tempp4); 

        //EducationOtherNotes1

        var tempp5 = document.createElement("input"); 
        tempp5.value = tempitem.EducationOtherNotes1;     
        //lets add the attributes.
        var atttype = document.createAttribute("type");
        atttype.value = "text";
        var attplaceholder = document.createAttribute("placeholder");
        attplaceholder.value = tempitem.EducationOtherNotes1;     
        var attrequired = document.createAttribute("required");
        var attid = document.createAttribute("id");
        attid.value = tempitem.UniqueGuid + "EducationOtherNotes1";
        var attclass = document.createAttribute("class");
        attclass.value = "form-control";
        //lets attach the attributes to the DOM element in question
        tempp5.setAttributeNode(atttype);
        tempp5.setAttributeNode(attplaceholder);
        tempp5.setAttributeNode(attrequired);
        tempp5.setAttributeNode(attid);
        tempp5.setAttributeNode(attclass);          
        currentDiv.appendChild(tempp5); 

        //EducationOtherNotes2

        var tempp6 = document.createElement("input"); 
        tempp6.value = tempitem.EducationOtherNotes2;     
        //lets add the attributes.
        var atttype = document.createAttribute("type");
        atttype.value = "text";
        var attplaceholder = document.createAttribute("placeholder");
        attplaceholder.value = tempitem.EducationOtherNotes2;     
        var attrequired = document.createAttribute("required");
        var attid = document.createAttribute("id");
        attid.value = tempitem.UniqueGuid + "EducationOtherNotes2";
        var attclass = document.createAttribute("class");
        attclass.value = "form-control";
        //lets attach the attributes to the DOM element in question
        tempp6.setAttributeNode(atttype);
        tempp6.setAttributeNode(attplaceholder);
        tempp6.setAttributeNode(attrequired);
        tempp6.setAttributeNode(attid);
        tempp6.setAttributeNode(attclass);          
        currentDiv.appendChild(tempp6);            

        // //we need a button to update.
        // var tempbutton = document.createElement("button"); 
        // //lets add the attributes.   
        // var attclass = document.createAttribute("class");
        // attclass.value = "btn btn-lg btn-primary btn-block";            
        // //for the button I want to keep the GUID directly as the ID
        // var attid = document.createAttribute("id");
        // attid.value = tempitem.UniqueGuid;
        // //want to display for the button as well.
        // tempbutton.innerText = "update education"
        // //lets attach the attributes to the DOM element in question
        // tempbutton.setAttributeNode(attid);             
        // tempbutton.setAttributeNode(attclass);              
        
        // //lets setup the click function.
        // tempbutton.addEventListener('click', function(){
        //     updateeducation();
        // });            
        // currentDiv.appendChild(tempbutton);             

        //add a divider line
        var temphr = document.createElement("hr");
        currentDiv.appendChild(temphr);
    }    

    var logcloser="----leaving displayeducationdetails----";
    console.log(logcloser);    
}

async function GetEducationalDetails()
{
    var logopener="----entering GetEducationalDetails----";
    console.log(logopener);

    APIBeingProcessed();

    var baseUrl = returnCurrentBaseURL();
    var endPoint = "api/UserandResume/GetEducationalDetails";
    var fullUrl = baseUrl + endPoint;
    var getCurrentToken = getToken();

    if(getCurrentToken == null)
    {
        TokenCheckFailed();
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
                displayeducationdetails(result);
                APICallSuccess();
            },
            function(error)
            {
                console.log(error);
                TokenCheckFailed();
            }
        );
    }
    else
    {
        //some unknown error
    }

    var logcloser="----leaving GetEducationalDetails----";
    console.log(logcloser);
}

//-----------------------------------------------
//for the education update related stuff
//-----------------------------------------------

function updateeducation()
{
    var logopener="----entering updateeducation----";
    console.log(logopener);

    //lets get the id. 
    console.log("UniqueGuid is " + event.target.id);

    //we have the id. now, we need to do a post call to update it. 
    var tempbutton = event.target;

    apiworkeducationupdate(tempbutton);
    
    var logcloser="----leaving updateeducation----";
    console.log(logcloser);
}

//take the unique id
//collect the information in the input boxes
//make the post call to perform the udpate
//do a get call and get the latest information.
//update the display aka the placeholders with the new information
async function apiworkeducationupdate(tempbutton)
{
    var logopener="----entering apiworkeducationupdate----";
    console.log(logopener);

    APIBeingProcessed();
    //lets get the entered values.
    var tempinputbox1 = document.getElementById(tempbutton.id+"EducationTitle");
    var tempenteredvalue1 = tempinputbox1.value;
    var tempinputbox2 = document.getElementById(tempbutton.id+"InstituationName");
    var tempenteredvalue2 = tempinputbox2.value;
    var tempinputbox3 = document.getElementById(tempbutton.id+"YearOfGraduation");
    var tempenteredvalue3 = tempinputbox3.value;
    var tempinputbox4 = document.getElementById(tempbutton.id+"PassGrade");
    var tempenteredvalue4 = tempinputbox4.value;
    var tempinputbox5 = document.getElementById(tempbutton.id+"EducationOtherNotes1");
    var tempenteredvalue5 = tempinputbox5.value;
    var tempinputbox6 = document.getElementById(tempbutton.id+"EducationOtherNotes2");
    var tempenteredvalue6 = tempinputbox6.value;

    var POSTbody = new Object();
    POSTbody.EducationTitle = tempenteredvalue1;
    POSTbody.InstituationName = tempenteredvalue2;
    POSTbody.YearOfGraduation = tempenteredvalue3;
    POSTbody.PassGrade = tempenteredvalue4;
    POSTbody.EducationOtherNotes1 = tempenteredvalue5;
    POSTbody.EducationOtherNotes2 = tempenteredvalue6;
    POSTbody.UniqueGuid = tempbutton.id;

    var POSTbodyinJSON = JSON.stringify(POSTbody);   

    var baseUrl = returnCurrentBaseURL();
    var endPoint = "api/UserandResume/UpdateEducationalDetails";
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
        APICallFailed();        
    }        
    else if(response.status == 200)
    {
        APICallSuccess();
        var responsejson = response.json();
        responsejson.then(
            function(result)
            {
                console.log(result);
                tempbutton.value="";
                tempinputbox1.setAttribute("placeholder",tempenteredvalue1);
                tempinputbox1.value = tempenteredvalue1;
                tempinputbox2.setAttribute("placeholder",tempenteredvalue2);
                tempinputbox2.value = tempenteredvalue2;
                tempinputbox3.setAttribute("placeholder",tempenteredvalue3);
                tempinputbox3.value = tempenteredvalue3;
                tempinputbox4.setAttribute("placeholder",tempenteredvalue4);
                tempinputbox4.value = tempenteredvalue4;
                tempinputbox5.setAttribute("placeholder",tempenteredvalue5);
                tempinputbox5.value = tempenteredvalue5;
                tempinputbox6.setAttribute("placeholder",tempenteredvalue6);
                tempinputbox6.value = tempenteredvalue6;                                                                                               
                tempbutton.innerText = "update education";
            },
            function(error)
            {
                console.log(error);
                tempbutton.value="";
                tempinputbox1.setAttribute("placeholder",tempenteredvalue1);
                tempinputbox1.value = tempenteredvalue1;
                tempinputbox2.setAttribute("placeholder",tempenteredvalue2);
                tempinputbox2.value = tempenteredvalue2;
                tempinputbox3.setAttribute("placeholder",tempenteredvalue3);
                tempinputbox3.value = tempenteredvalue3;
                tempinputbox4.setAttribute("placeholder",tempenteredvalue4);
                tempinputbox4.value = tempenteredvalue4;
                tempinputbox5.setAttribute("placeholder",tempenteredvalue5);
                tempinputbox5.value = tempenteredvalue5;
                tempinputbox6.setAttribute("placeholder",tempenteredvalue6);
                tempinputbox6.value = tempenteredvalue6;                                                                                               
                tempbutton.innerText = "update education";
                APICallFailed();
            }
        );
    }
    else
    {
        console.log("unknown error - " + response.status);       
        APICallFailed(); 
    }

    var logcloser="----leaving apiworkeducationupdate----";
    console.log(logcloser);
}

