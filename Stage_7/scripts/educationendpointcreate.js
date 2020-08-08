function pagehasloadededucation()
{
    var logopener="----entering pagehasloadededucation----";
    console.log(logopener);

    //first call the standard page load 

    pagehasloaded();

    //check for token and accordingly show or hide display
    TokenStuffCRUD();    

    //load the form
    loadthecreateeducationform();

    var logcloser="----leaving pagehasloadededucation----";
    console.log(logcloser);
}

function loadthecreateeducationform()
{

    var logopener="----entering pagehasloadededucation----";
    console.log(logopener);

    var currentDiveducationdisplay = document.getElementById("educationdisplay");

    //the new add option.
    //EducationTitle   
    var tempp = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "enter education title";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "EducationTitle";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp.setAttributeNode(atttype);
    tempp.setAttributeNode(attplaceholder);
    tempp.setAttributeNode(attrequired);
    tempp.setAttributeNode(attid);
    tempp.setAttributeNode(attclass);          
    currentDiveducationdisplay.appendChild(tempp); 

    //InstituationName

    var tempp2 = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "college/institute name";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "InstituationName";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp2.setAttributeNode(atttype);
    tempp2.setAttributeNode(attplaceholder);
    tempp2.setAttributeNode(attrequired);
    tempp2.setAttributeNode(attid);
    tempp2.setAttributeNode(attclass);          
    currentDiveducationdisplay.appendChild(tempp2); 

    //YearOfGraduation

    var tempp3 = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "year of graduation";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "YearOfGraduation";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp3.setAttributeNode(atttype);
    tempp3.setAttributeNode(attplaceholder);
    tempp3.setAttributeNode(attrequired);
    tempp3.setAttributeNode(attid);
    tempp3.setAttributeNode(attclass);          
    currentDiveducationdisplay.appendChild(tempp3);             

    //PassGrade

    var tempp4 = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "pass grade";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "PassGrade";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp4.setAttributeNode(atttype);
    tempp4.setAttributeNode(attplaceholder);
    tempp4.setAttributeNode(attrequired);
    tempp4.setAttributeNode(attid);
    tempp4.setAttributeNode(attclass);          
    currentDiveducationdisplay.appendChild(tempp4); 

    //EducationOtherNotes1

    var tempp5 = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "other notes";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "EducationOtherNotes1";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp5.setAttributeNode(atttype);
    tempp5.setAttributeNode(attplaceholder);
    tempp5.setAttributeNode(attrequired);
    tempp5.setAttributeNode(attid);
    tempp5.setAttributeNode(attclass);          
    currentDiveducationdisplay.appendChild(tempp5); 

    //EducationOtherNotes2

    var tempp6 = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "other notes";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "EducationOtherNotes2";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp6.setAttributeNode(atttype);
    tempp6.setAttributeNode(attplaceholder);
    tempp6.setAttributeNode(attrequired);
    tempp6.setAttributeNode(attid);
    tempp6.setAttributeNode(attclass);          
    currentDiveducationdisplay.appendChild(tempp6);            

    //we need a button to update.
    var tempbutton = document.createElement("button"); 
    //lets add the attributes.   
    var attclass = document.createAttribute("class");
    attclass.value = "btn btn-lg btn-primary btn-block";            
    //for the button I want to keep the GUID directly as the ID
    var attid = document.createAttribute("id");
    attid.value =  "newitem" + "EducationButton";
    //want to display for the button as well.
    tempbutton.innerText = "add education"
    //lets attach the attributes to the DOM element in question
    tempbutton.setAttributeNode(attid);             
    tempbutton.setAttributeNode(attclass);     
    
    //lets setup the click function.
    tempbutton.addEventListener('click', function(){
        addeducation();
    });            
    currentDiveducationdisplay.appendChild(tempbutton);                      
    
    var logcloser="----leaving pagehasloadededucation----";
    console.log(logcloser);

}

async function addeducation()
{
    var logopener="----entering addeducation----";
    console.log(logopener);

    APIBeingProcessed();

    //lets get the entered values.
    var tempinputbox1 = document.getElementById("newitem" + "EducationTitle");
    var tempenteredvalue1 = tempinputbox1.value;
    var tempinputbox2 = document.getElementById("newitem"+"InstituationName");
    var tempenteredvalue2 = tempinputbox2.value;
    var tempinputbox3 = document.getElementById("newitem"+"YearOfGraduation");
    var tempenteredvalue3 = tempinputbox3.value;
    var tempinputbox4 = document.getElementById("newitem"+"PassGrade");
    var tempenteredvalue4 = tempinputbox4.value;
    var tempinputbox5 = document.getElementById("newitem"+"EducationOtherNotes1");
    var tempenteredvalue5 = tempinputbox5.value;
    var tempinputbox6 = document.getElementById("newitem"+"EducationOtherNotes2");
    var tempenteredvalue6 = tempinputbox6.value;    

    var POSTbody = new Object();
    POSTbody.EducationTitle = tempenteredvalue1;
    POSTbody.InstituationName = tempenteredvalue2;
    POSTbody.YearOfGraduation = tempenteredvalue3;
    POSTbody.PassGrade = tempenteredvalue4;
    POSTbody.EducationOtherNotes1 = tempenteredvalue5;
    POSTbody.EducationOtherNotes2 = tempenteredvalue6;
    POSTbody.UniqueGuid = "emptyonpurpose";

    var POSTbodyinJSON = JSON.stringify(POSTbody);   

    var baseUrl = returnCurrentBaseURL();
    var endPoint = "api/UserandResume/AddEducationalDetails";
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
                //TODO011 - I am doing a full page reload here.
                //we should reload just the section in question.
                // location.reload();

                //erase entered stuff
                tempinputbox1.value = "";
                tempinputbox2.value = "";
                tempinputbox3.value = "";
                tempinputbox4.value = "";
                tempinputbox5.value = "";
                tempinputbox6.value = "";
            },
            function(error)
            {
                console.log(error);
                tempbutton.innerText = "try again";
                APICallFailed();
            }
        );
    }
    else
    {
        console.log("unknown error - " + response.status);    
        APICallFailed();    
    }

    var logcloser="----leaving addeducation----";
    console.log(logcloser);
}
